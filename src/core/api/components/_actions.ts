import { dialogAction__Clear } from "core/components/dialog/_actions";
import {
  createSafeAction,
  createSafeAsyncAction
} from "share/utils/typesafeActions";
import { ErrorType, ErrorTypeWithFailedIds } from "types";
import { ActionType } from "typesafe-actions";
import { EntityList, File } from "../../entities";
import {
  DeleteComponentsRequestType,
  DocumentComponentCreateRequestType,
  DownloadComponentsRequestType,
  NodeSecondaryChildrenRequestType,
  ShipmentComponentsSuccess,
  ShipmentSecondaryChildrenRequestType
} from "./_types";

export const componentCreateAction = createSafeAsyncAction(
  "@components/COMPONENT_CREATE_ACTION_REQUEST",
  "@components/COMPONENT_CREATE_ACTION_SUCCESS",
  "@components/COMPONENT_CREATE_ACTION_FAILURE"
)<DocumentComponentCreateRequestType, { file: globalThis.File }, ErrorType>();

export const componentDeleteAction = createSafeAsyncAction(
  "@components/COMPONENT_DELETE_ACTION_REQUEST",
  "@components/COMPONENT_DELETE_ACTION_SUCCESS",
  "@components/COMPONENT_DELETE_ACTION_FAILURE"
)<DeleteComponentsRequestType, void, ErrorTypeWithFailedIds>();

export const componentViewAction = createSafeAsyncAction(
  "@components/COMPONENT_VIEW_ACTION_REQUEST",
  "@components/COMPONENT_VIEW_ACTION_SUCCESS",
  "@components/COMPONENT_VIEW_ACTION_FAILURE"
)<NodeSecondaryChildrenRequestType, EntityList<File>, ErrorType>();

export const componentViewShipmentAction = createSafeAsyncAction(
  "@components/COMPONENT_VIEW_SHIPMENT_ACTION_REQUEST",
  "@components/COMPONENT_VIEW_SHIPMENT_ACTION_SUCCESS",
  "@components/COMPONENT_VIEW_SHIPMENT_ACTION_FAILURE"
)<
  ShipmentSecondaryChildrenRequestType,
  ShipmentComponentsSuccess<File>,
  ErrorType
>();
export const componentViewShipmentUpdateAction = createSafeAction(
  "@components/COMPONENT_VIEW_SHIPMENT_UPDATE_ACTION"
)<File[]>();

export const componentUpdateAction = createSafeAsyncAction(
  "@components/COMPONENT_UPDATE_ACTION_REQUEST",
  "@components/COMPONENT_UPDATE_ACTION_SUCCESS",
  "@components/COMPONENT_UPDATE_ACTION_FAILURE"
)<File, void, ErrorType>();

export const componentDownloadAction = createSafeAsyncAction(
  "@components/COMPONENT_DOWNLOAD_ACTION_REQUEST",
  "@components/COMPONENT_DOWNLOAD_ACTION_SUCCESS",
  "@components/COMPONENT_DOWNLOAD_ACTION_FAILURE"
)<DownloadComponentsRequestType, void, ErrorType>();

export type ComponentViewActionType = ActionType<
  | typeof componentViewAction
  | typeof dialogAction__Clear
  | typeof componentCreateAction
  | typeof componentDeleteAction
  | typeof componentDownloadAction
  | typeof componentUpdateAction
>;

export type ComponentViewShipmentActionType = ActionType<
  typeof componentViewShipmentAction | typeof componentViewShipmentUpdateAction
>;
