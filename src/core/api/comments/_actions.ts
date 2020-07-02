import {
  GetCommentsRequestType,
  GetCommentsSuccessResponseType,
  PostCommentRequestType,
  PostCommentSuccessResponseType
} from "core/api/comments/_types";
import { createSafeAsyncAction } from "share/utils/typesafeActions";
import { ErrorType } from "types";
import { ActionType } from "typesafe-actions";

export const addCommentsAction = createSafeAsyncAction(
  "@comments/ADD_COMMENT_ACTION_REQUEST",
  "@comments/ADD_COMMENT_ACTION_SUCESS",
  "@comments/ADD_COMMENT_ACTION_FAILURE"
)<PostCommentRequestType, PostCommentSuccessResponseType, ErrorType>();

export const getCommentsAction = createSafeAsyncAction(
  "@comments/GET_COMMENTS_ACTION_REQUEST",
  "@comments/GET_COMMENTS_ACTION_SUCESS",
  "@comments/GET_COMMENTS_ACTION_FAILURE"
)<GetCommentsRequestType, GetCommentsSuccessResponseType, ErrorType>();

export type CommentsActionType = ActionType<
  typeof addCommentsAction | typeof getCommentsAction
>;
