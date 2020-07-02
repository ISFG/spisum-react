import { mapListResponseToEntityList } from "../../../mappers/api/listResponse";
import { GroupMember } from "../../models";
import { GetGroupMembersSuccessType } from "./_types";

export const getGroupMembersResponseMapper = (
  apiResponse: GetGroupMembersSuccessType
) =>
  mapListResponseToEntityList<GroupMember, GroupMember>(
    apiResponse,
    (apiGroupMember) => ({
      displayName: apiGroupMember.displayName,
      id: apiGroupMember.id,
      memberType: apiGroupMember.memberType
    })
  );
