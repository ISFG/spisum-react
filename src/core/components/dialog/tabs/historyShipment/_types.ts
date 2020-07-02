import { createProxy } from "share/utils/getPath";
import { ShipmentHistorySuccessResponseType } from "../../../../api/shipment/_types";

// used for mapping in DataTable
export type ShipmentHistoryTableType = {
  createdAt: Date;
  createdBy: string;
  description: string;
  type: string;
  id: string;
  pid?: string;
};

export type ShipmentHistoryStateType = ShipmentHistorySuccessResponseType & {
  isLoading: boolean;
  error: string | null;
};

export const shipmentHistoryTableTypeProxy = createProxy<
  ShipmentHistoryTableType
>();
