import { SendModeValues } from "../../../../enums";
import { createProxy } from "../../../utils/getPath";

export interface CreateShipmentTableItemType {
  size: string;
  name: string;
  id: string;
}
export const CreateShipmentTableTypeProxy = createProxy<
  CreateShipmentTableItemType
>();

export interface CreateShipmentFormValues {
  address1?: string;
  address2?: string;
  address3?: string;
  address4?: string;
  addressCity?: string;
  addressState?: string;
  addressStreet?: string;
  addressZip?: string;
  allowSubstDelivery?: boolean;
  components?: string[];
  dateFrom: Date;
  dateTo?: Date | null;
  days?: number | string;
  legalTitleLaw?: number | string;
  legalTitlePar?: number | string;
  legalTitlePoint?: string;
  legalTitleSect?: number | string;
  legalTitleYear?: number | string;
  note?: string;
  personalDelivery?: boolean;
  postItemCashOnDelivery?: number | string;
  postItemStatedPrice?: number | string;
  postType?: string[];
  postTypeOther?: string;
  postItemType?: string;
  postItemTypeOther?: string;
  postItemWeight?: number | string;
  recipient?: string;
  sender?: string;
  sendMode: SendModeValues;
  subject?: string;
  toHands?: string;
}

export interface CreateShipmentsRequestType {
  nodeId: string;
  nodeType: string;
  components: string[];
  postType?: string;
  recipient: string;
  sendMode: SendModeValues;
  subject: string;
  sender: string;
}

export const CreateShipmentFormValuesProxy = createProxy<
  CreateShipmentFormValues
>();
