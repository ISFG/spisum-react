import { DocumentBaseRequestType } from "core/api/document/_types";
import { SslShipment } from "core/api/models";
import { ShipmentDocument } from "core/types";
import { SendModeValues, SpisumNodeTypes } from "enums";
import { createProxy } from "../../../utils/getPath";
import { MetaFormProps } from "../_types";

export type ShipmentFormValues = SslShipment & {
  createdAt: ShipmentDocument["createdAt"];
  sendMode: SendModeValues;
  nodeType: SpisumNodeTypes;
  nodeTypeName: string;
  dateFrom?: Date;
  dateTo?: Date | null;
  days?: number | string;
};

export interface ShipmentPersonalFormValues {
  recipient?: string;
  subject?: string;
  sendMode: SendModeValues;
  address1?: string;
  address2?: string;
  address3?: string;
  address4?: string;
  addressStreet?: string;
  addressCity?: string;
  addressZip?: string;
  addressState?: string;
}

export interface ShipmentDataboxFormValues {
  sender: string;
  allowSubstDelivery: boolean;
  legalTitleLaw: number;
  legalTitleYear: number;
  legalTitleSect: string;
  legalTitlePar: number;
  legalTitlePoint: string;
  personalDelivery: boolean;
  recipient: string;
  subject: string;
  toHands: string;
  components: string[];
}
export interface ShipmentPostFormValues {
  address1: string;
  address2: string;
  address3: string;
  address4: string;
  addressStreet: string;
  addressCity: string;
  addressZip: string;
  addressState: string;
  postType: string;
  postTypeOther: string;
  postItemType: string;
  postItemTypeOther: string;
  postItemWeight: number;
  postItemPrice: number;
  postItemNumber: string;
  postItemId: string;
  postItemCashOnDelivery?: number | string;
  postItemStatedPrice?: number | string;
}

export interface ShipmentPublishFormValues {
  dateFrom: Date;
  dateTo?: Date | null;
  days?: number | string;
  note?: string;
}

//documentId is a parent shipment ID if you dont have a parent dont send It
export interface ShipmentOpenDialogDetailActionType {
  documentId?: string;
  selected: ShipmentDocument;
  readonly?: boolean;
  componentReadonly?: boolean;
  onClose?: () => void;
}

export const shipmentFormValuesProxy = createProxy<ShipmentFormValues>();
export const shipmentPersonalFormValuesProxy = createProxy<
  ShipmentPersonalFormValues
>();
export const shipmentPostFormValuesProxy = createProxy<
  ShipmentPostFormValues
>();
export const shipmentDataBoxFormValuesProxy = createProxy<
  ShipmentDataboxFormValues
>();
export const shipmentEmailFormValuesProxy = createProxy<
  ShipmentPostFormValues
>();
export const shipmentPublishFormValuesProxy = createProxy<
  ShipmentPublishFormValues
>();

export interface ShipmentSaveRequestType extends DocumentBaseRequestType {
  nodeType: SpisumNodeTypes;
}
export interface ComponentUpperFormType
  extends MetaFormProps<ShipmentFormValues> {
  toDispatchDatePosition?: toDispatchDatePosition;
  onlyThreeColumns?: boolean;
}
type toDispatchDatePosition = "bottom" | "top";
