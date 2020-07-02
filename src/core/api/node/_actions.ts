import { CancelShipmentRequestType } from "share/components/dialog/cancelShipmentDialog/_types";
import { CreateShipmentsRequestType } from "share/components/dialog/createShipmentDialog/_types";
import {
  ShipmentsRequestType,
  ShipmentsSuccessType
} from "share/components/dialog/sendShipmentDialog/_types";
import { createSafeAsyncAction } from "share/utils/typesafeActions";
import { ErrorType } from "types";
import { ActionType } from "typesafe-actions";
import {
  TableOfContentsRequestType,
  TableOfContentsSuccessResponseType
} from "../../components/dialog/tabs/tableOfContents/_types";
import { File } from "../../entities";
import {
  NodeChildrenRequestType,
  NodeChildrenSuccessResponseType,
  NodeContentRequestType,
  NodeHistoryRequestType,
  NodeHistorySuccessResponseType,
  NodeVersionRequestType,
  NodeVersionSuccessResponseType
} from "./_types";

export const nodeHistoryAction = createSafeAsyncAction(
  "@node/GET_HISTORY_ACTION_REQUEST",
  "@node/GET_HISTORY_ACTION_SUCESS",
  "@node/GET_HISTORY_ACTION_FAILURE"
)<NodeHistoryRequestType, NodeHistorySuccessResponseType, ErrorType>();

export type NodeHistoryActionType = ActionType<typeof nodeHistoryAction>;

export const tableOfContentsAction = createSafeAsyncAction(
  "@node/TABLE_OF_CONTENTS_ACTION_REQUEST",
  "@node/TABLE_OF_CONTENTS_ACTION_SUCESS",
  "@node/TABLE_OF_CONTENTS_ACTION_FAILURE"
)<TableOfContentsRequestType, TableOfContentsSuccessResponseType, ErrorType>();

export type TableOfContentsActionType = ActionType<
  typeof tableOfContentsAction
>;

export const nodeVersionAction = createSafeAsyncAction(
  "@node/GET_VERSION_ACTION_REQUEST",
  "@node/GET_VERSION_ACTION_SUCESS",
  "@node/GET_VERSION_ACTION_FAILURE"
)<NodeVersionRequestType, NodeVersionSuccessResponseType, ErrorType>();

export type NodeVersionActionType = ActionType<typeof nodeVersionAction>;

export const nodeChildrenAction = createSafeAsyncAction(
  "@node/GET_CHILDREN_ACTION_REQUEST",
  "@node/GET_CHILDREN_ACTION_SUCESS",
  "@node/GET_CHILDREN_ACTION_FAILURE"
)<NodeChildrenRequestType, NodeChildrenSuccessResponseType, ErrorType>();

export type NodeChildrenActionType = ActionType<typeof nodeChildrenAction>;

export const nodeContentAction = createSafeAsyncAction(
  "@node/GET_CONTENT_ACTION_REQUEST",
  "@node/GET_CONTENT_ACTION_SUCCESS",
  "@node/GET_CONTENT_ACTION_FAILURE"
)<NodeContentRequestType, File, NodeContentRequestType>();

export type NodeContentActionType = ActionType<typeof nodeContentAction>;

export const shipmentsAction = createSafeAsyncAction(
  "@components/SHIPMENTS_TO_SEND_VIEW_ACTION_REQUEST",
  "@components/SHIPMENTS_TO_SEND_VIEW_ACTION_SUCCESS",
  "@components/SHIPMENTS_TO_SEND_VIEW_ACTION_ERROR"
)<ShipmentsRequestType, ShipmentsSuccessType, ErrorType>();

export type ShipmentsCreatedActionType = ActionType<typeof shipmentsAction>;

export const createShipmentsAction = createSafeAsyncAction(
  "@components/CREATE_SHIPMENTS_ACTION_REQUEST",
  "@components/CREATE_SHIPMENTS_ACTION_SUCCESS",
  "@components/CREATE_SHIPMENTS_ACTION_ERROR"
)<CreateShipmentsRequestType, NodeChildrenSuccessResponseType, ErrorType>();

export const nodeCancelShipmentAction = createSafeAsyncAction(
  "@node/CANCEL_SHIPMENT_REQUEST",
  "@node/CANCEL_SHIPMENT_SUCCESS",
  "@node/CANCEL_SHIPMENT_ERROR"
)<
  CancelShipmentRequestType,
  NodeChildrenSuccessResponseType,
  NodeContentRequestType
>();
