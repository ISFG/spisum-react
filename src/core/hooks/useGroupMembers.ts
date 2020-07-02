import { GroupMemberType } from "core/api/models";
import { Dispatch, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootStateType } from "../../reducers";
import {
  getGroupMembersAction,
  GroupMembersActionType
} from "../api/groups/members/_actions";
import { Group } from "../entities";

export const useGroupMembers = (
  groupId?: Group["id"],
  memberType?: GroupMemberType
) => {
  const dispatch = useDispatch<Dispatch<GroupMembersActionType>>();

  useEffect(() => {
    if (!groupId) {
      return;
    }

    dispatch(
      getGroupMembersAction.request({
        groupId,
        memberType
      })
    );
  }, [groupId]); // eslint-disable-line react-hooks/exhaustive-deps

  return useSelector((state: RootStateType) => ({
    entities: state.groupMembersReducer.entities,
    loading: state.groupMembersReducer.loading
  }));
};
