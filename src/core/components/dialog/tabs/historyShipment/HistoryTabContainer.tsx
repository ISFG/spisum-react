import { ShipmentHistory } from "core/api/models";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootStateType } from "reducers";
import { shipmentHistoryAction } from "../../../../api/shipment/_action";
import { DialogTabContentPropsType } from "../../_types";
import HistoryTab from "./HistoryTab";
import { historyShipmentTab__Clear } from "./_actions";
import { ShipmentHistoryTableType } from "./_types";

type HistoryTabContainerProps = DialogTabContentPropsType & {
  nodeId: string;
  pid: string;
};

interface HistoryTabContainerState {
  pageNumber: number;
  rowsPerPage: number;
}

const initialState: HistoryTabContainerState = {
  pageNumber: 0,
  rowsPerPage: 50
};

const entryMapper = (
  item: {
    entry: ShipmentHistory;
  },
  pid: string
): ShipmentHistoryTableType => {
  return {
    description: item?.entry?.description,
    eventType: item?.entry?.eventType,
    id: item?.entry?.id,
    occuredAt: item?.entry?.occuredAt,
    pid,
    userId: item?.entry?.userId
  };
};

const HistoryTabContainer = ({
  channel,
  isActive,
  nodeId,
  pid
}: HistoryTabContainerProps) => {
  const [{ pageNumber, rowsPerPage }, setState] = useState<
    HistoryTabContainerState
  >(initialState);

  const { entries, totalItems, isLoading, error } = useSelector(
    (state: RootStateType) => {
      return {
        entries: state.historyShipmentReducer.list.entries?.map((entry) =>
          entryMapper(entry, pid)
        ),
        error: state.historyShipmentReducer.error,
        isLoading: state.historyShipmentReducer.isLoading,
        totalItems:
          state.historyShipmentReducer.list.pagination?.totalItems || 0
      };
    }
  );
  const dispatch = useDispatch();
  const loadData = useCallback(
    () =>
      dispatch(
        shipmentHistoryAction.request({
          maxItems: rowsPerPage,
          nodeId,
          skipCount: pageNumber * rowsPerPage
        })
      ),
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
      dispatch(historyShipmentTab__Clear());
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
