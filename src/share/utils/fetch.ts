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
  let domain = process.env.REACT_APP_API_URL;
  let protocol = process.env.REACT_APP_PROTOCOL;
  if (!domain) {
    domain = window.location.host;
  }
  if (!protocol) {
    protocol = window.location.protocol.trimEnd(":");
  }
  return `${protocol}://${domain}${suffixURL}`;
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
