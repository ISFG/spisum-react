import { NodeChildAssociationEntry, SslProperties } from "core/api/models";
import { createSafeAsyncAction } from "share/utils/typesafeActions";
import { ErrorType, ErrorTypeWithFailedIds } from "types";
import { ActionType } from "typesafe-actions";
import { IdListType } from "../_types";
import {
  AddFileRequestType,
  BorrowFileRequestType,
  CancelFileRequestType,
  CloseFileRequestType,
  CreateFileRequestType,
  DiscardShreddingFileRequestType,
  FileCancelDiscardRequestType,
  FileChangeFileMarkRequestType,
  FileChangeLocationRequestType,
  FileChangeToARequestType,
  FileChangeToSRequestType,
  FoundFilesRequestType,
  RecoverFilesRequestType,
  UpdateFileRequestType
} from "./_types";

export const createFileAction = createSafeAsyncAction(
  "@file/CREATE_FILE_ACTION_REQUEST",
  "@file/CREATE_FILE_ACTION_SUCCESS",
  "@file/CREATE_FILE_ACTION_FAILURE"
)<CreateFileRequestType, void, ErrorType>();

export const addFileAction = createSafeAsyncAction(
  "@file/ADD_FILE_ACTION_REQUEST",
  "@file/ADD_FILE_ACTION_SUCCESS",
  "@file/ADD_FILE_ACTION_FAILURE"
)<AddFileRequestType, void, ErrorTypeWithFailedIds>();

export const cancelFileAction = createSafeAsyncAction(
  "@file/CANCEL_FILE_ACTION_REQUEST",
  "@file/CANCEL_FILE_ACTION_SUCCESS",
  "@file/CANCEL_FILE_ACTION_FAILURE"
)<CancelFileRequestType, void, ErrorType>();

export const fileCancelDiscardActionType = createSafeAsyncAction(
  "@file/CANCEL_DISCARD_ACTION_REQUEST",
  "@file/CANCEL_DISCARD_ACTION_SUCCESS",
  "@file/CANCEL_DISCARD_ACTION_FAILURE"
)<FileCancelDiscardRequestType, void, ErrorType>();

export const closeFileAction = createSafeAsyncAction(
  "@file/CLOSE_FILE_ACTION_REQUEST",
  "@file/CLOSE_FILE_ACTION_SUCCESS",
  "@file/CLOSE_FILE_ACTION_FAILURE"
)<CloseFileRequestType, void, ErrorType>();

export const updateFileAction = createSafeAsyncAction(
  "@file/UPDATE_FILE_ACTION_REQUEST",
  "@file/UPDATE_FILE_ACTION_SUCCESS",
  "@file/UPDATE_FILE_ACTION_FAILURE"
)<UpdateFileRequestType, void, ErrorType>();

export const lostDestroyedFileAction = createSafeAsyncAction(
  "@file/LOST_DESTROYED_FILE_ACTION_REQUEST",
  "@file/LOST_DESTROYED_FILE_ACTION_SUCCESS",
  "@file/LOST_DESTROYED_FILE_ACTION_FAILURE"
)<CancelFileRequestType, void, ErrorType>();

export const recoverFileAction = createSafeAsyncAction(
  "@file/RECOVER_FILE_ACTION_REQUEST",
  "@file/RECOVER_FILE_ACTION_SUCCESS",
  "@file/RECOVER_FILE_ACTION_FAILURE"
)<RecoverFilesRequestType, void, ErrorTypeWithFailedIds>();

export const foundFilesAction = createSafeAsyncAction(
  "@file/FOUND_FILE_ACTION_REQUEST",
  "@file/FOUND_FILE_ACTION_SUCCESS",
  "@file/FOUND_FILE_ACTION_FAILURE"
)<FoundFilesRequestType, void, ErrorTypeWithFailedIds>();

export const fileDocumentAddToFavoriteAction = createSafeAsyncAction(
  "@file/ADD_TO_FAVORITE_REQUEST",
  "@file/ADD_TO_FAVORITE_SUCCESS",
  "@file/ADD_TO_FAVORITE_FAILURE"
)<IdListType, void, ErrorTypeWithFailedIds>();

export const fileDocumentRemoveFromFavoriteAction = createSafeAsyncAction(
  "@file/REMOVE_FROM_FAVORITE_REQUEST",
  "@file/REMOVE_FROM_FAVORITE_SUCCESS",
  "@file/REMOVE_FROM_FAVORITE_FAILURE"
)<IdListType, void, ErrorTypeWithFailedIds>();

export const removeFromFileAction = createSafeAsyncAction(
  "@file/REMOVE_FROM_FILE_REQUEST",
  "@file/REMOVE_FROM_FILE_SUCCESS",
  "@file/REMOVE_FROM_FILE_FAILURE"
)<{ componentsIds: string[]; nodeId: string }, void, ErrorTypeWithFailedIds>();

export const fileChangeFileMarkAction = createSafeAsyncAction(
  "@file/CHANGE_FILE_MARK_ACTION_REQUEST",
  "@file/CHANGE_FILE_MARK_ACTION_SUCCESS",
  "@file/CHANGE_FILE_MARK_ACTION_FAILURE"
)<FileChangeFileMarkRequestType, void, ErrorType>();
export const fileBorrowAction = createSafeAsyncAction(
  "@file/BORROW_ACTION_REQUEST",
  "@file/BORROW_ACTION_SUCCESS",
  "@file/BORROW_ACTION_FAILURE"
)<BorrowFileRequestType, void, ErrorType>();

export const fileChangeToAAction = createSafeAsyncAction(
  "@file/CHANGE_TO_A_ACTION_REQUEST",
  "@file/CHANGE_TO_A_ACTION_SUCCESS",
  "@file/CHANGE_TO_A_ACTION_FAILURE"
)<FileChangeToARequestType, void, ErrorType>();

export const fileShreddingDiscardAction = createSafeAsyncAction(
  "@file/SHREDDING_DISCARD_ACTION_REQUEST",
  "@file/SHREDDING_DISCARD_ACTION_SUCCESS",
  "@file/SHREDDING_DISCARD_ACTION_FAILURE"
)<DiscardShreddingFileRequestType, void, ErrorType>();
export const fileChangeLocationAction = createSafeAsyncAction(
  "@file/CHANGE_LOCATION_ACTION_REQUEST",
  "@file/CHANGE_LOCATION_ACTION_SUCCESS",
  "@file/CHANGE_LOCATION_ACTION_FAILURE"
)<
  FileChangeLocationRequestType,
  NodeChildAssociationEntry<SslProperties>,
  ErrorType
>();

export const fileChangeToSAction = createSafeAsyncAction(
  "@file/CHANGE_TO_S_ACTION_REQUEST",
  "@file/CHANGE_TO_S_ACTION_SUCCESS",
  "@file/CHANGE_TO_S_ACTION_FAILURE"
)<FileChangeToSRequestType, void, ErrorType>();

export type FileActionType = ActionType<
  | typeof addFileAction
  | typeof cancelFileAction
  | typeof createFileAction
  | typeof lostDestroyedFileAction
  | typeof recoverFileAction
  | typeof foundFilesAction
  | typeof fileChangeFileMarkAction
  | typeof fileBorrowAction
  | typeof fileChangeToAAction
  | typeof fileShreddingDiscardAction
  | typeof fileChangeLocationAction
  | typeof fileChangeToSAction
>;
