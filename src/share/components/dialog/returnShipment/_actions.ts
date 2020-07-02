import { ErrorType } from "../../../../types";
import { createSafeAsyncAction } from "../../../utils/typesafeActions";
import { ReturnShipmentRequestType } from "./_types";

export const returnShipmentAction = createSafeAsyncAction(
  "@shipment/RETURN_SHIPMENT_ACTION_REQUEST",
  "@shipment/RETURN_SHIPMENT_ACTION_ACTION_SUCCESS",
  "@shipment/RETURN_SHIPMENT_ACTION_ACTION_ERROR"
)<ReturnShipmentRequestType, {}, ErrorType>();
