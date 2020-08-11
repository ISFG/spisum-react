import { DialogDataProps } from "core/components/dialog/_types";
import { GenericDocument } from "core/types";
import { createAnalogDocument } from "share/components/dialog/analogDetailsDialog/_actions";
import { createTechnicalDataCarriesDocument } from "share/components/dialog/technicalDataCarriesDetailsDialog/_actions";
import {
  createSafeAction,
  createSafeAsyncAction
} from "share/utils/typesafeActions";
import { ErrorType, ErrorTypeWithFailedIds } from "types";
import { ActionType } from "typesafe-actions";
import {
  NodeChildAssociationEntry,
  SslAnalog,
  SslDatabox,
  SslEmail,
  SslProperties
} from "../models";
import { IdListType } from "../_types";
import {
  DocumentAcceptRequestType,
  DocumentBorrowRequestType,
  DocumentCancelDiscardRequestType,
  DocumentCancelRequestType,
  DocumentChangeFileMarkRequestType,
  DocumentChangeLocationRequestType,
  DocumentChangeToARequestType,
  DocumentChangeToSRequestType,
  DocumentCreateRequestType,
  DocumentCreateSuccessResponseType,
  DocumentForSignatureActionType,
  DocumentFoundRequestType,
  DocumentFromSignatureActionType,
  DocumentHandoverRequestType,
  DocumentRecoverRequestType,
  DocumentRevertVersionRequestType,
  DocumentSaveAndUpdateRequestType,
  DocumentSettleRequestType,
  DocumentShreddingDiscardRequestType,
  DocumentUpdateSaveRequestType
} from "./_types";

export const documentCreateActionType = createSafeAsyncAction(
  "@document/CREATE_ACTION_REQUEST",
  "@document/CREATE_ACTION_SUCESS",
  "@document/CREATE_ACTION_FAILURE"
)<DocumentCreateRequestType, DocumentCreateSuccessResponseType, ErrorType>();

export type DocumentActionTypes = ActionType<
  | typeof documentCreateActionType
  | typeof documentRegisterActionType
  | typeof documentUpdateActionType
  | typeof createAnalogDocument
  | typeof createTechnicalDataCarriesDocument
  | typeof documentAcceptActionType
>;

export const documentUpdateActionType = createSafeAsyncAction(
  "@document/UPDATE_ACTION_REQUEST",
  "@document/UPDATE_ACTION_SUCCESS",
  "@document/UPDATE_ACTION_FAILURE"
)<
  DocumentUpdateSaveRequestType,
  NodeChildAssociationEntry<SslProperties>,
  ErrorType
>();

export const documentRegisterActionType = createSafeAsyncAction(
  "@document/REGISTER_ACTION_REQUEST",
  "@document/REGISTER_ACTION_SUCCESS",
  "@document/REGISTER_ACTION_FAILURE"
)<
  DocumentUpdateSaveRequestType,
  NodeChildAssociationEntry<SslProperties>,
  ErrorType
>();

export const documentHandoverActionType = createSafeAsyncAction(
  "@document/OWNER_HANDOVER_ACTION_REQUEST",
  "@document/OWNER_HANDOVER_ACTION_SUCCESS",
  "@document/OWNER_HANDOVER_ACTION_FAILURE"
)<DocumentHandoverRequestType, void, ErrorType>();

export const documentOwnerCancelActionType = createSafeAsyncAction(
  "@document/OWNER_CANCEL_ACTION_REQUEST",
  "@document/OWNER_CANCEL_ACTION_SUCCESS",
  "@document/OWNER_CANCEL_ACTION_FAILURE"
)<DocumentCancelRequestType, void, ErrorType>();

export const documentAcceptActionType = createSafeAsyncAction(
  "@document/ACCEPT_ACTION_REQUEST",
  "@document/ACCEPT_ACTION_SUCCESS",
  "@document/ACCEPT_ACTION_FAILURE"
)<DocumentAcceptRequestType, void, ErrorType>();

export const documentCancelActionType = createSafeAsyncAction(
  "@document/CANCEL_ACTION_REQUEST",
  "@document/CANCEL_ACTION_SUCCESS",
  "@document/CANCEL_ACTION_FAILURE"
)<DocumentCancelRequestType, void, ErrorType>();
export const documentCancelDiscardActionType = createSafeAsyncAction(
  "@document/CANCEL_DISCARD_ACTION_REQUEST",
  "@document/CANCEL_DISCARD_ACTION_SUCCESS",
  "@document/CANCEL_DISCARD_ACTION_FAILURE"
)<DocumentCancelDiscardRequestType, void, ErrorType>();

export const documentLostDestroyedActionType = createSafeAsyncAction(
  "@document/LOST_DESTROYED_ACTION_REQUEST",
  "@document/LOST_DESTROYED_ACTION_SUCCESS",
  "@document/LOST_DESTROYED_ACTION_FAILURE"
)<DocumentCancelRequestType, void, ErrorType>();

export const documentRecoverActionType = createSafeAsyncAction(
  "@document/RECOVER_ACTION_REQUEST",
  "@document/RECOVER_ACTION_SUCCESS",
  "@document/RECOVER_ACTION_FAILURE"
)<DocumentRecoverRequestType, void, ErrorTypeWithFailedIds>();

export const documentFoundActionType = createSafeAsyncAction(
  "@document/FOUND_ACTION_REQUEST",
  "@document/FOUND_ACTION_SUCCESS",
  "@document/FOUND_ACTION_FAILURE"
)<DocumentFoundRequestType, void, ErrorTypeWithFailedIds>();

export const documentSettleActionType = createSafeAsyncAction(
  "@document/SETTLE_ACTION_REQUEST",
  "@document/SETTLE_ACTION_SUCCESS",
  "@document/SETTLE_ACTION_FAILURE"
)<DocumentSettleRequestType, GenericDocument, ErrorType>();

export const documentSaveAndUpdateActionType = createSafeAsyncAction(
  "@document/SAVE_AND_UPDATE_ACTION_REQUEST",
  "@document/SAVE_AND_UPDATE_ACTION_SUCCESS",
  "@document/SAVE_AND_UPDATE_ACTION_FAILURE"
)<
  DocumentSaveAndUpdateRequestType,
  NodeChildAssociationEntry<SslProperties | SslAnalog | SslDatabox | SslEmail>,
  ErrorType
>();

export const documentRevertVersionActionType = createSafeAsyncAction(
  "@document/REVERT_VERSION_ACTION_REQUEST",
  "@document/REVERT_VERSION_ACTION_SUCCESS",
  "@document/REVERT_VERSION_ACTION_FAILURE"
)<DocumentRevertVersionRequestType, void, ErrorType>();

export const documentAddToFavoriteAction = createSafeAsyncAction(
  "@document/ADD_TO_FAVORITE_REQUEST",
  "@document/ADD_TO_FAVORITE_SUCCESS",
  "@document/ADD_TO_FAVORITE_FAILURE"
)<IdListType, void, ErrorTypeWithFailedIds>();

export const documentRemoveFromFavoriteAction = createSafeAsyncAction(
  "@document/REMOVE_FROM_FAVORITE_REQUEST",
  "@document/REMOVE_FROM_FAVORITE_SUCCESS",
  "@document/REMOVE_FROM_FAVORITE_FAILURE"
)<IdListType, void, ErrorTypeWithFailedIds>();

export const openDocumentWithSaveButtonsAction = createSafeAction(
  "@document/OPEN_DOCUMENT_WITH_SAVE_BUTTONS"
)<DialogDataProps>();

export const documentForSignatureActionType = createSafeAsyncAction(
  "@document/FOR_SIGNATURE_ACTION_REQUEST",
  "@document/FOR_SIGNATURE_ACTION_SUCCESS",
  "@document/FOR_SIGNATURE_ACTION_FAILURE"
)<DocumentForSignatureActionType, void, ErrorType>();

export const documentFromSignatureActionType = createSafeAsyncAction(
  "@document/FROM_SIGNATURE_ACTION_REQUEST",
  "@document/FROM_SIGNATURE_ACTION_SUCCESS",
  "@document/FROM_SIGNATURE_ACTION_FAILURE"
)<DocumentFromSignatureActionType, void, ErrorType>();

export const openDocumentReadonlyDetailsAction = createSafeAction(
  "@document/OPEN_DOCUMENT_READONLY"
)<DialogDataProps>();

export const openDocumentDetailsAction = createSafeAction(
  "@document/OPEN_DOCUMENT_WITH_REGISTER_BUTTONS"
)<DialogDataProps>();

export const documentChangeFileMarkAction = createSafeAsyncAction(
  "@document/CHANGE_FILE_MARK_ACTION_REQUEST",
  "@document/CHANGE_FILE_MARK_ACTION_SUCCESS",
  "@document/CHANGE_FILE_MARK_ACTION_FAILURE"
)<DocumentChangeFileMarkRequestType, void, ErrorType>();

export const documentBorrowActionType = createSafeAsyncAction(
  "@document/BORROW_ACTION_REQUEST",
  "@document/BORROW_ACTION_SUCCESS",
  "@document/BORROW_ACTION_FAILURE"
)<DocumentBorrowRequestType, void, ErrorType>();

export const documentChangeToAAction = createSafeAsyncAction(
  "@document/CHANGE_TO_A_ACTION_REQUEST",
  "@document/CHANGE_TO_A_ACTION_SUCCESS",
  "@document/CHANGE_TO_A_ACTION_FAILURE"
)<DocumentChangeToARequestType, void, ErrorType>();

export const documentShreddingDiscardActionType = createSafeAsyncAction(
  "@document/SHREDDING_DISCARD_ACTION_REQUEST",
  "@document/SHREDDING_DISCARD_ACTION_SUCCESS",
  "@document/SHREDDING_DISCARD_ACTION_FAILURE"
)<DocumentShreddingDiscardRequestType, void, ErrorType>();

export const documentChangeLocationActionType = createSafeAsyncAction(
  "@document/CHANGE_LOCATION_ACTION_REQUEST",
  "@document/CHANGE_LOCATION_ACTION_SUCCESS",
  "@document/CHANGE_LOCATION_ACTION_FAILURE"
)<
  DocumentChangeLocationRequestType,
  NodeChildAssociationEntry<SslProperties>,
  ErrorType
>();

export const documentChangeToSAction = createSafeAsyncAction(
  "@document/CHANGE_TO_S_ACTION_REQUEST",
  "@document/CHANGE_TO_S_ACTION_SUCCESS",
  "@document/CHANGE_TO_S_ACTION_FAILURE"
)<DocumentChangeToSRequestType, void, ErrorType>();
