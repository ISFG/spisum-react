import { PostCommentSuccessResponseType } from "core/api/comments/_types";
import { getType } from "typesafe-actions";
import {
  addCommentsInTab,
  CommentsActionType,
  CommentsSuccessResponseInTabType,
  commentsTab__Clear,
  fetchCommentsInTab
} from "./_actions";
import { CommentsTabStateType } from "./_types";

const initialState: CommentsTabStateType = {
  error: null,
  isLoading: false,
  list: {
    entries: undefined,
    pagination: {
      count: 0,
      hasMoreItems: false,
      maxItems: 50,
      skipCount: 0,
      totalItems: 0
    }
  }
};

export default (
  state: CommentsTabStateType = initialState,
  action: CommentsActionType
): CommentsTabStateType => {
  switch (action.type) {
    case getType(fetchCommentsInTab.request):
      return {
        ...state,
        error: null,
        isLoading: true
      };
    case getType(fetchCommentsInTab.success):
      return {
        ...mergeStateAndEntries(state, action.payload),
        error: null,
        isLoading: false
      };
    case getType(fetchCommentsInTab.failure):
      return {
        ...state,
        error: action.payload,
        isLoading: false
      };

    case getType(addCommentsInTab.request):
      return {
        ...state,
        isLoading: true
      };
    case getType(addCommentsInTab.success):
      return {
        ...mergeStateAndNewEntry(state, action.payload),
        error: null,
        isLoading: false
      };
    case getType(addCommentsInTab.failure):
      return {
        ...state,
        error: action.payload,
        isLoading: false
      };
    case getType(commentsTab__Clear):
      return initialState;
    default:
      return state;
  }
};

const mergeStateAndEntries = (
  state: CommentsTabStateType,
  payload: CommentsSuccessResponseInTabType
) => {
  const { append, ...rest } = payload;
  if (!append) {
    return rest;
  }

  const entries = [...(state.list.entries || []), ...(rest.list.entries || [])];

  return {
    list: {
      entries,
      pagination: rest.list.pagination
    }
  };
};

const mergeStateAndNewEntry = (
  state: CommentsTabStateType,
  newEntry: PostCommentSuccessResponseType
) => {
  const entries = [newEntry].concat(state.list.entries || []);
  return {
    list: {
      entries,
      pagination: Object.assign({}, state.list.pagination, {
        count: (state.list.pagination?.count || 0) + 1,
        totalItems: (state.list.pagination?.totalItems || 0) + 1
      })
    }
  };
};
