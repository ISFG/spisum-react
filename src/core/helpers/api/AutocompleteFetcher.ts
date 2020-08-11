import { SuccessListResponseType } from "core/api/models";
import { getService } from "core/features/dependencyInjection";
import { mapListResponseToEntityList } from "core/mappers/api/listResponse";
import { HttpClient, WildCards } from "core/services/HttpClient";
import { convertResponse } from "share/utils/convert";

export interface FetchSuggestionsRequestType {
  url: string;
  term?: string;
  where?: string;
  urlWildCards?: WildCards;
}

const MAX_ITEMS = 15;

export const fetchSuggestions = async <T>({
  url,
  term = "",
  where = "",
  urlWildCards = {}
}: FetchSuggestionsRequestType): Promise<T[]> => {
  const httpClient = getService<HttpClient>(HttpClient);

  try {
    const response = await httpClient.fetch(url, "GET", {
      params: {
        maxItems: String(MAX_ITEMS),
        ...(term && { term }),
        ...(where && { where })
      } as Record<string, string>,
      urlWildCards
    });

    if (response.success) {
      const mapped = mapListResponseToEntityList<T, T>(
        convertResponse(response.response as SuccessListResponseType<T>),
        (item) => item
      );
      return mapped.entities;
    }

    return [];
  } catch (e) {
    return [];
  }
};
