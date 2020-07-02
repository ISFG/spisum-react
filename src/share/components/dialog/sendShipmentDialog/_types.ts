import { NodeSecondaryChildrenRequestType } from "core/api/components/_types";
import { EntityList } from "core/entities";
import { ShipmentDocument } from "core/types";
export interface ShipmentCreatedItemType {
  id: string;
  pid: string;
  sendMode: string;
  recipient: string;
  sizeInKB: number;
  name: string;
}

export interface SendShipmentState {
  createdShipment: {
    pageNumber: number;
    rowsPerPage: number;
  };
  returnedShipment: {
    pageNumber: number;
    rowsPerPage: number;
  };
}

export enum ShipmentAssocTypes {
  Returned = "returned",
  Created = "created",
  Components = "components"
}

export interface SendShipmentsRequestType {
  nodeId: string;
  shipmentsId: string[];
  shipmentType: string;
}

export interface ShipmentsRequestType extends NodeSecondaryChildrenRequestType {
  assocType: ShipmentAssocTypes;
}

export type ShipmentsStateType = Record<
  ShipmentAssocTypes,
  EntityList<ShipmentDocument>
>;

export type ShipmentsSuccessType = ShipmentsStateType;
