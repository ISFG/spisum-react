import { EntityList } from "core/entities";
import { GenericDocument, ShipmentDocument } from "core/types";
import { mapValues, pick } from "lodash";
import {
  CreateShipmentFormValuesProxy,
  CreateShipmentsRequestType
} from "share/components/dialog/createShipmentDialog/_types";
import { lastPathMember } from "share/utils/getPath";
import { PostType, SendModeValues } from "../../../enums";
import {
  NodeChildAssociation,
  SslProperties,
  SslShipment,
  SuccessListResponseType
} from "../../api/models";
import { FormValues } from "../../components/MetaForm/_types";
import { mergeDateTime, removeTimeFromDate } from "../../helpers/api/document";
import { mapListResponseToEntityList } from "./listResponse";

export const transformDocumentForApi = <T extends SslProperties>(
  formValues: T
) => {
  const date = formValues?.deliveryDate;
  const time = formValues?.deliveryTime;

  if (!date) {
    return formValues;
  }

  if (!time) {
    return {
      ...formValues,
      ...{ deliveryDate: removeTimeFromDate(date) }
    };
  }
  const mergedDateTime = mergeDateTime(date, time);
  const replacedFormValues = {
    ...formValues,
    ...{
      deliveryDate: mergedDateTime
    }
  };

  return replacedFormValues;
};

export const transformDocumentPayload = (properties: SslProperties) => {
  if (!properties.deliveryDate) {
    return properties;
  }

  return {
    ...properties,
    deliveryTime: properties.deliveryDate
  };
};

export const transformDocumentShipmentsPayload = (
  apiResponse: SuccessListResponseType<NodeChildAssociation<SslShipment>>
): EntityList<ShipmentDocument> => {
  return mapListResponseToEntityList<
    NodeChildAssociation<SslShipment>,
    ShipmentDocument
  >(apiResponse, (entry) => entry);
};

const baseKeys = [
  lastPathMember(CreateShipmentFormValuesProxy.recipient).path,
  lastPathMember(CreateShipmentFormValuesProxy.subject).path,
  lastPathMember(CreateShipmentFormValuesProxy.components).path
];

const addressKeys = [
  lastPathMember(CreateShipmentFormValuesProxy.address1).path,
  lastPathMember(CreateShipmentFormValuesProxy.address2).path,
  lastPathMember(CreateShipmentFormValuesProxy.address3).path,
  lastPathMember(CreateShipmentFormValuesProxy.address4).path,
  lastPathMember(CreateShipmentFormValuesProxy.addressStreet).path,
  lastPathMember(CreateShipmentFormValuesProxy.addressCity).path,
  lastPathMember(CreateShipmentFormValuesProxy.addressZip).path,
  lastPathMember(CreateShipmentFormValuesProxy.addressState).path
];

const emailKeys = [
  lastPathMember(CreateShipmentFormValuesProxy.recipient).path,
  lastPathMember(CreateShipmentFormValuesProxy.subject).path,
  lastPathMember(CreateShipmentFormValuesProxy.components).path,
  lastPathMember(CreateShipmentFormValuesProxy.sender).path
];

const databoxKeys = [
  lastPathMember(CreateShipmentFormValuesProxy.allowSubstDelivery).path,
  lastPathMember(CreateShipmentFormValuesProxy.legalTitleLaw).path,
  lastPathMember(CreateShipmentFormValuesProxy.legalTitleYear).path,
  lastPathMember(CreateShipmentFormValuesProxy.legalTitleSect).path,
  lastPathMember(CreateShipmentFormValuesProxy.legalTitlePar).path,
  lastPathMember(CreateShipmentFormValuesProxy.legalTitlePoint).path,
  lastPathMember(CreateShipmentFormValuesProxy.personalDelivery).path,
  lastPathMember(CreateShipmentFormValuesProxy.sender).path,
  lastPathMember(CreateShipmentFormValuesProxy.toHands).path
];

const publishKeys = [
  lastPathMember(CreateShipmentFormValuesProxy.dateFrom).path,
  lastPathMember(CreateShipmentFormValuesProxy.days).path,
  lastPathMember(CreateShipmentFormValuesProxy.note).path,
  lastPathMember(CreateShipmentFormValuesProxy.components).path
];

const postKeys = [
  lastPathMember(CreateShipmentFormValuesProxy.postType).path,
  lastPathMember(CreateShipmentFormValuesProxy.postTypeOther).path,
  lastPathMember(CreateShipmentFormValuesProxy.postItemType).path,
  lastPathMember(CreateShipmentFormValuesProxy.postItemTypeOther).path
];

export const transformDocumentShipmentsRequestPayload = (
  sendMode: string,
  payload: CreateShipmentsRequestType
): CreateShipmentsRequestType | {} => {
  const isPostItemStatedPrice = payload.postType?.includes(PostType.price);
  const postItemStateLabel = lastPathMember(
    CreateShipmentFormValuesProxy.postItemStatedPrice
  ).path;

  const isCashOnDelivery = payload.postType?.includes(PostType.cashOnDelivery);
  const cashOnDeliveryLabel = lastPathMember(
    CreateShipmentFormValuesProxy.postItemCashOnDelivery
  ).path;

  const dynamicPostKeys = [
    ...(isPostItemStatedPrice ? [postItemStateLabel] : []),
    ...(isCashOnDelivery ? [cashOnDeliveryLabel] : [])
  ];

  const keysBySendMode = {
    [SendModeValues.Email]: emailKeys,
    [SendModeValues.Databox]: [...baseKeys, ...databoxKeys],
    [SendModeValues.Publish]: publishKeys,
    [SendModeValues.Personally]: addressKeys,
    [SendModeValues.Post]: [...addressKeys, ...postKeys, ...dynamicPostKeys]
  };

  const postValuesToNumber = [
    lastPathMember(CreateShipmentFormValuesProxy.postItemCashOnDelivery).path,
    lastPathMember(CreateShipmentFormValuesProxy.postItemStatedPrice).path
  ];

  const valuesToNumber = [
    lastPathMember(CreateShipmentFormValuesProxy.legalTitleLaw).path,
    lastPathMember(CreateShipmentFormValuesProxy.legalTitleYear).path,
    lastPathMember(CreateShipmentFormValuesProxy.legalTitlePar).path,
    ...(sendMode === SendModeValues.Post ? postValuesToNumber : [])
  ];

  const valuesBySendMode = pick(payload, keysBySendMode[sendMode]);

  return mapValues(valuesBySendMode, (val, key) =>
    valuesToNumber.includes(key) ? parseFloat(val) : val
  );
};

export const transformNodePayload = (
  apiResponse: SuccessListResponseType<NodeChildAssociation<SslProperties>>
): EntityList<GenericDocument> => {
  return mapListResponseToEntityList<
    NodeChildAssociation<SslProperties>,
    GenericDocument
  >(apiResponse, (entry) => entry);
};

// this mapper is used only for checking MetaFormReducer values equality,
// to show unsaved changes dialog. Those values are set programmatically,
// so we need to remove them only for equality check purposes.
export const mapRedundantMetaFormValues = (
  fields: SslProperties & FormValues
) => {
  const { retentionMode, retentionMark, ...rest } = fields;
  return rest;
};
