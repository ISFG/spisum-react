import { SuccessListResponseType } from "../../api/models";
import { EntityList } from "../../entities";

export const mapListResponseToEntityList = <GroupMember, Entity>(
  listResponse: SuccessListResponseType<GroupMember>,
  mapItem: (item: GroupMember) => Entity
): EntityList<Entity> => ({
  entities: listResponse.list.entries
    ? listResponse.list.entries.map((x) => mapItem(x.entry))
    : [],
  pagination: listResponse.list.pagination
});
