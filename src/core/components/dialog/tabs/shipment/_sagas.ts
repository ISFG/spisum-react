import { nodeChildrenAction } from "core/api/node/_actions";
import { notificationAction } from "core/components/notifications/_actions";
import { NotificationSeverity } from "core/components/notifications/_types";
import { put, takeLatest } from "redux-saga/effects";
import { translationPath } from "share/utils/getPath";
import { handleResponse } from "share/utils/typesafeActions";
import { t } from "translation/i18n";
import lang from "translation/lang";
import { ActionType, getType } from "typesafe-actions";
import { nodeShipmentAction } from "./_actions";

export function* watchShipmentTabActionsAction() {
  yield takeLatest(getType(nodeShipmentAction.request), function* ({
    payload
  }: ActionType<typeof nodeShipmentAction.request>) {
    yield put(nodeChildrenAction.request(payload));

    const [successResponse, errorResponse, success] = yield handleResponse(
      nodeChildrenAction
    );

    if (!success) {
      yield put(nodeShipmentAction.failure(errorResponse));

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

    yield put(nodeShipmentAction.success(successResponse));
  });
}
