import { SuccessListResponseType } from "core/api/models";
import { ApiURL } from "core/apiURL";
import { EntityList } from "core/entities";
import { getService } from "core/features/dependencyInjection";
import { mapListResponseToEntityList } from "core/mappers/api/listResponse";
import { HttpClient } from "core/services/HttpClient";
import { SpisumGroups } from "enums";
import { Member } from "modules/administration/features/organizationUnits/_types";
import { convertResponse } from "share/utils/convert";

export const fetchMembers = async (
  group: SpisumGroups
): Promise<EntityList<Member>> => {
  const httpClient = getService<HttpClient>(HttpClient);
  try {
    const response = await httpClient.fetch(ApiURL.ADMIN_MEMBERS, "GET", {
      urlWildCards: {
        group
      }
    });

    if (response.success) {
      return mapListResponseToEntityList<Member, Member>(
        convertResponse(response.response as SuccessListResponseType<Member>),
        (apiMember: Member) => ({
          displayName: apiMember.displayName,
          id: apiMember.id
        })
      );
    }

    return { entities: [] };
  } catch (e) {
    return { entities: [] };
  }
};
