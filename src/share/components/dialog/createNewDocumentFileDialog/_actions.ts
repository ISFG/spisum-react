import { NodeChildAssociation, SslFile } from "core/api/models";
import { SearchRequestType } from "core/api/search/_types";
import {
  createSafeAction,
  createSafeAsyncAction
} from "share/utils/typesafeActions";
import { ErrorType } from "types";
import { ActionType } from "typesafe-actions";

export const searchFilesAction = createSafeAsyncAction(
  "@dialog/SEARCH_FILES_ACTION_REQUEST",
  "@dialog/SEARCH_FILES_ACTION_SUCESS",
  "@dialog/SEARCH_FILES_ACTION_FAILURE"
)<SearchRequestType, NodeChildAssociation<SslFile>[] | undefined, ErrorType>();

export const clearResultsAction = createSafeAction(
  "@dialog/CLEAR_SEARCH_FILES_RESULTS"
)<void>();

export type SearchFilesActionType = ActionType<
  typeof searchFilesAction | typeof clearResultsAction
>;
