import { push } from "connected-react-router";
import { loginUpdateExpireInAction } from "core/features/login/_actions";
import { SessionStatus } from "core/features/login/_types";
import { logoutAction } from "core/features/logout/_actions";
import { CoreRoutes } from "core/routes";
import { httpClient } from "core/services";
import { RootStateType } from "reducers";
import { call, put, select } from "redux-saga/effects";
import { ErrorType } from "types";

type WildCards = Record<string, string | number>;

interface FetchSagaReponseType {
  errorResponse?: ErrorType;
  response?: object;
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
  let fetchData: FetchSagaReponseType;

  try {
    const response = yield call(() =>
      httpClient().fetch(suffixURL, method, options)
    );
    const responseData = yield call(parseResponse, response);

    if (response.ok) {
      yield put(loginUpdateExpireInAction());
      fetchData = yield {
        response: responseData || true,
        responseHeaders: response.headers,
        status: response.status,
        success: true
      };

      return fetchData;
    }

    if (response.status === 500) {
      // yield put(push(RouteType.ERROR_500));
      return yield {
        errorResponse: {
          code: "500",
          message: null
        } as ErrorType,
        status: 500,
        success: false
      };
    }

    const sessionStatus: SessionStatus = yield select(
      (state: RootStateType) => state.loginReducer.session.status
    );

    if (
      response.status === 401 &&
      sessionStatus !== SessionStatus.UNAUTHORIZED
    ) {
      yield put(logoutAction.success());
      yield put(push(CoreRoutes.LOGIN));
    }

    if (response.status === 401) {
      return yield {
        errorResponse: {
          code: "401",
          message: "unauthorized"
        } as ErrorType,
        errorResponseData: null,
        status: response.status,
        success: false
      };
    }

    return yield {
      errorResponse: {
        code: (responseData && responseData.code) || response.status.toString(),
        message: (responseData && responseData.message) || "badRequest"
      } as ErrorType,
      errorResponseData: (responseData && responseData.data) || null,
      fields: (responseData && responseData.fields) || null,
      responseHeaders: response.headers,
      status: response.status,
      success: false
    };
  } catch (ex) {
    // yield put(push(RouteType.ERROR_500));
    return yield {
      errorResponse: {
        code: "500",
        message: null
      } as ErrorType,
      status: 500,
      success: false
    };
  }
}
