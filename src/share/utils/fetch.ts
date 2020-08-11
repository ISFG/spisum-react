import { getService } from "core/features/dependencyInjection";
import { HttpClient } from "core/services/HttpClient";
import { call } from "redux-saga/effects";
import { ErrorType } from "types";

type WildCards = Record<string, string | number>;

export type ErrorResponseDataType = {
  code?: string | number;
  data?: object;
  fields?: [] | null;
  message?: string;
};

export type ResponseDataType = string | object | Blob | true;

export interface FetchReturnType {
  errorResponse?: ErrorType;
  errorResponseData?: object | null;
  fields?: [] | null;
  response?: ResponseDataType | ErrorResponseDataType;
  responseHeaders?: Headers;
  status: number;
  success: boolean;
}

export const getURL = (suffixURL: string) => {
  return `${process.env.REACT_APP_PROTOCOL || "http"}://${
    process.env.REACT_APP_API_URL
  }${suffixURL}`;
};

export const replaceWildCards = (suffixURL: string, wildCards?: WildCards) => {
  if (!wildCards) {
    return suffixURL;
  }

  return Object.keys(wildCards).reduce(
    (subject, key) => subject.replace(`:${key}`, `${wildCards[key]}`),
    suffixURL
  );
};

export const createAuthorization64 = (token: string) =>
  btoa(`ROLE_TICKET:${token}`);

export const createRequest = ({
  activeGroup,
  contentType = "application/json",
  bodyFormData,
  bodyJSON,
  method,
  privateToken
}: {
  activeGroup: string;
  contentType?: string;
  bodyFormData?: FormData;
  bodyJSON?: object;
  method: string;
  privateToken: string;
}): RequestInit => {
  method = method.toUpperCase();
  const methodIsPost = method === "POST";
  const headers: HeadersInit = {
    Accept: "application/json",
    ...(privateToken && {
      Authorization: `Basic ${createAuthorization64(privateToken)}`
    }),
    ...(methodIsPost && bodyJSON && { "Content-Type": `${contentType}` }),
    ...(activeGroup && {
      Group: activeGroup
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
};

export const createUrl = (
  suffixURL: string,
  params?: Record<string, string>,
  urlWildCards?: WildCards
) => {
  const appURL = `${getURL(replaceWildCards(suffixURL, urlWildCards))}`;

  return (params && `${appURL}${query(params)}`) || appURL;
};

export const parseResponse = async (response: Response) => {
  const contentType = response.headers.get("content-type");

  if (contentType?.indexOf("text") !== -1) {
    return response.text();
  }

  if (contentType?.indexOf("application/json") !== -1) {
    return response.json().catch(() => {});
  }

  return response.blob();
};

export const query = (params: Record<string, string>) => {
  const queryString = Object.keys(params)
    .filter((x) => params[x] !== undefined)
    .map((k) => `${encodeURIComponent(k)}=${encodeURIComponent(params[k])}`)
    .join("&");

  return (queryString && `?${queryString}`) || "";
};

export function* fetchSaga(
  suffixURL: string,
  method: string = "GET",
  options: {
    bodyJSON?: object;
    bodyFormData?: FormData;
    params?: Record<string, string>;
    urlWildCards?: WildCards;
    contentType?: string;
  } = {}
) {
  const httpClient = getService<HttpClient>(HttpClient);
  const fetch = httpClient.fetch.bind(httpClient);
  try {
    return yield call(fetch, suffixURL, method, options);
  } catch (ex) {
    return yield httpClient.error();
  }
}
