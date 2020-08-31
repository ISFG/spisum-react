import {
  componentCreateAction,
  componentDeleteAction,
  componentDownloadAction,
  componentUpdateAction,
  componentViewAction
} from "core/api/components/_actions";
import { DataColumn, ValueType } from "core/components/dataTable/_types";
import { GenericDocument } from "core/types";
import { Associations, DocumentType, SenderType, SpisumNodeTypes } from "enums";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootStateType } from "reducers";
import { renameComponentAction } from "share/components/dialog/renameComponentDialog/_actions";
import { translationPath } from "share/utils/getPath";
import { lang, t } from "translation/i18n";
import { ErrorTypeWithFailedIds } from "types";
import { callAsyncAction } from "../../../../action";
import { ComponentType } from "../../../../api/components/_types";
import { SslProperties } from "../../../../api/models";
import { File } from "../../../../entities";
import { notificationAction } from "../../../notifications/_actions";
import { NotificationSeverity } from "../../../notifications/_types";
import { useMetaFormDocument } from "../../hooks/useMetaFormDocument";
import { dialogOpenAction } from "../../_actions";
import {
  DialogDataGenericData,
  DialogTabContentPropsType,
  DialogType
} from "../../_types";
import ComponentsTab from "./ComponentsTab";
import { sortComponents } from "./methods";
import { SelectedComponentsFnType } from "./_types";

type CommentsTabContainerState = {
  pageNumber: number;
  rowsPerPage: number;
  sortAsc?: boolean;
  sortColumnIndex?: number;
  sortKeys?: string[];
};

const initialState: CommentsTabContainerState = {
  pageNumber: 0,
  rowsPerPage: 100
};

type OwnProps = DialogTabContentPropsType & {
  nodeId: string;
  isReadOnly?: boolean;
  componentType?: ComponentType;
};

const ComponentsTabContainer = React.memo(
  ({
    channel,
    componentType = ComponentType.Document,
    dialogProps,
    isActive,
    isReadOnly,
    nodeId
  }: OwnProps) => {
    const dispatch = useDispatch();
    const [
      { pageNumber, rowsPerPage, sortKeys, sortColumnIndex, sortAsc },
      setState
    ] = useState<CommentsTabContainerState>(initialState);
    const [wasLoaded, setWasLoaded] = useState<boolean>(false);

    const { components, error, isLoading } = useSelector(
      (state: RootStateType) => state.componentsReducer
    );
    const metaFormDocument = useMetaFormDocument();
    const nodeType =
      (dialogProps.data as DialogDataGenericData)?.nodeType ||
      metaFormDocument?.nodeType;

    const sortedComponents = useMemo(() => {
      return components
        ? sortKeys
          ? components.entities
          : sortComponents(components.entities)
        : [];
    }, [components, sortKeys]);

    const getWhereAssocType = () => {
      switch (nodeType) {
        case SpisumNodeTypes.Databox:
          return `(assocType='${Associations.Databox}')`;
        case SpisumNodeTypes.Email:
          return `(assocType='${Associations.Email}')`;
        case SpisumNodeTypes.Document:
        case SpisumNodeTypes.File:
          return `(assocType='${Associations.Components}')`;
        default:
          return "";
      }
    };

    const fetchComponents = () => {
      dispatch(
        callAsyncAction({
          action: componentViewAction,
          onSuccessNotification: null,
          payload: {
            include: ["properties", "path"],
            maxItems: rowsPerPage,
            nodeId,
            skipCount: rowsPerPage * pageNumber,
            sortAsc,
            sortKeys,
            where: getWhereAssocType()
          }
        })
      );
    };

    channel.refreshData = fetchComponents;

    useEffect(() => {
      if (isActive && !wasLoaded) {
        fetchComponents();
        setWasLoaded(true);
      }
    }, [isActive]); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
      if (isActive) {
        fetchComponents();
      }
    }, [nodeId, rowsPerPage, pageNumber, sortColumnIndex, sortAsc]); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
      if (
        !sortedComponents.length ||
        !handleCanShowPreview(sortedComponents[0])
      ) {
        return;
      }

      channel.setPreviewItem({
        ...sortedComponents[0],
        entityId: nodeId,
        nodeType
      });
    }, [channel, nodeId, nodeType, sortedComponents]);

    const handleChangePage: (
      event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null,
      page: number
    ) => void = useCallback((_, page) => {
      setState((state) => ({
        ...state,
        pageNumber: page
      }));
    }, []);

    const handleChangeRowsPerPage: (
      event: React.ChangeEvent<HTMLInputElement>
    ) => void = useCallback((event) => {
      setState((state) => ({
        ...state,
        pageNumber: 0,
        rowsPerPage: parseInt(event.target.value, 10)
      }));
    }, []);

    const handleDeleteComponent = useCallback(
      (selectedComponents: File[]) => {
        const onErrorMessage =
          selectedComponents.length > 1
            ? t(
                translationPath(
                  lang.dialog.notifications.componentDeleteOneOrMoreFailed
                )
              )
            : t(translationPath(lang.dialog.notifications.actionFailed));

        const onError = (errorResponse: ErrorTypeWithFailedIds) => {
          if (
            errorResponse?.ids &&
            errorResponse?.ids?.length < selectedComponents?.length
          ) {
            fetchComponents();
          }
        };

        dispatch(
          callAsyncAction({
            action: componentDeleteAction,
            onError,
            onErrorNotification: {
              message: onErrorMessage,
              severity: NotificationSeverity.Error
            },
            onSuccess: fetchComponents,
            payload: {
              componentIds: selectedComponents.map((c) => c.id),
              nodeId
            }
          })
        );
      },
      [dispatch] // eslint-disable-line react-hooks/exhaustive-deps
    );

    const handleUploadComponent = useCallback(
      (files: globalThis.File[]) => {
        const onSuccess = () => {
          dispatch(
            notificationAction({
              message: t(
                translationPath(
                  lang.dialog.notifications.componentUploadWasSuccessful
                )
              ),
              severity: NotificationSeverity.Success
            })
          );
        };

        const onError = () => {
          dispatch(
            notificationAction({
              message: t(
                translationPath(lang.dialog.notifications.componentUploadFailed)
              ),
              severity: NotificationSeverity.Error
            })
          );
        };

        dispatch(
          componentCreateAction.request({
            files,
            nodeId,
            onEnd: fetchComponents,
            onError,
            onSuccess,
            type: componentType
          })
        );
      },
      [dispatch] // eslint-disable-line react-hooks/exhaustive-deps
    );

    const handleSwapComponentContent = useCallback(
      (selected: File[], files: globalThis.File[]) => {
        const onSuccess = () => {
          dispatch(
            notificationAction({
              message: t(
                translationPath(
                  lang.dialog.notifications.componentUploadWasSuccessful
                )
              ),
              severity: NotificationSeverity.Success
            })
          );
        };

        const onError = () => {
          dispatch(
            notificationAction({
              message: t(
                translationPath(lang.dialog.notifications.componentUploadFailed)
              ),
              severity: NotificationSeverity.Error
            })
          );
        };

        dispatch(
          componentCreateAction.request({
            componentId: selected[0].id,
            files,
            nodeId,
            onEnd: fetchComponents,
            onError,
            onSuccess,
            type: componentType
          })
        );
      },
      [dispatch] // eslint-disable-line react-hooks/exhaustive-deps
    );

    const handleDownloadComponent = useCallback(
      (selectedComponents: File[]) => {
        dispatch(
          notificationAction({
            message: t(
              translationPath(
                lang.dialog.notifications.componentDownloadIsPreparing
              )
            ),
            severity: NotificationSeverity.Info
          })
        );
        dispatch(
          callAsyncAction({
            action: componentDownloadAction,
            payload: {
              componentIds: selectedComponents.map((c) => c.id),
              nodeId,
              nodeType
            }
          })
        );
      },
      [dispatch, nodeId, nodeType]
    );

    const handleColumnChange = useCallback(
      (row: File, column: DataColumn<File>, value: ValueType) => {
        dispatch(
          callAsyncAction({
            action: componentUpdateAction,
            payload: {
              ...row,
              [column.keys[0]]: value,
              documentId: metaFormDocument.documentId,
              nodeType: metaFormDocument.nodeType
            }
          })
        );
      },
      [dispatch, metaFormDocument.documentId, metaFormDocument.nodeType]
    );

    const handleRenameComponent: SelectedComponentsFnType = useCallback(
      (selectedComponents) => {
        dispatch(renameComponentAction(selectedComponents[0]));
      },
      [dispatch]
    );

    const showActions = () => {
      if (isReadOnly || dialogProps.canUploadComponents === false) {
        return false;
      }

      const document = dialogProps.data as GenericDocument;

      const { isLocked, formValues } = metaFormDocument;
      const typedFormValues = formValues as SslProperties;
      const form = document?.properties?.ssl?.form || typedFormValues?.form;
      const senderType =
        document?.properties?.ssl?.senderType || typedFormValues?.senderType;
      const documentType =
        document?.properties?.ssl?.documentType ||
        typedFormValues?.documentType;
      const documentIsLocked = document?.isLocked || isLocked;

      return (
        (form === DocumentType.Analog ||
          (DocumentType.Digital &&
            (senderType === SenderType.Own ||
              documentType === DocumentType.TechnicalDataCarries))) &&
        !documentIsLocked
      );
    };

    const handleCanDeleteComponent = showActions;

    const handleCanCreateComponent = showActions;

    const handleCanUploadNewVersion = (component: File) =>
      showActions() && component?.keepForm !== "original_inOutputFormat";

    const handleCanShowPreview = (component: File) => {
      // filter by extensions
      return true;
    };

    const handleConvertToOutputFormat = (cmp: File[]) => {
      dispatch(
        dialogOpenAction({
          dialogProps: {
            data: {
              componentId: cmp[0].id,
              id: nodeId
            },
            onSuccess: fetchComponents
          },
          dialogType: DialogType.ConvertToOutput
        })
      );
    };

    const handleCanRenameComponent = showActions;

    const handleCanConvertToOutputFormat = (component: File) => {
      const document = dialogProps.data as GenericDocument;
      return (
        dialogProps.disableConverIcon !== true &&
        !document?.isLocked &&
        component?.fileIsInOutputFormat !== "yes" &&
        component?.fileIsInOutputFormat !== "impossible" &&
        component?.fileIsInOutputFormat !== "converted" &&
        !isReadOnly
      );
    };

    const handleShowPreview = useCallback(
      (selected: File[]) => {
        if (!selected[0]) {
          return;
        }

        channel.setPreviewItem(
          {
            ...selected[0],
            entityId: nodeId,
            nodeType
          },
          true
        );
      },
      [channel, nodeId, nodeType]
    );

    const handleSelectionChange = useCallback(
      (selected: File[]) => {
        if (!selected[0] || !handleCanShowPreview(selected[0])) {
          // use empty object, so the preview will show "unsupported file"
          channel.setPreviewItem({});
          return;
        }

        channel.setPreviewItem({
          ...selected[0],
          entityId: nodeId,
          nodeType
        });
      },
      [channel, nodeId, nodeType]
    );

    const handleSortingChange: (
      index: number,
      keys: string[]
    ) => (event: React.MouseEvent<HTMLTableRowElement, MouseEvent>) => void = (
      index,
      keys
    ) => (event) => {
      setState((state) => ({
        ...state,
        sortAsc: index === state.sortColumnIndex ? !sortAsc : false,
        sortColumnIndex: index,
        sortKeys: keys
      }));
    };

    if (error) {
      return <div />;
    }

    return (
      <ComponentsTab
        handleCanConvertToOutputFormat={handleCanConvertToOutputFormat}
        handleCanCreateComponent={handleCanCreateComponent}
        handleCanDeleteComponent={handleCanDeleteComponent}
        handleCanRenameComponent={handleCanRenameComponent}
        handleCanShowPreview={handleCanShowPreview}
        handleCanUploadNewVersion={handleCanUploadNewVersion}
        handleChangePage={handleChangePage}
        handleChangeRowsPerPage={handleChangeRowsPerPage}
        handleColumnChange={handleColumnChange}
        handleConvertToOutputFormat={handleConvertToOutputFormat}
        handleDeleteComponent={handleDeleteComponent}
        handleDownloadComponent={handleDownloadComponent}
        handleRenameComponent={handleRenameComponent}
        handleSelectionChange={handleSelectionChange}
        handleShowPreview={handleShowPreview}
        handleSortingChange={handleSortingChange}
        handleSwapComponentContent={handleSwapComponentContent}
        handleUploadComponent={handleUploadComponent}
        isLoading={isLoading}
        isReadonly={isReadOnly || !!dialogProps.isReadonly}
        items={sortedComponents}
        pageNumber={pageNumber}
        refreshTable={fetchComponents}
        rowsPerPage={rowsPerPage}
        sortAsc={sortAsc}
        sortColumnIndex={sortColumnIndex}
        totalItems={components.pagination?.totalItems || 0}
      />
    );
  }
);

export default ComponentsTabContainer;
