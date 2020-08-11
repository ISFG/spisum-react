import BookshelfLoader from "core/components/bookshelfLoader";
import React from "react";
import InfiniteScroll from "react-infinite-scroller";
import { Comment as CommentComponent } from "./Comment";
import {
  StyledCommentChildContainer,
  StyledCommentsContainer
} from "./component.styles";
import NewCommentContainer from "./NewCommentContainer";
import { CommentsPropsType } from "./_types";

const CommentsTab = ({
  comments,
  isLoading,
  isReadonly,
  onAddClick,
  onLoadMore,
  pagination
}: CommentsPropsType) => {
  return (
    <StyledCommentsContainer className={"body-fullsize"}>
      {isLoading ? (
        <BookshelfLoader />
      ) : (
        <>
          {!isReadonly ? <NewCommentContainer onAddClick={onAddClick} /> : null}
          <StyledCommentChildContainer className="comments__child-container">
            {comments?.length ? (
              <InfiniteScroll
                hasMore={pagination && pagination.hasMoreItems}
                initialLoad={false}
                loadMore={onLoadMore}
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
        </>
      )}
    </StyledCommentsContainer>
  );
};

export default CommentsTab;
