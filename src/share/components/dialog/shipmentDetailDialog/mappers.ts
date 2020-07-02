import { SslProperties } from "core/api/models";
import {
  databoxShipmentDetailSaveActionType,
  emailShipmentDetailSaveActionType,
  personallyShipmentDetailSaveActionType,
  postShipmentDetailSaveActionType,
  publishShipmentDetailSaveActionType
} from "core/api/shipment/_action";
import { PostType, SpisumNodeTypes } from "enums";
import {
  ShipmentDataboxFormValues,
  ShipmentPostFormValues,
  ShipmentPublishFormValues
} from "./_types";

export const emailBodyMapper = (
  email: SslProperties,
  components: string[]
) => ({
  components: components || [],
  recipient: email.recipient,
  sender: email.sender,
  subject: email.subject
});

export const dataBoxBodyMapper = (
  databox: ShipmentDataboxFormValues,
  components: string[]
) => ({
  allowSubstDelivery: databox.allowSubstDelivery,
  components: components || [],
  legalTitleLaw: databox.legalTitleLaw,
  legalTitlePar: databox.legalTitlePar,
  legalTitlePoint: databox.legalTitlePoint,
  legalTitleSect: databox.legalTitleSect,
  legalTitleYear: databox.legalTitleYear,
  personalDelivery: databox.personalDelivery,
  recipient: databox.recipient,
  sender: databox.sender,
  subject: databox.subject,
  toHands: databox.toHands
});

export const postBodyMapper = (
  post: ShipmentPostFormValues,
  components: null
) => {
  const postItemStatedPrice = post.postType?.includes(PostType.price)
    ? { postItemStatedPrice: post.postItemStatedPrice }
    : {};

  const postItemCashOnDelivery = post.postType?.includes(
    PostType.cashOnDelivery
  )
    ? { postItemCashOnDelivery: post.postItemCashOnDelivery }
    : {};

  return {
    address1: post.address1,
    address2: post.address2,
    address3: post.address3,
    address4: post.address4,
    addressCity: post.addressCity,
    addressState: post.addressState,
    addressStreet: post.addressStreet,
    addressZip: post.addressZip,
    postItemId: post.postItemId,
    postItemNumber: post.postItemNumber,
    postItemPrice: post.postItemPrice,
    postItemType: post.postItemType,
    postItemTypeOther: post.postItemTypeOther,
    postItemWeight: post.postItemWeight,
    postType: post.postType,
    postTypeOther: post.postTypeOther,
    ...postItemStatedPrice,
    ...postItemCashOnDelivery
  };
};

export const personallyBodyMapper = (
  personaly: ShipmentPostFormValues,
  components: null
) => ({
  address1: personaly.address1,
  address2: personaly.address2,
  address3: personaly.address3,
  address4: personaly.address4,
  addressCity: personaly.addressCity,
  addressState: personaly.addressState,
  addressStreet: personaly.addressStreet,
  addressZip: personaly.addressZip
});

export const publishBodyMapper = (
  publish: ShipmentPublishFormValues,
  components: string[]
) => ({
  components: components || [],
  dateFrom: publish.dateFrom,
  days: publish.days,
  note: publish.note
});

export const shipmentDetailSaveActionList = {
  [SpisumNodeTypes.ShipmentEmail]: emailShipmentDetailSaveActionType,
  [SpisumNodeTypes.ShipmentDatabox]: databoxShipmentDetailSaveActionType,
  [SpisumNodeTypes.ShipmentPost]: postShipmentDetailSaveActionType,
  [SpisumNodeTypes.ShipmentPersonally]: personallyShipmentDetailSaveActionType,
  [SpisumNodeTypes.ShipmentPublish]: publishShipmentDetailSaveActionType
};

export const shipmentDetailBodyList = {
  [SpisumNodeTypes.ShipmentEmail]: emailBodyMapper,
  [SpisumNodeTypes.ShipmentDatabox]: dataBoxBodyMapper,
  [SpisumNodeTypes.ShipmentPost]: postBodyMapper,
  [SpisumNodeTypes.ShipmentPersonally]: personallyBodyMapper,
  [SpisumNodeTypes.ShipmentPublish]: publishBodyMapper
};

export const ShipmentDetailPostInitialValues = {
  address1: "",
  address2: "",
  address3: "",
  address4: "",
  addressCity: "",
  addressState: "",
  addressStreet: "",
  addressZip: "",
  createdAt: null,
  postItemCashOnDelivery: 0,
  postItemId: "",
  postItemNumber: "",
  postItemPrice: "",
  postItemStatedPrice: 0,
  postItemType: "",
  postItemTypeOther: "",
  postItemWeight: "",
  postType: [],
  postTypeOther: "",
  subject: ""
};
export const ShipmentDetailPersonallyInitialValues = {
  address1: "",
  address2: "",
  address3: "",
  address4: "",
  addressCity: "",
  addressState: "",
  addressStreet: "",
  addressZip: "",
  createdAt: null,
  postItemId: "",
  subject: ""
};

export const ShipmentDetailDataBoxInitialValues = {
  legalTitleLaw: "",
  legalTitlePar: "",
  legalTitlePoint: "",
  legalTitleSect: "",
  legalTitleYear: "",
  recipient: "",
  subject: "",
  toHands: ""
};
export const ShipmentDetailEmailInitialValues = {};
export const ShipmentDetailPublishInitialValues = {};
