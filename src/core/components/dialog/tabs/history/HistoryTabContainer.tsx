import { NodeHistory } from "core/api/models";
import { nodeHistoryAction } from "core/api/node/_actions";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootStateType } from "reducers";
import { DialogDataGenericData, DialogTabContentPropsType } from "../../_types";
import HistoryTab from "./HistoryTab";
import { historyTab__Clear } from "./_actions";

type HistoryTabContainerProps = DialogTabContentPropsType & {
  nodeId: string;
};

interface HistoryTabContainerState {
  pageNumber: number;
  rowsPerPage: number;
}

const initialState: HistoryTabContainerState = {
  pageNumber: 0,
  rowsPerPage: 50
};

const entryMapper = (item: { entry: NodeHistory }): NodeHistory => {
  if (!item.entry) {
    return {} as NodeHistory;
  }

  return {
    description: item?.entry?.description,
    eventType: item?.entry?.eventType,
    id: item?.entry?.id,
    occuredAt: item?.entry?.occuredAt,
    pid: item?.entry?.pid,
    userId: item?.entry?.userId
  };
};

const HistoryTabContainer = ({
  nodeId,
  dialogProps,
  isActive,
  channel
}: HistoryTabContainerProps) => {
  const [{ pageNumber, rowsPerPage }, setState] = useState<
    HistoryTabContainerState
  >(initialState);

  const nodeType = (dialogProps.data as DialogDataGenericData)?.nodeType;
  const { entries, totalItems, isLoading, error } = useSelector(
    (state: RootStateType) => {
      return {
        entries: state.historyReducer.list.entries?.map(entryMapper),
        error: state.historyReducer.error,
        isLoading: state.historyReducer.isLoading,
        totalItems: state.historyReducer.list.pagination?.totalItems || 0
      };
    }
  );

  const dispatch = useDispatch();
  const loadData = useCallback(
    () => {
      dispatch(
        nodeHistoryAction.request({
          maxItems: rowsPerPage,
          nodeId,
          nodeType,
          skipCount: pageNumber * rowsPerPage
        })
      );
    },
    [pageNumber, rowsPerPage] // eslint-disable-line react-hooks/exhaustive-deps
  );

  channel.refreshData = loadData;

  useEffect(() => {
    if (isActive && entries === undefined) {
      loadData();
    }
  }, [isActive]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (isActive) {
      loadData();
    }
  }, [pageNumber, rowsPerPage]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(
    () => () => {
      dispatch(historyTab__Clear());
    },
    [] // eslint-disable-line react-hooks/exhaustive-deps
  );

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

  if (error) {
    return <div />;
  }

  return (
    <HistoryTab
      items={entries || []}
      totalItems={totalItems}
      pageNumber={pageNumber}
      refreshTable={loadData}
      rowsPerPage={rowsPerPage}
      handleChangePage={handleChangePage}
      handleChangeRowsPerPage={handleChangeRowsPerPage}
      isLoading={isLoading}
    />
  );
};

export default HistoryTabContainer;
