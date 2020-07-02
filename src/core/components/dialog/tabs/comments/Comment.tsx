import { Avatar } from "@material-ui/core";
import * as Model from "core/api/models";
import React from "react";
import { formatDate } from "share/utils/convert";
import { getColorByChar } from "share/utils/utils";
import {
  StyledAvatarContainer,
  StyledCommentContainer,
  StyledCommentSpan
} from "./component.styles";

type OwnProps = {
  comment: {
    entry: Model.Comment;
  };
};

export const Comment = ({ comment }: OwnProps) => {
  const date = formatDate(comment.entry.createdAt);
  const firstChar = (
    comment.entry?.createdBy?.displayName ||
    comment.entry?.createdBy?.firstName ||
    "C"
  )
    .trim()
    .substring(0, 1);
  return (
    <StyledCommentContainer>
      <StyledAvatarContainer>
        <Avatar style={{ backgroundColor: getColorByChar(firstChar) }}>
          {firstChar}
        </Avatar>
      </StyledAvatarContainer>
      <div>
        <div>
          <StyledCommentSpan>{date}</StyledCommentSpan>
        </div>
        <div>
          <b>
            {comment.entry?.createdBy?.displayName ||
              comment.entry?.createdBy?.firstName}
          </b>
        </div>
        <p>{comment.entry?.content}</p>
      </div>
    </StyledCommentContainer>
  );
};
