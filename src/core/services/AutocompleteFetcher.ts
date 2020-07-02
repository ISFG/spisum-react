import { Inject, Injectable } from "injection-js";
import { convertResponse } from "../../share/utils/convert";
import {
  HttpClient,
  WildCards
} from "../features/httpClient/services/HttpClient";
import { mapListResponseToEntityList } from "../mappers/api/listResponse";

export interface FetchSuggestionsRequestType {
  url: string;
  term?: string;
  where?: string;
  urlWildCards?: WildCards;
}

@Injectable()
export class AutocompleteFetcher {
  private MAX_ITEMS: number = 15;

  static get parameters() {
    return [new Inject(HttpClient)];
  }

  constructor(protected httpClient: HttpClient) {}

  public async fetchSuggestions<T>({
    url,
    term = "",
    where = "",
    urlWildCards = {}
  }: FetchSuggestionsRequestType): Promise<T[]> {
    try {
      const response = await this.httpClient.fetch(url, "GET", {
        params: {
          maxItems: String(this.MAX_ITEMS),
          ...(term && { term }),
          ...(where && { where })
        } as Record<string, string>,
        urlWildCards
      });
      const json = await response.json();
      const mapped = mapListResponseToEntityList<T, T>(
        convertResponse(json),
        (item) => item
      );
      return mapped.entities;
    } catch (e) {
      return [];
    }
  }
}
