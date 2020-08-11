import { getComponentsResponseMapper } from "core/api/components/mappers";
import { GetComponentsSuccessType } from "core/api/components/_types";
import { ApiURL } from "core/apiURL";
import { EntityList, File } from "core/entities";
import { getService } from "core/features/dependencyInjection";
import { HttpClient } from "core/services/HttpClient";
import { Associations } from "enums";
import { convertResponse } from "share/utils/convert";

export const fetchDocumentComponents = async (
  nodeId?: string
): Promise<EntityList<File>> => {
  const httpClient = getService<HttpClient>(HttpClient);

  if (!nodeId) {
    return { entities: [] };
  }

  try {
    const response = await httpClient.fetch(ApiURL.NODE_CHILDREN, "GET", {
      params: {
        include: ["properties", "path"].join(","),
        where: `(assocType='${Associations.Components}')`
      },
      urlWildCards: {
        nodeId
      }
    });

    if (response.success) {
      return getComponentsResponseMapper(
        convertResponse(response.response as GetComponentsSuccessType)
      );
    }
    return { entities: [] };
  } catch (e) {
    return { entities: [] };
  }
};
