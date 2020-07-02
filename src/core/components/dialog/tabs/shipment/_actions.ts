import { SuccessListResponseType } from "core/api/models";
import { NodeChildrenRequestType } from "core/api/node/_types";
import { ShipmentDocument } from "core/types";
import { createSafeAsyncAction } from "share/utils/typesafeActions";
import { ErrorType } from "types";
import { ActionType } from "typesafe-actions";
import { dialogAction__Clear } from "../../_actions";

export const nodeShipmentAction = createSafeAsyncAction(
  "@dialog/FETCH_NODE_SHIPMENT_ACTION_REQUEST",
  "@dialog/FETCH_NODE_SHIPMENT_ACTION_SUCCESS",
  "@dialog/FETCH_NODE_SHIPMENT_ACTION_FAILURE"
)<
  NodeChildrenRequestType,
  SuccessListResponseType<ShipmentDocument>,
  ErrorType
>();

export type ShipmentTabActionTypes =
  | ActionType<typeof nodeShipmentAction>
  | ActionType<typeof dialogAction__Clear>;
