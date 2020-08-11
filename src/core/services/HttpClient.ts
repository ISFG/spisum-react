import { loginUpdateExpireInAction } from "core/features/login/_actions";
import { SessionStatus } from "core/features/login/_types";
import { logoutAction } from "core/features/logout/_actions";
import { CoreRoutes } from "core/routes";
import { Injectable } from "injection-js";
import {
  createUrl,
  ErrorResponseDataType,
  FetchReturnType
} from "share/utils/fetch";
import { getStore } from "store";
import { ErrorType } from "types";

export type HttpClientConfig = {
  authToken?: string;
  activeGroup?: string;
};

export type WildCards = Record<string, string | number>;

@Injectable()
export class HttpClient {
  config: HttpClientConfig = {};
  appStore = getStore();

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
  ): Promise<FetchReturnType> {
    const response = await fetch(
      createUrl(suffixURL, params, urlWildCards),
      this.createRequest({ contentType, bodyFormData, bodyJSON, method })
    );

    const responseData = await this.parseResponse(response);

    if (response.ok) {
      this.appStore.store.dispatch(loginUpdateExpireInAction());
      return {
        response: responseData || responseData.toString() || true,
        responseHeaders: response.headers,
        status: response.status,
        success: true
      };
    }

    if (response.status === 500) {
      return this.error();
    }

    const state = this.appStore.store.getState();

    const sessionStatus: SessionStatus = state.loginReducer.session.status;

    if (
      response.status === 401 &&
      sessionStatus !== SessionStatus.UNAUTHORIZED
    ) {
      this.appStore.store.dispatch(logoutAction.success());
      this.appStore.history.push(CoreRoutes.LOGIN);
    }

    if (response.status === 401) {
      return this.error({ status: 401, message: "unauthorized" });
    }

    const errorResponseData = responseData as ErrorResponseDataType;

    return {
      errorResponse: {
        code:
          (errorResponseData && errorResponseData.code) ||
          response.status.toString(),
        message:
          (errorResponseData && errorResponseData.message) || "badRequest"
      } as ErrorType,
      errorResponseData: (errorResponseData && errorResponseData.data) || null,
      fields: (errorResponseData && errorResponseData.fields) || null,
      responseHeaders: response.headers,
      status: response.status,
      success: false
    };
  }

  error(
    obj: {
      status: number;
      message?: string | null;
      errorResponseData?: object | null;
    } = {
      errorResponseData: null,
      message: null,
      status: 500
    }
  ) {
    const { status, message, errorResponseData } = obj;

    return {
      errorResponse: {
        code: String(status),
        message
      } as ErrorType,
      errorResponseData,
      status,
      success: false
    };
  }

  setAuthToken(token: HttpClientConfig["authToken"]): HttpClient {
    this.config.authToken = token ? this.createAuthorization64(token) : token;

    return this;
  }

  private createAuthorization64(token: string) {
    return btoa(`ROLE_TICKET:${token}`);
  }

  public createRequest({
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
      Group: this.appStore.store.getState().loginReducer?.session?.activeGroup
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

  private async parseResponse(response: Response) {
    const contentType = response.headers.get("content-type");

    if (contentType?.indexOf("text") !== -1) {
      return response.text();
    }

    if (contentType?.indexOf("application/json") !== -1) {
      return response.json().catch(() => {});
    }

    return response.blob();
  }
}
