import { shipmentsAction } from "core/api/node/_actions";
import {
  DialogContentType,
  DialogDataProps
} from "core/components/dialog/_types";
import { Associations } from "enums";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootStateType } from "../../../../reducers";
import { ShipmentAssocTypes } from "../sendShipmentDialog/_types";
import { CreateShipmentForm } from "./CreateShipmentForm";

const handleSortingChange: (
  index: number,
  keys: string[]
) => (
  event: React.MouseEvent<HTMLTableRowElement, MouseEvent>
) => void = () => () => void 0;

export const CreateShipment: DialogContentType["content"] = ({
  channel,
  dialogData
}) => {
  const dispatch = useDispatch();
  const nodeId = (dialogData as DialogDataProps).id as string;

  useEffect(() => {
    channel.setIsSaved(true);
  });

  const { entities, isLoading, totalItems } = useSelector(
    (state: RootStateType) => {
      return {
        entities: state.shipmentsReducer?.components?.entities,
        isLoading: state.shipmentsReducer.components?.loading,
        totalItems:
          state.shipmentsReducer.components?.pagination?.totalItems || 0
      };
    }
  );

  useEffect(() => {
    loadData();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const loadData = () => {
    dispatch(
      shipmentsAction.request({
        assocType: ShipmentAssocTypes.Components,
        nodeId,
        where: `(assocType='${Associations.Components}')`
      })
    );
  };

  const handleChangePage = () => {};
  const handleChangeRowsPerPage = () => {};

  return (
    <div className="body-fullsize">
      <CreateShipmentForm
        channel={channel}
        dialogData={dialogData}
        handleSortingChange={handleSortingChange}
        handleChangeRowsPerPage={handleChangeRowsPerPage}
        handleChangePage={handleChangePage}
        readonly={!!(dialogData as DialogDataProps)?.isReadonly}
        isLoading={!!isLoading}
        totalItems={totalItems}
        rows={entities}
      />
    </div>
  );
};
