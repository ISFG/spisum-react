import React from "react";
import { withTranslation } from "react-i18next";
import InfiniteScroll from "react-infinite-scroller";
import { WithTranslation } from "translation/i18n";
import { Comment as CommentComponent } from "./Comment";
import {
  StyledCommentChildContainer,
  StyledCommentsContainer
} from "./component.styles";
import NewCommentContainer from "./NewCommentContainer";
import { CommentsPropsType } from "./_types";

const CommentsTab = ({
  comments,
  onAddClick,
  onLoadMore,
  pagination,
  isReadonly
}: CommentsPropsType & WithTranslation) => {
  const handleMore = () => {
    onLoadMore();
  };

  return (
    <StyledCommentsContainer className={"body-fullsize"}>
      {!isReadonly ? <NewCommentContainer onAddClick={onAddClick} /> : null}
      <StyledCommentChildContainer className="comments__child-container">
        {comments?.length ? (
          <InfiniteScroll
            hasMore={pagination && pagination.hasMoreItems}
            initialLoad={false}
            loadMore={handleMore}
            pageStart={0}
            threshold={300}
            useWindow={false}
          >
            {comments?.map((comment, i) => (
              <CommentComponent key={i} comment={comment} />
            ))}
          </InfiniteScroll>
        ) : null}
      </StyledCommentChildContainer>
    </StyledCommentsContainer>
  );
};

export default withTranslation()(CommentsTab);
