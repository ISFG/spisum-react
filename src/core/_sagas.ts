import { put, takeEvery } from "redux-saga/effects";
import { handleResponse } from "share/utils/typesafeActions";
import { ActionType, getType } from "typesafe-actions";
import { translationPath } from "../share/utils/getPath";
import { lang, t } from "../translation/i18n";
import { callAsyncAction } from "./action";
import { notificationAction } from "./components/notifications/_actions";
import { NotificationSeverity } from "./components/notifications/_types";

export function* watchCoreActions() {
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
        yield put(notificationAction(onErrorNotification));
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
}
