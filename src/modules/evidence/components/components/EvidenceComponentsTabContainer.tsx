import { callAsyncAction } from "core/action";
import {
  componentCreateAction,
  componentDeleteAction,
  componentDownloadAction,
  componentViewAction
} from "core/api/concept/components/_actions";
import { DataColumn, ValueType } from "core/components/dataTable/_types";
import {
  DialogContentPropsType,
  DialogDataProps
} from "core/components/dialog/_types";
import { notificationAction } from "core/components/notifications/_actions";
import { NotificationSeverity } from "core/components/notifications/_types";
import { File } from "core/entities";
import { Associations, SitePaths } from "enums";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootStateType } from "reducers";
import { renameComponentAction } from "share/components/dialog/renameComponentDialog/_actions";
import { translationPath } from "share/utils/getPath";
import { getRelativePath } from "share/utils/query";
import { lang, t } from "translation/i18n";
import { componentUpdateAction } from "../../../../core/api/components/_actions";
import { useMetaFormDocument } from "../../../../core/components/dialog/hooks/useMetaFormDocument";
import { ErrorTypeWithFailedIds } from "../../../../types";
import ComponentsTab from "./ComponentsTab";
import { sortComponents } from "./methods";
import { SelectedComponentsFnType } from "./_types";

const COMPANY_HOME_PREFIX = "/Company Home/";

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

type OwnProps = DialogContentPropsType & {
  nodeId: string;
  isReadOnly?: boolean;
};

const EvidenceComponentsTabContainer = React.memo(
  ({ channel, isReadOnly, nodeId, dialogData }: OwnProps) => {
    const dispatch = useDispatch();
    const [
      { pageNumber, rowsPerPage, sortKeys, sortColumnIndex, sortAsc },
      setState
    ] = useState<CommentsTabContainerState>(initialState);

    const nodeType = (dialogData as DialogDataProps)?.nodeType;
    const { components, error, isLoading } = useSelector(
      (state: RootStateType) => state.conceptComponentsReducer
    );
    const metaFormDocument = useMetaFormDocument();
    const componentsDir = useSelector((state: RootStateType) =>
      getRelativePath(
        state.loginReducer.global.paths,
        null,
        SitePaths.Components
      )
    );

    const sortedComponents = useMemo(() => {
      return components
        ? sortKeys
          ? components.entities
          : sortComponents(components.entities)
        : [];
    }, [components, sortKeys]);

    const fetchComponents = () =>
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
            where: `(assocType='${Associations.Components}')`
          }
        })
      );

    useEffect(() => {
      fetchComponents();
    }, [nodeId, rowsPerPage, pageNumber]); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
      if (!sortedComponents.length) {
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
            errorResponse.ids &&
            errorResponse.ids.length < selectedComponents.length
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
            onSuccess
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
            onSuccess
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

    const handleIsComponentDeletable = (component: File) => {
      return !!component.path?.startsWith(
        `${COMPANY_HOME_PREFIX}${componentsDir}`
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
        if (!selected[0]) {
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
        handleChangePage={handleChangePage}
        handleChangeRowsPerPage={handleChangeRowsPerPage}
        handleColumnChange={handleColumnChange}
        handleDeleteComponent={handleDeleteComponent}
        handleDownloadComponent={handleDownloadComponent}
        handleIsComponentDeletable={handleIsComponentDeletable}
        handleRenameComponent={handleRenameComponent}
        handleShowPreview={handleShowPreview}
        handleSelectionChange={handleSelectionChange}
        handleSwapComponentContent={handleSwapComponentContent}
        handleSortingChange={handleSortingChange}
        handleUploadComponent={handleUploadComponent}
        isLoading={isLoading}
        isReadonly={isReadOnly || !!(dialogData as DialogDataProps)?.isReadonly}
        items={sortedComponents}
        pageNumber={pageNumber}
        refreshTable={fetchComponents}
        rowsPerPage={rowsPerPage}
        sortAsc={sortAsc}
        sortColumnIndex={sortColumnIndex}
        totalItems={components.pagination?.count || 0}
      />
    );
  }
);

export default EvidenceComponentsTabContainer;
