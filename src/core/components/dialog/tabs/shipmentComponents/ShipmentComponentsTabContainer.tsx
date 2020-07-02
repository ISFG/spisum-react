import {
  componentUpdateAction,
  componentViewShipmentAction,
  componentViewShipmentUpdateAction
} from "core/api/components/_actions";
import { DataColumn, ValueType } from "core/components/dataTable/_types";
import { Associations, SitePaths } from "enums";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootStateType } from "reducers";
import { renameComponentAction } from "share/components/dialog/renameComponentDialog/_actions";
import { ShipmentFormValues } from "share/components/dialog/shipmentDetailDialog/_types";
import { getRelativePath } from "share/utils/query";
import { callAsyncAction } from "../../../../action";
import { File } from "../../../../entities";
import { useMetaFormDocument } from "../../hooks/useMetaFormDocument";
import { DialogContentPropsType, DialogDataProps } from "../../_types";
import ComponentsTab from "./ComponentsTab";
import { componentValidation, sortComponents } from "./methods";
import { SelectedComponentsFnType } from "./_types";

const COMPANY_HOME_PREFIX = "/Company Home/";

type ComponentsTabContainerState = {
  pageNumber: number;
  rowsPerPage: number;
  selectedComponents?: File[];
};

const initialState: ComponentsTabContainerState = {
  pageNumber: 0,
  rowsPerPage: 100
};

type OwnProps = DialogContentPropsType & {
  nodeId: string;
  isReadOnly?: boolean;
};

const ShipmentComponentsTabContainer = React.memo(
  ({ channel, isReadOnly, nodeId, dialogData }: OwnProps) => {
    const dispatch = useDispatch();
    const { components, error, isLoading, selected } = useSelector(
      (state: RootStateType) => state.componentShipmentReducer
    );
    const { nodeType } = dialogData as ShipmentFormValues;
    const [{ pageNumber, rowsPerPage }, setState] = useState<
      ComponentsTabContainerState
    >({
      ...initialState,
      selectedComponents: selected.entities
    });
    const metaFormDocument = useMetaFormDocument();
    const readonly =
      isReadOnly ||
      !!(dialogData as DialogDataProps)?.isReadonly ||
      !!(dialogData as DialogDataProps)?.isComponentReadonly;
    const componentsDir = useSelector((state: RootStateType) =>
      getRelativePath(
        state.loginReducer.global.paths,
        null,
        SitePaths.Components
      )
    );

    const sortedComponents = useMemo(
      () => (!components ? [] : sortComponents(components.entities)),
      [components]
    );

    const fetchComponents = () =>
      dispatch(
        callAsyncAction({
          action: componentViewShipmentAction,
          onSuccessNotification: null,
          payload: {
            documentId: (dialogData as DialogDataProps)?.documentId,
            include: ["properties", "path"],
            maxItems: rowsPerPage,
            nodeId,
            skipCount: rowsPerPage * pageNumber,
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
        nodeType: (dialogData as DialogDataProps)?.nodeType
      });
    }, [channel, dialogData, nodeId, sortedComponents]);

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
    const isSaveAble = (item: File[]) => {
      const { isTooBig, isWrongCountOfFiles } = componentValidation(
        item,
        nodeType
      );

      return !isTooBig && !isWrongCountOfFiles;
    };
    useEffect(() => {
      channel.setState({
        ...channel.state,
        preventAction: !isSaveAble(selected.entities),
        selectedComponentsIds: [...selected.entities].map((item) => item.id)
      });
    }, [selected]); // eslint-disable-line react-hooks/exhaustive-deps

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

    const handleShowPreview = () => {};
    const handleSelectionChange = (items: File[]) => {
      if (readonly) return;
      dispatch(componentViewShipmentUpdateAction(items));
    };

    if (error) {
      return <div />;
    }

    return (
      <ComponentsTab
        handleChangePage={handleChangePage}
        handleChangeRowsPerPage={handleChangeRowsPerPage}
        handleColumnChange={handleColumnChange}
        handleIsComponentDeletable={handleIsComponentDeletable}
        handleRenameComponent={handleRenameComponent}
        handleShowPreview={handleShowPreview}
        handleSelectionChange={handleSelectionChange}
        selected={selected.entities}
        isLoading={isLoading}
        isReadonly={isReadOnly || !!(dialogData as DialogDataProps)?.isReadonly}
        items={sortedComponents}
        pageNumber={pageNumber}
        nodeType={nodeType}
        refreshTable={fetchComponents}
      />
    );
  }
);

export default ShipmentComponentsTabContainer;
