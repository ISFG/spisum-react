import { LocationChangeAction } from "connected-react-router";
import {
  NodeChildAssociationEntry,
  SslProperties,
  SuccessResponseType
} from "core/api/models";
import { Document, Folder } from "core/types";
import {
  createSafeAction,
  createSafeAsyncAction
} from "share/utils/typesafeActions";
import { ErrorType } from "types";
import { ActionType } from "typesafe-actions";
import { DocumentViewRequestType, DocumentViewType } from "./_types";

export const documentViewAction = createSafeAsyncAction(
  "@documentView/DOCUMENT_LIST_ACTION_REQUEST",
  "@documentView/DOCUMENT_LIST_ACTION_SUCESS",
  "@documentView/DOCUMENT_LIST_ACTION_FAILURE"
)<DocumentViewRequestType, SuccessResponseType<Document, Folder>, ErrorType>();

export const documentViewAction__Clear = createSafeAction(
  "@documentView/DOCUMENT_LIST_CLEAR_ACTION"
)();

export const documentViewAction__Refresh = createSafeAction(
  "@documentView/DOCUMENT_LIST_REFRESH_ACTION"
)<boolean>();

export const documentViewAction__RemoveItem = createSafeAction(
  "@documentView/DOCUMENT_LIST_REMOVE_ITEM_ACTION"
)<DocumentViewType>();

export const documentViewAction__UpdateItem = createSafeAction(
  "@documentView/DOCUMENT_LIST_UPDATE_ITEM_ACTION"
)<NodeChildAssociationEntry<SslProperties>>();

export const documentViewAction__UpdateIsFavorite = createSafeAction(
  "@documentView/DOCUMENT_LIST_UPDATE_IS_FAVORITE_ACTION"
)<{ ids: string[]; isFavorite: boolean }>();

export const documentViewAction__SetSelected = createSafeAction(
  "@documentView/DOCUMENT_LIST_SET_SELECTED_ACTION"
)<DocumentViewType[]>();

export type DocumentViewActionType =
  | ActionType<
      | typeof documentViewAction
      | typeof documentViewAction__Clear
      | typeof documentViewAction__Refresh
      | typeof documentViewAction__RemoveItem
      | typeof documentViewAction__SetSelected
      | typeof documentViewAction__UpdateItem
      | typeof documentViewAction__UpdateIsFavorite
    >
  | LocationChangeAction;
