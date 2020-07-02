import {
  componentUpdateAction,
  componentViewAction
} from "core/api/components/_actions";
import { DataColumn, ValueType } from "core/components/dataTable/_types";
import { GenericDocument } from "core/types";
import { Associations, SpisumNodeTypes } from "enums";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootStateType } from "reducers";
import { translationPath } from "../../../../../share/utils/getPath";
import { lang, t } from "../../../../../translation/i18n";
import { callAsyncAction } from "../../../../action";
import { ComponentType } from "../../../../api/components/_types";
import { File } from "../../../../entities";
import { getService } from "../../../../features/dependencyInjection";
import { Signer } from "../../../../services/Signer";
import { notificationAction } from "../../../notifications/_actions";
import { NotificationSeverity } from "../../../notifications/_types";
import { useMetaFormDocument } from "../../hooks/useMetaFormDocument";
import { dialogOpenAction } from "../../_actions";
import {
  DialogContentPropsType,
  DialogDataProps,
  DialogType
} from "../../_types";
import ComponentsTab from "./ComponentsTab";
import { sortComponents } from "./methods";

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
  componentType?: ComponentType;
};

const ComponentsTabContainer = React.memo(
  ({
    channel,
    isReadOnly,
    nodeId,
    dialogData,
    componentType = ComponentType.Document
  }: OwnProps) => {
    const signer = getService(Signer);
    const [selectedComponents, setSelectedComponents] = useState<File[]>([]);
    const dispatch = useDispatch();
    const [
      { pageNumber, rowsPerPage, sortKeys, sortColumnIndex, sortAsc },
      setState
    ] = useState<CommentsTabContainerState>(initialState);

    const { components, error, isLoading } = useSelector(
      (state: RootStateType) => state.componentsReducer
    );
    const nodeType = (dialogData as GenericDocument)?.nodeType;

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

    useEffect(() => {
      fetchComponents();
    }, [nodeId, rowsPerPage, pageNumber, sortColumnIndex, sortAsc]); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
      if (!sortedComponents.length) {
        return;
      }

      const previewableComponent = sortedComponents.find(handleCanShowPreview);

      if (previewableComponent) {
        channel.setPreviewItem(
          {
            ...previewableComponent,
            entityId: nodeId,
            nodeType
          },
          true
        );
      }
    }, [channel, sortedComponents]); // eslint-disable-line react-hooks/exhaustive-deps

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
    const metaFormDocument = useMetaFormDocument();
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

    const handleCanShowPreview = (component: File) => !isRowDisabled(component);

    const handleShowPreview = useCallback(
      (selected: File[]) => {
        if (!selected[0] || !handleCanShowPreview(selected[0])) {
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
      [channel] // eslint-disable-line react-hooks/exhaustive-deps
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

    const handleRowClick = (selected: File) => {
      if (!selected || !handleCanShowPreview(selected)) {
        // this will cause the Preview window to show the "unsupported file" message
        channel.setPreviewItem({});
        return;
      }

      channel.setPreviewItem(
        {
          ...selected,
          entityId: nodeId,
          nodeType
        },
        true
      );
    };

    const isRowDisabled = (component: File) =>
      component.fileIsInOutputFormat !== "yes";

    const handleSignDialogClose = () => {
      fetchComponents();
      setSelectedComponents([]);
    };

    const handleSelectionChange = (items: File[]) => {
      setSelectedComponents(items);
    };

    const handleSign = async (selected: File[]) => {
      // if selected components.length > 1 => BE returns batchID
      const signerData = await signer.getSignerData(nodeId, selected);

      if (signerData) {
        window.open(signerData.signer);
        dispatch(
          dialogOpenAction({
            dialogData: {
              onClose: handleSignDialogClose,
              signerComponentId: signerData?.batchId || signerData.components[0]
            },
            dialogType: DialogType.SignAndTimestamp
          })
        );
      } else {
        dispatch(
          notificationAction({
            message: t(translationPath(lang.dialog.notifications.actionFailed)),
            severity: NotificationSeverity.Error
          })
        );
      }
    };

    if (error) {
      return <div />;
    }

    return (
      <ComponentsTab
        handleChangePage={handleChangePage}
        handleChangeRowsPerPage={handleChangeRowsPerPage}
        handleColumnChange={handleColumnChange}
        handleCanShowPreview={handleCanShowPreview}
        handleShowPreview={handleShowPreview}
        handleSortingChange={handleSortingChange}
        handleCustomRowClick={handleRowClick}
        isRowDisabled={isRowDisabled}
        handleSign={handleSign}
        isLoading={isLoading}
        isReadonly={isReadOnly || !!(dialogData as DialogDataProps)?.isReadonly}
        items={sortedComponents}
        pageNumber={pageNumber}
        refreshTable={fetchComponents}
        rowsPerPage={rowsPerPage}
        sortAsc={sortAsc}
        sortColumnIndex={sortColumnIndex}
        totalItems={components.pagination?.totalItems || 0}
        selectedComponents={selectedComponents}
        handleSelectionChange={handleSelectionChange}
      />
    );
  }
);

export default ComponentsTabContainer;
