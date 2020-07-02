import { Comment, SuccessResponseType } from "../models";

export type CommentsFailureReponseType = {
  error: {
    errorKey?: string;
    statusCode: number;
    briefSummary: string;
    stackTrace: string;
    descriptionURL: string;
    logId?: string;
  };
};

export type GetCommentsRequestType = {
  nodeId: string;
  nodeType?: string;
  maxItems?: number;
  skipCount?: number;
};

export type PostCommentRequestType = {
  nodeId: string;
  nodeType?: string;
  fields?: string[];
  body: Comment;
};

export type PostCommentSuccessResponseType = { entry: Comment };

export type GetCommentsSuccessResponseType = SuccessResponseType<Comment>;
