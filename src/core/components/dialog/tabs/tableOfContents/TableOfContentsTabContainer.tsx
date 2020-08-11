import {
  Description,
  Eject,
  Gesture,
  Mail,
  NextWeek,
  WorkOff
} from "@material-ui/icons";
import { tableOfContentsAction } from "core/api/node/_actions";
import { GenericDocument } from "core/types";
import { default as React, useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootStateType } from "reducers";
import { settleDocumentDialogOpen } from "share/components/dialog/settleDocumentDialog/_actions";
import { translationPath } from "share/utils/getPath";
import { lang, t } from "translation/i18n";
import { openDocumentWithSaveButtonsAction } from "../../../../api/document/_actions";
import { ControlsBarType } from "../../../dataTable/_types";
import { dialogOpenAction } from "../../_actions";
import { DialogTabContentPropsType, DialogType } from "../../_types";
import TableOfContentsTab from "./TableOfContentsTab";

type TableOfContentsTabContainerProps = DialogTabContentPropsType & {
  nodeId: string;
};

interface TableOfContentsTabContainerState {
  pageNumber: number;
  rowsPerPage: number;
}

const initialState: TableOfContentsTabContainerState = {
  pageNumber: 0,
  rowsPerPage: 50
};

const TableOfContentsTabContainer = ({
  channel,
  isActive,
  nodeId,
  dialogProps
}: TableOfContentsTabContainerProps) => {
  const [{ pageNumber, rowsPerPage }, setState] = useState<
    TableOfContentsTabContainerState
  >(initialState);
  const [wasLoaded, setWasLoaded] = useState<boolean>(false);

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
  const loadData = useCallback(
    () =>
      dispatch(
        tableOfContentsAction.request({
          maxItems: rowsPerPage,
          nodeId,
          skipCount: pageNumber * rowsPerPage
        })
      ),
    [pageNumber, rowsPerPage] // eslint-disable-line react-hooks/exhaustive-deps
  );

  channel.refreshData = loadData;

  useEffect(() => {
    if (isActive && !wasLoaded) {
      loadData();
      setWasLoaded(true);
    }
  }, [isActive]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (isActive) {
      loadData();
    }
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
                dialogProps: {
                  data: {
                    id: nodeId,
                    selected
                  },
                  onClose: loadData
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
                data: selected[0],
                initiator: dialogProps?.initiator,
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
                dialogProps: {
                  data: selected[0],
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
              settleDocumentDialogOpen({ data: selected[0], onClose: loadData })
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
                dialogProps: {
                  data: selected[0],
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
                dialogProps: {
                  data: selected[0],
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
                dialogProps: {
                  data: { id: nodeId, selected },
                  onClose: loadData
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
