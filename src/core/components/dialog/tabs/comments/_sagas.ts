import {
  addCommentsAction,
  getCommentsAction
} from "core/api/comments/_actions";
import { notificationAction } from "core/components/notifications/_actions";
import { NotificationSeverity } from "core/components/notifications/_types";
import { put, race, take, takeLatest } from "redux-saga/effects";
import { translationPath } from "share/utils/getPath";
import { t } from "translation/i18n";
import lang from "translation/lang";
import { ActionType, getType } from "typesafe-actions";
import { addCommentsInTab, fetchCommentsInTab } from "./_actions";

export function* watchCommentsAction() {
  yield takeLatest(getType(fetchCommentsInTab.request), function* ({
    payload
  }: ActionType<typeof fetchCommentsInTab.request>) {
    const { append, ...rest } = payload;

    yield put(getCommentsAction.request(rest));

    const [successResponse, errorResponse] = yield race([
      take(getCommentsAction.success),
      take(getCommentsAction.failure)
    ]);

    if (errorResponse) {
      yield put(fetchCommentsInTab.failure(errorResponse));

      yield put(
        notificationAction({
          message: t(
            translationPath(lang.dialog.notifications.somethingFailed)
          ),
          severity: NotificationSeverity.Error
        })
      );

      return;
    }

    yield put(
      fetchCommentsInTab.success({ ...successResponse.payload, append })
    );
  });

  yield takeLatest(getType(addCommentsInTab.request), function* ({
    payload
  }: ActionType<typeof addCommentsInTab.request>) {
    yield put(addCommentsAction.request(payload));

    const [successResponse, errorResponse] = yield race([
      take(addCommentsAction.success),
      take(addCommentsAction.failure)
    ]);

    if (errorResponse) {
      yield put(addCommentsInTab.failure(errorResponse));

      yield put(
        notificationAction({
          message: t(
            translationPath(lang.dialog.notifications.somethingFailed)
          ),
          severity: NotificationSeverity.Error
        })
      );

      return;
    }

    yield put(addCommentsInTab.success({ ...successResponse.payload }));
  });
}
