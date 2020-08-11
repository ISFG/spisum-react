import { ErrorType } from "types";
import { createSafeAsyncAction } from "../../../utils/typesafeActions";
import { SendShipmentsRequestType } from "./_types";

export const sendShipmentAction = createSafeAsyncAction(
  "@shipment/SEND_SHIPMENT_ACTION_REQUEST",
  "@shipment/SEND_SHIPMENT_ACTION_ACTION_SUCCESS",
  "@shipment/SEND_SHIPMENT_ACTION_ACTION_ERROR"
)<SendShipmentsRequestType, {}, ErrorType>();
