import { getComponentsResponseMapper } from "core/api/components/mappers";
import { Associations } from "enums";
import { Inject, Injectable } from "injection-js";
import { convertResponse } from "share/utils/convert";
import { ApiURL } from "../apiURL";
import { HttpClient } from "../features/httpClient/services/HttpClient";

@Injectable()
export class DocumentComponents {
  static get parameters() {
    return [new Inject(HttpClient)];
  }

  constructor(protected httpClient: HttpClient) {}

  public async fetchComponentsByNodeId(nodeId?: string): Promise<{}> {
    if (!nodeId) {
      return [];
    }

    try {
      const response = await this.httpClient.fetch(
        ApiURL.NODE_CHILDREN,
        "GET",
        {
          params: {
            include: ["properties", "path"].join(","),
            where: `(assocType='${Associations.Components}')`
          },
          urlWildCards: {
            nodeId
          }
        }
      );
      const json = await response.json();

      return getComponentsResponseMapper(convertResponse(json));
    } catch (e) {
      return [];
    }
  }
}
