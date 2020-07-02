import { push } from "connected-react-router";
import {
  closeModalLoadingAction,
  openModalLoadingAction
} from "core/components/layout/_actions";
import { notificationAction } from "core/components/notifications/_actions";
import { NotificationSeverity } from "core/components/notifications/_types";
import { CoreRoutes } from "core/routes";
import { call, put, takeLatest } from "redux-saga/effects";
import { fetchSaga } from "share/utils/fetch";
import { translationPath } from "share/utils/getPath";
import { timeout } from "share/utils/utils";
import { lang, t } from "translation/i18n";
import { getType } from "typesafe-actions";
import { ApiURL } from "../../apiURL";
import { logoutAction } from "./_actions";

export function* watchLogoutAction() {
  yield takeLatest(getType(logoutAction.request), function* () {
    yield put(openModalLoadingAction());

    const { status, success } = yield call(fetchSaga, ApiURL.LOGOUT, "POST");

    yield call(timeout, 1000);

    yield put(closeModalLoadingAction());

    if (!success && status !== 401) {
      yield put(
        notificationAction({
          message: t(translationPath(lang.logout.error)),
          severity: NotificationSeverity.Error
        })
      );
      return;
    }

    yield put(logoutAction.success());
    yield put(push(CoreRoutes.LOGIN));
  });
}
