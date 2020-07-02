import { Group } from "../../entities";
import { mapListResponseToEntityList } from "../../mappers/api/listResponse";
import { GroupMember } from "../models";
import { GetGroupsSuccessType } from "./_types";

export const getGroupsResponseMapper = (apiResponse: GetGroupsSuccessType) =>
  mapListResponseToEntityList<GroupMember, Group>(apiResponse, (apiGroup) => ({
    displayName: apiGroup.displayName,
    id: apiGroup.id
  }));
