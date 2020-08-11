import { Description, Mail } from "@material-ui/icons";
import { ControlsBarType } from "core/components/dataTable/_types";
import { dialogOpenAction } from "core/components/dialog/_actions";
import {
  DialogTabContentPropsType,
  DialogType
} from "core/components/dialog/_types";
import { isGenericDocument, ShipmentDocument } from "core/types";
import { SpisumNodeTypes } from "enums";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootStateType } from "reducers";
import { shipmentDetailDialogOpen } from "share/components/dialog/shipmentDetailDialog/_action";
import { translationPath } from "share/utils/getPath";
import { lang, t } from "translation/i18n";
import ShipmentTab from "./ShipmentTab";
import { nodeShipmentAction } from "./_actions";

type ShipmentTabContainerProps = DialogTabContentPropsType & {
  nodeId: string;
};

interface ShipmentTabContainerState {
  pageNumber: number;
  rowsPerPage: number;
}

const initialState: ShipmentTabContainerState = {
  pageNumber: 0,
  rowsPerPage: 50
};

const ShipmentTabContainer = ({
  channel,
  dialogProps,
  isActive,
  nodeId
}: ShipmentTabContainerProps) => {
  const [{ pageNumber, rowsPerPage }, setState] = useState<
    ShipmentTabContainerState
  >(initialState);

  const { entries, totalItems, isLoading, error } = useSelector(
    (state: RootStateType) => {
      return {
        entries: state.shipmentTabReducer.list.entries?.map((e) => e.entry),
        error: state.shipmentTabReducer.error,
        isLoading: state.shipmentTabReducer.isLoading,
        totalItems: state.shipmentTabReducer.list.pagination?.totalItems || 0
      };
    }
  );

  const dispatch = useDispatch();
  const loadData = useCallback(
    () =>
      dispatch(
        nodeShipmentAction.request({
          nodeId,
          where: `(nodeType='${SpisumNodeTypes.Shipment} INCLUDESUBTYPES')`
        })
      ),
    [nodeId] // eslint-disable-line react-hooks/exhaustive-deps
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

  const controls: ControlsBarType<ShipmentDocument> = {
    default: {
      items: dialogProps.hideManageShipmentsIcon
        ? undefined
        : [
            {
              action: (selected: ShipmentDocument[]) => {
                dispatch(
                  dialogOpenAction({
                    dialogProps: {
                      data: {
                        id: nodeId,
                        ...(isGenericDocument(dialogProps.data)
                          ? { nodeType: dialogProps.data.nodeType }
                          : {})
                      },

                      onClose: () => loadData()
                    },
                    dialogType: DialogType.SendShipment
                  })
                );
              },
              icon: <Mail />,
              title: t(translationPath(lang.general.manageShipments))
            }
          ]
    },
    single: {
      items: [
        {
          action: (selected: ShipmentDocument[]) => {
            dispatch(
              shipmentDetailDialogOpen({
                documentId: nodeId,
                onClose: loadData,
                readonly: true,
                selected: selected[0]
              })
            );
          },
          icon: <Description />,
          title: t(translationPath(lang.general.showDetails))
        }
      ]
    }
  };

  if (error) {
    return <div />;
  }

  return (
    <ShipmentTab
      controls={controls}
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

export default ShipmentTabContainer;
