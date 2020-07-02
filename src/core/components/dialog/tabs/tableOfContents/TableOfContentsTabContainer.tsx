import {
  Description,
  Eject,
  Gesture,
  Mail,
  NextWeek,
  WorkOff
} from "@material-ui/icons";
import { tableOfContentsAction } from "core/api/node/_actions";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootStateType } from "reducers";
import { settleDocumentDialogOpen } from "../../../../../share/components/dialog/settleDocumentDialog/_actions";
import { translationPath } from "../../../../../share/utils/getPath";
import { lang, t } from "../../../../../translation/i18n";
import { openDocumentWithSaveButtonsAction } from "../../../../api/document/_actions";
import { GenericDocument } from "../../../../types";
import { ControlsBarType } from "../../../dataTable/_types";
import { dialogOpenAction } from "../../_actions";
import { DialogContentPropsType, DialogType } from "../../_types";
import TableOfContentsTab from "./TableOfContentsTab";

type TableOfContentsTabContainerProps = DialogContentPropsType & {
  nodeId: string;
};

interface TableOfContentsTabContainerState {
  pageNumber: number;
  rowsPerPage: number;
}

const initialState: TableOfContentsTabContainerState = {
  pageNumber: 0,
  rowsPerPage: 25
};

const TableOfContentsTabContainer = ({
  nodeId
}: TableOfContentsTabContainerProps) => {
  const [{ pageNumber, rowsPerPage }, setState] = useState<
    TableOfContentsTabContainerState
  >(initialState);

  const { entities, totalItems, loading } = useSelector(
    (state: RootStateType) => {
      return {
        entities: state.tableOfContentsReducer.entities,
        loading: state.tableOfContentsReducer.loading,
        totalItems: state.tableOfContentsReducer.pagination?.totalItems || 0
      };
    }
  );

  const dispatch = useDispatch();
  const loadData = () =>
    dispatch(
      tableOfContentsAction.request({
        maxItems: rowsPerPage,
        nodeId,
        skipCount: pageNumber * rowsPerPage
      })
    );

  useEffect(() => {
    loadData();
  }, [pageNumber, rowsPerPage]); // eslint-disable-line react-hooks/exhaustive-deps

  const isDocumentProcessed = (document: GenericDocument): boolean => {
    const pathName = document?.path?.name || "";
    return pathName.includes("/Documents/Processed");
  };

  const controls: ControlsBarType<GenericDocument> = {
    multi: {
      items: [
        {
          action: (selected: GenericDocument[]) => {
            dispatch(
              dialogOpenAction({
                dialogData: {
                  id: nodeId,
                  onClose: loadData,
                  selected
                },
                dialogType: DialogType.TakeOutFromFile
              })
            );
          },
          icon: <Eject />,
          title: t(translationPath(lang.general.takeOutFromFile))
        }
      ]
    },
    single: {
      items: [
        {
          action: (selected: GenericDocument[]) => {
            dispatch(
              openDocumentWithSaveButtonsAction({
                ...selected[0],
                onClose: loadData
              })
            );
          },
          icon: <Description />,
          title: t(translationPath(lang.general.showDetails))
        },
        {
          action: (selected: GenericDocument[]) => {
            dispatch(
              dialogOpenAction({
                dialogData: {
                  ...selected[0],
                  onClose: loadData
                },
                dialogType: DialogType.ForSignature
              })
            );
          },
          filter: (doc) => {
            return !isDocumentProcessed(doc);
          },
          icon: <Gesture />,
          title: t(translationPath(lang.general.toSign))
        },
        {
          action: (selected: GenericDocument[]) => {
            dispatch(
              settleDocumentDialogOpen({ ...selected[0], onClose: loadData })
            );
          },
          filter: (doc) => {
            return !isDocumentProcessed(doc);
          },
          icon: <NextWeek />,
          title: t(translationPath(lang.general.settle))
        },
        {
          action: (selected: GenericDocument[]) => {
            dispatch(
              dialogOpenAction({
                dialogData: {
                  ...selected[0],
                  onClose: loadData
                },
                dialogType: DialogType.CancelProcessing
              })
            );
          },
          filter: (doc) => {
            return isDocumentProcessed(doc);
          },
          icon: <WorkOff />,
          title: t(translationPath(lang.general.cancelProcessing))
        },
        {
          action: (selected: GenericDocument[]) => {
            dispatch(
              dialogOpenAction({
                dialogData: {
                  ...selected[0],
                  onClose: loadData
                },
                dialogType: DialogType.SendShipment
              })
            );
          },
          icon: <Mail />,
          title: t(translationPath(lang.general.manageShipments))
        },
        {
          action: (selected: GenericDocument[]) => {
            dispatch(
              dialogOpenAction({
                dialogData: {
                  id: nodeId,
                  onClose: loadData,
                  selected
                },
                dialogType: DialogType.TakeOutFromFile
              })
            );
          },
          icon: <Eject />,
          title: t(translationPath(lang.general.takeOutFromFile))
        }
      ]
    }
  };

  const handleChangePage: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null,
    page: number
  ) => void = (_, page) => {
    setState((state) => ({
      pageNumber: page,
      rowsPerPage: state.rowsPerPage
    }));
  };

  const handleChangeRowsPerPage: (
    event: React.ChangeEvent<HTMLInputElement>
  ) => void = (event) => {
    setState(() => ({
      pageNumber: 0,
      rowsPerPage: parseInt(event.target.value, 10)
    }));
  };

  return (
    <TableOfContentsTab
      controls={controls}
      items={entities}
      totalItems={totalItems}
      pageNumber={pageNumber}
      refreshTable={loadData}
      rowsPerPage={rowsPerPage}
      handleChangePage={handleChangePage}
      handleChangeRowsPerPage={handleChangeRowsPerPage}
      isLoading={!!loading}
    />
  );
};

export default TableOfContentsTabContainer;
