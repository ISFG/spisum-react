import { createSafeAsyncAction } from "share/utils/typesafeActions";
import { ErrorType } from "types";
import { ActionType } from "typesafe-actions";
import {
  FetchByCustomUrlRequestType,
  SearchRequestType,
  SearchSuccessResponseType
} from "./_types";
import { NodeChildrenSuccessResponseType } from "../node/_types";

export const searchAction = createSafeAsyncAction(
  "@search/GET_ACTION_REQUEST",
  "@search/GET_ACTION_SUCESS",
  "@search/GET_ACTION_FAILURE"
)<SearchRequestType, SearchSuccessResponseType, ErrorType>();

export const fetchByCustomUrlAction = createSafeAsyncAction(
  "@document/FETCH_BY_CUSTOM_URL_ACTION_REQUEST",
  "@document/FETCH_BY_CUSTOM_URL_ACTION_SUCESS",
  "@document/FETCH_BY_CUSTOM_URL_ACTION_FAILURE"
)<FetchByCustomUrlRequestType, NodeChildrenSuccessResponseType, ErrorType>();

export type SearchActionType = ActionType<typeof searchAction>;
