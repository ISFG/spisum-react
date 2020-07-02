import { mapListResponseToEntityList } from "core/mappers/api/listResponse";
import { SpisumGroups } from "enums";
import { Inject, Injectable } from "injection-js";
import { Member } from "modules/administration/features/organizationUnits/_types";
import { convertResponse } from "share/utils/convert";
import { ApiURL } from "../apiURL";
import { HttpClient } from "../features/httpClient/services/HttpClient";

@Injectable()
export class Members {
  static get parameters() {
    return [new Inject(HttpClient)];
  }

  constructor(protected httpClient: HttpClient) {}

  public async fetchMembersByGroup(group: SpisumGroups): Promise<{}> {
    try {
      const response = await this.httpClient.fetch(
        ApiURL.ADMIN_MEMBERS,
        "GET",
        {
          urlWildCards: {
            group
          }
        }
      );
      const json = await response.json();

      return mapListResponseToEntityList<Member, Member>(
        convertResponse(json),
        (apiMember: Member) => ({
          displayName: apiMember.displayName,
          id: apiMember.id
        })
      );
    } catch (e) {
      return [];
    }
  }
}
