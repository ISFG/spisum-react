import { Comment } from "core/api/models";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootStateType } from "reducers";
import { Dispatch } from "redux";
import { DialogDataGenericData, DialogTabContentPropsType } from "../../_types";
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
  rowsPerPage: 50
};

type CommentsTabContainerProps = DialogTabContentPropsType & {
  nodeId: string;
};

const CommentsTabContainer = ({
  channel,
  dialogProps,
  isActive,
  nodeId
}: CommentsTabContainerProps) => {
  const dispatch = useDispatch<Dispatch<CommentsActionType>>();
  const [{ pageNumber, rowsPerPage }, setState] = useState<
    CommentsTabContainerState
  >(initialState);
  const isReadonly = !!dialogProps.isReadonly;
  const { entries, pagination, isLoading } = useSelector(
    (state: RootStateType) => ({
      entries: state.commentsReducer.list.entries,
      error: state.commentsReducer.error,
      isLoading: state.commentsReducer.isLoading,
      pagination: state.commentsReducer.list.pagination
    })
  );

  const nodeType = (dialogProps.data as DialogDataGenericData)?.nodeType;

  const loadData = useCallback(() => {
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

  channel.refreshData = loadData;

  useEffect(() => {
    if (isActive && entries === undefined) {
      loadData();
    }
  }, [isActive]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (isActive) {
      loadData();
    }
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
    if (isLoading) {
      return;
    }

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
      comments={entries || []}
      pagination={pagination}
      onAddClick={handleAddNote}
      onLoadMore={handleGetMoreNotes}
      isLoading={isLoading}
    />
  );
};

export default CommentsTabContainer;
