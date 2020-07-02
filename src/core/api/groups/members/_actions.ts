import { createSafeAsyncAction } from "share/utils/typesafeActions";
import { ActionType } from "typesafe-actions";
import { ErrorResponseType } from "../../models";
import { GetGroupMembersType, GroupMembersListType } from "./_types";

export const getGroupMembersAction = createSafeAsyncAction(
  "@groups/members/GET_MEMBERS",
  "@groups/members/GET_MEMBERS_SUCCESS",
  "@groups/members/GET_MEMBERS_FAILURE"
)<GetGroupMembersType, GroupMembersListType, ErrorResponseType>();

export type GroupMembersActionType = ActionType<typeof getGroupMembersAction>;
