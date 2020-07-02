import { getGroupMembersAction, GroupMembersActionType } from "./_actions";
import { getType } from "typesafe-actions";
import { GroupMembersListType } from "./_types";

const initialState: GroupMembersListType = {
  entities: [],
  loading: false
};

export const groupMembersReducer = (
  state: GroupMembersListType = initialState,
  action: GroupMembersActionType
): GroupMembersListType => {
  switch (action.type) {
    case getType(getGroupMembersAction.request): {
      return { ...initialState, ...{ loading: true } };
    }
    case getType(getGroupMembersAction.success): {
      return { ...action.payload, ...{ loading: false } };
    }
    default:
      return state;
  }
};
