import { EntityList } from "../../../entities";
import {
  GroupMember,
  GroupMemberType,
  SuccessListResponseType
} from "../../models";

export type GetGroupMembersType = {
  groupId: string;
  memberType?: GroupMemberType;
};

export type GetGroupMembersSuccessType = SuccessListResponseType<GroupMember>;

export type GroupMembersListType = EntityList<GroupMember>;
