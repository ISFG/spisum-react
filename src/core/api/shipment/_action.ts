import { ActionType } from "typesafe-actions";
import { createSafeAsyncAction } from "../../../share/utils/typesafeActions";
import { ErrorType } from "../../../types";
import { DataboxDonRegisterRequestType } from "../databox/_types";
import { EmailDonRegisterRequestType } from "../email/_types";
import { NodeHistoryRequestType } from "../node/_types";
import {
  DispatchPostShipmentRequestType,
  DispatchPublishShipmentRequestType,
  PersonallyShipmentRequestType,
  PostShipmentRequestType,
  PublishShipmentRequestType,
  ResendShipmentRequestType,
  ShipmentHistorySuccessResponseType
} from "./_types";

export const shipmentHistoryAction = createSafeAsyncAction(
  "@shipment/GET_HISTORY_ACTION_REQUEST",
  "@shipment/GET_HISTORY_ACTION_SUCESS",
  "@shipment/GET_HISTORY_ACTION_FAILURE"
)<NodeHistoryRequestType, ShipmentHistorySuccessResponseType, ErrorType>();

export const dispatchPublishShipment = createSafeAsyncAction(
  "@shipment/DISPATCH_PUBLISH_SHIPMENT_ACTION_REQUEST",
  "@shipment/DISPATCH_PUBLISH_SHIPMENT_ACTION_ACTION_SUCCESS",
  "@shipment/DISPATCH_PUBLISH_SHIPMENT_ACTION_ACTION_ERROR"
)<DispatchPublishShipmentRequestType, {}, ErrorType>();

export const shipmentResendAction = createSafeAsyncAction(
  "@shipment/RESEND_ACTION_REQUEST",
  "@shipment/RESEND_ACTION_SUCESS",
  "@shipment/RESEND_ACTION_FAILURE"
)<ResendShipmentRequestType, {}, ErrorType>();

export const dispatchPostShipment = createSafeAsyncAction(
  "@shipment/DISPATCH_POST_SHIPMENT_ACTION_REQUEST",
  "@shipment/DISPATCH_POST_SHIPMENT_ACTION_ACTION_SUCCESS",
  "@shipment/DISPATCH_POST_SHIPMENT_ACTION_ACTION_ERROR"
)<DispatchPostShipmentRequestType, {}, ErrorType>();

export const personallyShipmentDetailSaveActionType = createSafeAsyncAction(
  "@shipment/PERSONALLY_DETAIL_EDIT_ACTION_REQUEST",
  "@shipment/PERSONALLY_DETAIL_EDIT_ACTION_SUCESS",
  "@shipment/PERSONALLY_DETAIL_EDIT_ACTION_FAILURE"
)<PersonallyShipmentRequestType, void, ErrorType>();

export const postShipmentDetailSaveActionType = createSafeAsyncAction(
  "@shipment/POST_DETAIL_EDIT_ACTION_REQUEST",
  "@shipment/POST_DETAIL_EDIT_ACTION_SUCESS",
  "@shipment/POST_DETAIL_EDIT_ACTION_FAILURE"
)<PostShipmentRequestType, void, ErrorType>();

export const publishShipmentDetailSaveActionType = createSafeAsyncAction(
  "@shipment/PUBLISH_DETAIL_EDIT_ACTION_REQUEST",
  "@shipment/PUBLISH_DETAIL_EDIT_ACTION_SUCESS",
  "@shipment/PUBLISH_DETAIL_EDIT_ACTION_FAILURE"
)<PublishShipmentRequestType, void, ErrorType>();

export const emailShipmentDetailSaveActionType = createSafeAsyncAction(
  "@shipment/EMAIL_DETAIL_EDIT_ACTION_REQUEST",
  "@shipment/EMAIL_DETAIL_EDIT_ACTION_SUCESS",
  "@shipment/EMAIL_DETAIL_EDIT_ACTION_FAILURE"
)<EmailDonRegisterRequestType, void, ErrorType>();

export const databoxShipmentDetailSaveActionType = createSafeAsyncAction(
  "@shipment/DATABOX_DETAIL_EDIT_ACTION_REQUEST",
  "@shipment/DATABOX_DETAIL_EDIT_ACTION_SUCESS",
  "@shipment/DATABOX_DETAIL_EDIT_ACTION_FAILURE"
)<DataboxDonRegisterRequestType, void, ErrorType>();

export type ShipmentHistoryActionType = ActionType<
  typeof shipmentHistoryAction
>;
