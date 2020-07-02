import {
  NodeChildAssociation,
  SslFile,
  SuccessResponseType
} from "core/api/models";
import { searchAction } from "core/api/search/_actions";
import { notificationAction } from "core/components/notifications/_actions";
import { NotificationSeverity } from "core/components/notifications/_types";
import { put, takeEvery } from "redux-saga/effects";
import { convertResponse } from "share/utils/convert";
import { translationPath } from "share/utils/getPath";
import { handleResponse } from "share/utils/typesafeActions";
import { lang, t } from "translation/i18n";
import { ActionType, getType } from "typesafe-actions";
import { searchFilesAction } from "./_actions";

export function* watchDialogFileSearchAction() {
  yield takeEvery(getType(searchFilesAction.request), function* ({
    payload
  }: ActionType<typeof searchFilesAction.request>) {
    yield put(searchAction.request(payload));

    const [successResponse, errorResponse, success] = yield handleResponse(
      searchAction
    );

    if (!success) {
      yield put(
        notificationAction({
          message: t(
            translationPath(lang.dialog.notifications.somethingFailed)
          ),
          severity: NotificationSeverity.Error
        })
      );

      yield put(searchFilesAction.failure(errorResponse));
      return;
    }

    const response = convertResponse(successResponse) as SuccessResponseType<
      NodeChildAssociation<SslFile>
    >;

    yield put(
      searchFilesAction.success(response.list.entries?.map((e) => e.entry))
    );
  });
}
