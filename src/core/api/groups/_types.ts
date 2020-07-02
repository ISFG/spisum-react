import { PagingEntryResponseType } from "../../../types";
import { EntityList, Group } from "../../entities";
import { GroupMember, SuccessListResponseType } from "../models";

export type GetGroupsSuccessType =
  | SuccessListResponseType<GroupMember>
  | PagingEntryResponseType<GroupMember>;
export type GroupsListType = EntityList<Group>;

export type UpdateOrganizationUnitAction = {
  name: string;
  groupId: string;
};
export type DeleteOrganizationUnitAction = {
  groupId: string;
};
