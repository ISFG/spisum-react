import { SuccessListResponseType } from "core/api/models";
import { ShipmentDocument } from "core/types";

export type NodeShipmentStateType = SuccessListResponseType<
  ShipmentDocument
> & {
  isLoading: boolean;
  error: string | null;
};
