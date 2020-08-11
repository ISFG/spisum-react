import { createSafeAction } from "share/utils/typesafeActions";
import { ActionType } from "typesafe-actions";
import { ShipmentHistoryActionType } from "../../../../api/shipment/_action";

export const historyShipmentTab__Clear = createSafeAction(
  "@historyShipmentTab/CLEAR"
)();

export type HistoryShipmentTabActionTypes =
  | ShipmentHistoryActionType
  | ActionType<typeof historyShipmentTab__Clear>;
