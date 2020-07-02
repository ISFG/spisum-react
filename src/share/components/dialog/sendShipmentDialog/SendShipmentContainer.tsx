import { AddCircleOutline, Delete, Description } from "@material-ui/icons";
import { shipmentsAction } from "core/api/node/_actions";
import { ControlsBarType } from "core/components/dataTable/_types";
import { dialogOpenAction } from "core/components/dialog/_actions";
import {
  DialogContentType,
  DialogDataProps,
  DialogType
} from "core/components/dialog/_types";
import { ShipmentDocument } from "core/types";
import { Associations } from "enums";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { lang, t } from "translation/i18n";
import { RootStateType } from "../../../../reducers";
import { translationPath } from "../../../utils/getPath";
import { shipmentDetailDialogOpen } from "../shipmentDetailDialog/_action";
import { SendShipment } from "./SendShipment";
import { SendShipmentState, ShipmentAssocTypes } from "./_types";

const initialState: SendShipmentState = {
  createdShipment: {
    pageNumber: 0,
    rowsPerPage: 25
  },
  returnedShipment: {
    pageNumber: 0,
    rowsPerPage: 25
  }
};

export const SendShipmentContainer: DialogContentType["content"] = ({
  channel,
  dialogData
}) => {
  const dispatch = useDispatch();
  const nodeId = (dialogData as DialogDataProps).id as string;
  const [{ createdShipment, returnedShipment }, setState] = useState<
    SendShipmentState
  >(initialState);

  const [selectedReturnedComponents, setSelectedReturnedComponents] = useState<
    ShipmentDocument[] | []
  >([]);

  const [selectedCreatedComponents, setSelectedCreatedComponents] = useState<
    ShipmentDocument[] | []
  >([]);

  const { created, returned } = useSelector((state: RootStateType) => {
    return state.shipmentsReducer;
  });

  useEffect(() => {
    channel.setState({
      ...channel.state,
      selectedComponentsIds: [
        ...selectedCreatedComponents,
        ...selectedReturnedComponents
      ].map((item) => item.id)
    });
  }, [selectedCreatedComponents, selectedReturnedComponents]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    loadCreatedShipments();
  }, [createdShipment]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    loadReturnedShipments();
  }, [returnedShipment]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleChangePageReturnedShipment: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null,
    page: number
  ) => void = (_, page) => {
    setState((state) => ({
      ...state,
      returnedShipment: {
        pageNumber: page,
        rowsPerPage: returnedShipment.rowsPerPage
      }
    }));
  };

  const handleChangePageCreatedShipment: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null,
    page: number
  ) => void = (_, page) => {
    setState((state) => ({
      ...state,
      createdShipment: {
        pageNumber: page,
        rowsPerPage: createdShipment.rowsPerPage
      }
    }));
  };

  const handleChangeRowsPerPageReturnedShipment: (
    event: React.ChangeEvent<HTMLInputElement>
  ) => void = (event) => {
    setState((state) => ({
      ...state,
      returnedShipment: {
        pageNumber: 0,
        rowsPerPage: parseInt(event.target.value, 10)
      }
    }));
  };

  const handleChangeRowsPerPageCreatedShipment: (
    event: React.ChangeEvent<HTMLInputElement>
  ) => void = (event) => {
    setState((state) => ({
      ...state,
      createdShipment: {
        pageNumber: 0,
        rowsPerPage: parseInt(event.target.value, 10)
      }
    }));
  };

  const loadReturnedShipments = () => {
    dispatch(
      shipmentsAction.request({
        assocType: ShipmentAssocTypes.Returned,
        maxItems: returnedShipment.rowsPerPage,
        nodeId,
        skipCount: returnedShipment.pageNumber * returnedShipment.rowsPerPage,
        where: `(assocType='${Associations.ShipmentsReturned}')`
      })
    );
  };

  const loadCreatedShipments = () => {
    dispatch(
      shipmentsAction.request({
        assocType: ShipmentAssocTypes.Created,
        maxItems: createdShipment.rowsPerPage,
        nodeId,
        skipCount: createdShipment.pageNumber * createdShipment.rowsPerPage,
        where: `(assocType='${Associations.ShipmentsCreated}')`
      })
    );
  };

  const loadData = () => {
    loadReturnedShipments();
    loadCreatedShipments();
  };

  const baseControls: ControlsBarType<ShipmentDocument> = {
    single: {
      items: [
        {
          action: (selected: ShipmentDocument[]) => {
            dispatch(
              shipmentDetailDialogOpen({
                documentId: nodeId,
                onClose: loadData,
                selected: selected[0]
              })
            );
          },
          icon: <Description />,
          title: t(translationPath(lang.general.showShipment))
        },
        {
          action: (selected: ShipmentDocument[]) => {
            // OPTIMIZE: the onClose action doesn't need to reload all data,
            // but just remove deleted item from the shipmentsReducer
            dispatch(
              dialogOpenAction({
                dialogData: { id: selected[0].id, onClose: loadData },
                dialogType: DialogType.CancelShipment
              })
            );
          },
          icon: <Delete />,
          title: t(translationPath(lang.general.deleteShipment))
        }
      ]
    }
  };

  const extendedControls: ControlsBarType<ShipmentDocument> = {
    ...baseControls,
    default: {
      items: [
        {
          action: (selected: ShipmentDocument[]) => {
            dispatch(
              dialogOpenAction({
                dialogData: {
                  ...dialogData,
                  id: nodeId,
                  onClose: loadData
                },
                dialogType: DialogType.CreateShipment
              })
            );
          },
          icon: <AddCircleOutline />,
          title: t(translationPath(lang.general.createShipment))
        }
      ]
    }
  };

  const handleSortingChangeReturnedShipment: (
    index: number,
    keys: string[]
  ) => (
    event: React.MouseEvent<HTMLTableRowElement, MouseEvent>
  ) => void = () => () => void 0;

  const handleSortingChangeCreatedShipment: (
    index: number,
    keys: string[]
  ) => (
    event: React.MouseEvent<HTMLTableRowElement, MouseEvent>
  ) => void = () => () => void 0;

  useEffect(() => {
    loadCreatedShipments();
  }, [createdShipment]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    loadReturnedShipments();
  }, [returnedShipment]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleSelectionChangeReturnedShipment = (items: ShipmentDocument[]) => {
    setSelectedReturnedComponents(items);
  };
  const handleSelectionChangeCreatedShipment = (items: ShipmentDocument[]) => {
    setSelectedCreatedComponents(items);
  };

  return (
    <SendShipment
      returnedShipmentRows={returned.entities}
      returnedShipmentLoading={!!returned.loading}
      returnedShipmentTotalItems={returned?.pagination?.totalItems || 0}
      handleChangePageReturnedShipment={handleChangePageReturnedShipment}
      handleChangeRowsPerPageReturnedShipment={
        handleChangeRowsPerPageReturnedShipment
      }
      handleSortingChangeReturnedShipment={handleSortingChangeReturnedShipment}
      handleRefreshReturnedShipment={loadReturnedShipments}
      returnedShipmentRowsPerPage={returnedShipment.rowsPerPage}
      returnedShipmentPageNumber={returnedShipment.pageNumber}
      returnedShipmentControls={baseControls}
      createdShipmentControls={extendedControls}
      createdShipmentRows={created.entities}
      createdShipmentTotalItems={created?.pagination?.totalItems || 0}
      createdShipmentLoading={!!created.loading}
      handleRefreshCreatedShipment={loadCreatedShipments}
      handleChangePageCreatedShipment={handleChangePageCreatedShipment}
      handleChangeRowsPerPageCreatedShipment={
        handleChangeRowsPerPageCreatedShipment
      }
      handleSelectionChangeCreatedShipment={
        handleSelectionChangeCreatedShipment
      }
      handleSelectionChangeReturnedShipment={
        handleSelectionChangeReturnedShipment
      }
      handleSortingChangeCreatedShipment={handleSortingChangeCreatedShipment}
      createdShipmentPageNumber={createdShipment.pageNumber}
      createdShipmentRowsPerPage={createdShipment.rowsPerPage}
    />
  );
};
