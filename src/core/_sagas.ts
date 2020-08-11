import { SpisumNodeTypes } from "enums";
import { call, put, takeEvery } from "redux-saga/effects";
import { convertResponse } from "share/utils/convert";
import { fetchSaga } from "share/utils/fetch";
import { handleResponse } from "share/utils/typesafeActions";
import { traverseNodeType } from "share/utils/utils";
import { lang, t } from "translation/i18n";
import { ActionType, getType } from "typesafe-actions";
import { translationPath } from "../share/utils/getPath";
import { callAsyncAction, fetchDocument, rehydrateAction } from "./action";
import { ApiURL } from "./apiURL";
import { notificationAction } from "./components/notifications/_actions";
import { NotificationSeverity } from "./components/notifications/_types";
import { getService } from "./features/dependencyInjection";
import {
  loginAction,
  loginSetSessionTokenAction
} from "./features/login/_actions";
import { logoutAction } from "./features/logout/_actions";
import { HttpClient } from "./services/HttpClient";

const getUrlByNodeType = (nodeType: SpisumNodeTypes) => {
  const resolvedNodeType = traverseNodeType(nodeType);

  switch (resolvedNodeType) {
    case SpisumNodeTypes.Document: {
      return ApiURL.DOCUMENT;
    }
    case SpisumNodeTypes.File: {
      return ApiURL.FILE;
    }
    case SpisumNodeTypes.Concept: {
      return ApiURL.CONCEPT;
    }
    default: {
      return ApiURL.DOCUMENT;
    }
  }
};

export function* watchCoreActions() {
  yield takeEvery(
    getType(loginSetSessionTokenAction),
    ({ payload }: ActionType<typeof loginSetSessionTokenAction>) => {
      const httpClient = getService<HttpClient>(HttpClient);

      httpClient.setAuthToken(payload.token);
    }
  );

  yield takeEvery(getType(loginAction.request), () => {
    const httpClient = getService<HttpClient>(HttpClient);

    httpClient.setAuthToken(undefined);
  });

  yield takeEvery(getType(logoutAction.success), () => {
    const httpClient = getService<HttpClient>(HttpClient);

    httpClient.setAuthToken(undefined);
  });

  yield takeEvery(
    getType(rehydrateAction),
    ({ payload }: ActionType<typeof rehydrateAction>) => {
      if (!payload) {
        return;
      }
      const httpClient = getService<HttpClient>(HttpClient);

      httpClient.setAuthToken(payload.loginReducer?.session?.token);
    }
  );

  yield takeEvery(getType(callAsyncAction), function* ({
    payload
  }: ActionType<typeof callAsyncAction>) {
    const {
      action,
      onError,
      onErrorNotification = {
        message: t(translationPath(lang.dialog.notifications.actionFailed)),
        severity: NotificationSeverity.Error
      },
      onSuccess,
      onSuccessNotification = {
        message: t(translationPath(lang.dialog.notifications.actionSucceeded)),
        severity: NotificationSeverity.Success
      },
      payload: actionPayload
    } = payload;

    if (
      typeof action.request !== "function" ||
      typeof action.failure !== "function" ||
      typeof action.success !== "function"
    ) {
      return;
    }

    yield put(action.request(actionPayload));

    const [successResponse, errorResponse, success] = yield handleResponse(
      action
    );

    if (!success) {
      if (onErrorNotification) {
        const errorNotification =
          typeof onErrorNotification === "function"
            ? onErrorNotification(errorResponse)
            : onErrorNotification;
        yield put(notificationAction(errorNotification));
      }
      if (typeof onError === "function") {
        onError(errorResponse);
      }
    } else {
      if (onSuccessNotification) {
        yield put(notificationAction(onSuccessNotification));
      }
      if (typeof onSuccess === "function") {
        onSuccess(successResponse);
      }
    }
  });

  yield takeEvery(getType(fetchDocument.request), function* ({
    payload
  }: ActionType<typeof fetchDocument.request>) {
    const { id, nodeType } = payload;

    const url = getUrlByNodeType(nodeType);

    const { errorResponse, response, success } = yield call(
      fetchSaga,
      url,
      "GET",
      {
        urlWildCards: {
          nodeId: id
        }
      }
    );

    if (!success) {
      yield put(fetchDocument.failure(errorResponse));
      return;
    }

    yield put(fetchDocument.success(convertResponse(response)));
  });
}
