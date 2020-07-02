import { addCommentsAction } from "core/api/comments/_actions";
import {
  GetCommentsRequestType,
  GetCommentsSuccessResponseType,
  PostCommentRequestType,
  PostCommentSuccessResponseType
} from "core/api/comments/_types";
import { createSafeAction, createSafeAsyncAction } from "share/utils/typesafeActions";
import { ErrorType } from "types";
import { ActionType } from "typesafe-actions";

export type GetCommentsRequestInTabType = GetCommentsRequestType & {
  append: boolean;
};

export type CommentsSuccessResponseInTabType = GetCommentsSuccessResponseType & {
  append: boolean;
};

export const fetchCommentsInTab = createSafeAsyncAction(
  "@dialog/FETCH_COMMENTS_ACTION_REQUEST",
  "@dialog/FETCH_COMMENTS_ACTION_SUCCESS",
  "@dialog/FETCH_COMMENTS_ACTION_FAILURE"
)<GetCommentsRequestInTabType, CommentsSuccessResponseInTabType, ErrorType>();

export const addCommentsInTab = createSafeAsyncAction(
  "@dialog/ADD_COMMENTS_ACTION_REQUEST",
  "@dialog/ADD_COMMENTS_ACTION_SUCCESS",
  "@dialog/ADD_COMMENTS_ACTION_FAILURE"
)<PostCommentRequestType, PostCommentSuccessResponseType, ErrorType>();

export const commentsTab__Clear = createSafeAction("@commentsTab/CLEAR")();

export type CommentsActionType = ActionType<
  | typeof fetchCommentsInTab
  | typeof addCommentsInTab
  | typeof addCommentsAction
  | typeof commentsTab__Clear
>;
