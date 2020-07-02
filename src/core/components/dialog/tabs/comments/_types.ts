import { GetCommentsRequestType } from "core/api/comments/_types";
import { Comment, Pagination, SuccessResponseType } from "core/api/models";
import { ErrorType } from "types";

export interface CommentsPropsType {
  comments?: { entry: Comment }[];
  onAddClick: (comment: Comment) => void;
  onLoadMore: () => void;
  pagination?: Pagination;
  isReadonly: boolean | undefined;
}

export interface NewCommentPropsType {
  onAddClick: (comment: Comment) => void;
}

export type CommentsTabStateType = Readonly<SuccessResponseType<Comment>> &
  Readonly<{
    isLoading: boolean;
    error: ErrorType | null;
  }>;

export type GetCommentsRequestTypeCustom = GetCommentsRequestType & {
  isInitialGet: boolean;
};
