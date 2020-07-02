import { Comment } from "core/api/models";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootStateType } from "reducers";
import { Dispatch } from "redux";
import { DialogContentPropsType, DialogDataProps } from "../../_types";
import CommentsTab from "./CommentsTab";
import {
  addCommentsInTab,
  CommentsActionType,
  commentsTab__Clear,
  fetchCommentsInTab
} from "./_actions";

type CommentsTabContainerState = {
  pageNumber: number;
  rowsPerPage: number;
};

const initialState: CommentsTabContainerState = {
  pageNumber: 0,
  rowsPerPage: 25
};

type CommentsTabContainerProps = DialogContentPropsType & {
  nodeId: string;
};

const CommentsTabContainer = ({
  channel,
  nodeId,
  dialogData
}: CommentsTabContainerProps) => {
  const dispatch = useDispatch<Dispatch<CommentsActionType>>();
  const [{ pageNumber, rowsPerPage }, setState] = useState<
    CommentsTabContainerState
  >(initialState);
  const isReadonly = !!(dialogData as DialogDataProps)?.isReadonly
    ? (dialogData as DialogDataProps).isReadonly
    : false;
  const { entries, pagination, isLoading } = useSelector(
    (state: RootStateType) => ({
      entries: state.commentsReducer.list.entries,
      error: state.commentsReducer.error,
      isLoading: state.commentsReducer.isLoading,
      pagination: state.commentsReducer.list.pagination
    })
  );

  const nodeType = (dialogData as DialogDataProps)?.nodeType;

  useEffect(() => {
    dispatch(
      fetchCommentsInTab.request({
        append: pageNumber !== 0,
        maxItems: rowsPerPage,
        nodeId,
        nodeType,
        skipCount: pageNumber * rowsPerPage
      })
    );
  }, [pageNumber, rowsPerPage]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(
    () => () => {
      dispatch(commentsTab__Clear());
    },
    [] // eslint-disable-line react-hooks/exhaustive-deps
  );

  const handleAddNote = (comment: Comment) => {
    dispatch(
      addCommentsInTab.request({
        body: comment,
        nodeId,
        nodeType
      })
    );
  };

  const handleGetMoreNotes = () => {
    if (isLoading) return;
    if (pagination && pagination.hasMoreItems) {
      setState((state) => ({
        pageNumber: state.pageNumber + 1,
        rowsPerPage: state.rowsPerPage
      }));
    }
  };

  return (
    <CommentsTab
      isReadonly={isReadonly}
      comments={entries}
      pagination={pagination}
      onAddClick={handleAddNote}
      onLoadMore={handleGetMoreNotes}
    />
  );
};

export default CommentsTabContainer;
