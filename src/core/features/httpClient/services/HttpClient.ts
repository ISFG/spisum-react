import { Inject, Injectable } from "injection-js";
import { UrlService } from "./UrlService";

export type HttpClientConfig = {
  authToken?: string;
  activeGroup?: string;
};

export type WildCards = Record<string, string | number>;

@Injectable()
export class HttpClient {
  static get parameters() {
    return [new Inject(UrlService)];
  }

  config: HttpClientConfig = {};

  constructor(protected urlService: UrlService) {}

  async fetch(
    suffixURL: string,
    method: string = "GET",
    {
      bodyJSON,
      bodyFormData,
      params,
      urlWildCards,
      contentType
    }: {
      bodyJSON?: object;
      bodyFormData?: FormData;
      params?: Record<string, string>;
      urlWildCards?: WildCards;
      contentType?: string;
    } = {}
  ): Promise<Response> {
    return fetch(
      this.urlService.createUrl(suffixURL, params, urlWildCards),
      this.createRequest({ contentType, bodyFormData, bodyJSON, method })
    );
  }

  setAuthToken(token: HttpClientConfig["authToken"]): HttpClient {
    this.config.authToken = token ? this.createAuthorization64(token) : token;

    return this;
  }

  setActiveGroup(activeGroup: HttpClientConfig["activeGroup"]) {
    this.config.activeGroup = activeGroup;

    return this;
  }

  private createAuthorization64(token: string) {
    return btoa(`ROLE_TICKET:${token}`);
  }

  private createRequest({
    contentType = "application/json",
    bodyFormData,
    bodyJSON,
    method
  }: {
    contentType?: string;
    bodyFormData?: FormData;
    bodyJSON?: object;
    method: string;
  }): RequestInit {
    method = method.toUpperCase();
    const methodIsPost = method === "POST";

    const headers: HeadersInit = {
      Accept: "application/json",
      ...(methodIsPost && bodyJSON && { "Content-Type": `${contentType}` }),
      ...(this.config.authToken && {
        Authorization: `Basic ${this.config.authToken}`
      }),
      ...(this.config.activeGroup && {
        Group: this.config.activeGroup
      })
    } as HeadersInit;

    let body = null;

    if (methodIsPost && bodyJSON) {
      body = JSON.stringify(bodyJSON);
    } else if (methodIsPost && bodyFormData) {
      body = bodyFormData;
    }

    return {
      body,
      headers,
      method
    };
  }
}
