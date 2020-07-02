import { componentUpdateAction } from "core/api/components/_actions";
import { dialogAction__Clear } from "core/components/dialog/_actions";
import { createSafeAsyncAction } from "share/utils/typesafeActions";
import { ErrorType, ErrorTypeWithFailedIds } from "types";
import { ActionType } from "typesafe-actions";
import { EntityList, File } from "../../../entities";
import {
  ComponentCreateRequestType, DeleteComponentsRequestType,

  DownloadComponentsRequestType,
  NodeSecondaryChildrenRequestType
} from "./_types";

export const componentCreateAction = createSafeAsyncAction(
  "@concepts/COMPONENT_CREATE_ACTION_REQUEST",
  "@concepts/COMPONENT_CREATE_ACTION_SUCCESS",
  "@concepts/COMPONENT_CREATE_ACTION_FAILURE"
)<ComponentCreateRequestType, { file: globalThis.File }, ErrorType>();

export const componentDeleteAction = createSafeAsyncAction(
  "@concepts/COMPONENT_DELETE_ACTION_REQUEST",
  "@concepts/COMPONENT_DELETE_ACTION_SUCCESS",
  "@concepts/COMPONENT_DELETE_ACTION_FAILURE"
)<DeleteComponentsRequestType, void, ErrorTypeWithFailedIds>();

export const componentViewAction = createSafeAsyncAction(
  "@concepts/COMPONENT_VIEW_ACTION_REQUEST",
  "@concepts/COMPONENT_VIEW_ACTION_SUCCESS",
  "@concepts/COMPONENT_VIEW_ACTION_FAILURE"
)<NodeSecondaryChildrenRequestType, EntityList<File>, ErrorType>();

export const componentDownloadAction = createSafeAsyncAction(
  "@concepts/COMPONENT_DOWNLOAD_ACTION_REQUEST",
  "@concepts/COMPONENT_DOWNLOAD_ACTION_SUCCESS",
  "@concepts/COMPONENT_DOWNLOAD_ACTION_FAILURE"
)<DownloadComponentsRequestType, void, ErrorType>();

export type ComponentViewActionType = ActionType<
  | typeof componentViewAction
  | typeof dialogAction__Clear
  | typeof componentCreateAction
  | typeof componentDeleteAction
  | typeof componentDownloadAction
  | typeof componentUpdateAction
  | typeof componentUpdateAction
>;
