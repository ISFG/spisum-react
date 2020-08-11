import {
  NodeChildAssociationEntry,
  SslAnalog,
  SslDatabox,
  SslEmail,
  SslProperties
} from "core/api/models";
import {
  createSafeAction,
  createSafeAsyncAction
} from "share/utils/typesafeActions";
import { ErrorType } from "types";
import {
  ShipmentOpenDialogDetailActionType,
  ShipmentSaveRequestType
} from "./_types";

export const shipmentDetailDialogOpen = createSafeAction(
  "@dialog/SHIPMENT_DETAIL_DIALOG_OPEN"
)<ShipmentOpenDialogDetailActionType>();

export const shipmentDetailEditActionType = createSafeAsyncAction(
  "@dialog/SHIPMENT_DETAIL_EDIT_ACTION_REQUEST",
  "@dialog/SHIPMENT_DETAIL_EDIT_ACTION_SUCCESS",
  "@dialog/SHIPMENT_DETAIL_EDIT_ACTION_FAILURE"
)<
  ShipmentSaveRequestType,
  NodeChildAssociationEntry<
    SslProperties | SslAnalog | SslDatabox | SslEmail
  > | null,
  ErrorType
>();
