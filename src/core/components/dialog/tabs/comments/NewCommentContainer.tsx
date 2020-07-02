import { Button, InputLabel } from "@material-ui/core";
import * as Model from "core/api/models";
import React, { useState } from "react";
import { WithTranslation, withTranslation } from "react-i18next";
import { translationPath } from "share/utils/getPath";
import { lang, t } from "translation/i18n";
import {
  StyledButtonContainer,
  StyledCommentsChildContainer,
  StyledTextArea
} from "./component.styles";
import { NewCommentPropsType } from "./_types";

const initialComment: Model.Comment = {
  content: ""
};

const NewCommentContainer = ({
  onAddClick
}: NewCommentPropsType & WithTranslation) => {
  const [newComment, setNewComment] = useState<Model.Comment>(initialComment);
  const handleAddClick = () => {
    if (!isCommentValid()) return;
    onAddClick(newComment);
    setNewComment(initialComment);
  };
  const handleAreaChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewComment({
      content: event.target.value
    });
  };

  const isCommentValid = () => {
    return (
      newComment?.content?.length >= 4 && newComment?.content.length <= 255
    );
  };

  return (
    <>
      <StyledCommentsChildContainer>
        <InputLabel>{t(translationPath(lang.comments.label))}</InputLabel>
        <StyledTextArea
          onChange={handleAreaChange}
          rowsMin={2}
          value={newComment.content}
          maxLength={255}
        />
        <StyledButtonContainer>
          <Button
            data-test-id="button-documentComment-add"
            disabled={!isCommentValid()}
            onClick={handleAddClick}
            variant="outlined"
          >
            {t(translationPath(lang.comments.add))}
          </Button>
        </StyledButtonContainer>
      </StyledCommentsChildContainer>
    </>
  );
};

export default withTranslation()(NewCommentContainer);
