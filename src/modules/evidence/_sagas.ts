import {
  documentAddToFavoriteAction,
  documentRemoveFromFavoriteAction
} from "core/api/document/_actions";
import {
  fileDocumentAddToFavoriteAction,
  fileDocumentRemoveFromFavoriteAction
} from "core/api/file/_actions";
import { documentViewAction__UpdateIsFavorite } from "core/components/documentView/_actions";
import { notificationAction } from "core/components/notifications/_actions";
import { NotificationSeverity } from "core/components/notifications/_types";
import { SpisumNodeTypes } from "enums";
import { put, takeEvery } from "redux-saga/effects";
import { translationPath } from "share/utils/getPath";
import { handleResponse } from "share/utils/typesafeActions";
import { lang, t } from "translation/i18n";
import { ActionType, getType } from "typesafe-actions";
import { changeDocumentIsFavoriteAction } from "./_actions";
import { ChangeDocumentIsFavoriteActionType } from "./_types";

const actions = {
  [SpisumNodeTypes.Document]: {
    [ChangeDocumentIsFavoriteActionType.Add]: documentAddToFavoriteAction,
    [ChangeDocumentIsFavoriteActionType.Remove]: documentRemoveFromFavoriteAction
  },
  [SpisumNodeTypes.File]: {
    [ChangeDocumentIsFavoriteActionType.Add]: fileDocumentAddToFavoriteAction,
    [ChangeDocumentIsFavoriteActionType.Remove]: fileDocumentRemoveFromFavoriteAction
  }
};

export function* watchEvidenceModuleActions() {
  yield takeEvery(getType(changeDocumentIsFavoriteAction), function* ({
    payload
  }: ActionType<typeof changeDocumentIsFavoriteAction>) {
    const { items, nodeType, actionType } = payload;

    const action = actions[nodeType][actionType];

    if (!action) {
      return;
    }

    const ids = items.map((item) => item.id);

    yield put(action.request({ ids }));

    const [, , success] = yield handleResponse(action);

    if (!success) {
      yield put(
        notificationAction({
          message: t(translationPath(lang.dialog.notifications.actionFailed)),
          severity: NotificationSeverity.Error
        })
      );
      return;
    }

    const isFavorite =
      actionType === ChangeDocumentIsFavoriteActionType.Add ? true : false;

    yield put(
      notificationAction({
        message: t(translationPath(lang.dialog.notifications.actionSucceeded)),
        severity: NotificationSeverity.Success
      })
    );

    yield put(documentViewAction__UpdateIsFavorite({ ids, isFavorite }));
  });
}
