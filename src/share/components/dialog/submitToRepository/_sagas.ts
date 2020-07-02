import { dialogOpenAction } from "core/components/dialog/_actions";
import { DialogType } from "core/components/dialog/_types";
import { notificationAction } from "core/components/notifications/_actions";
import { NotificationSeverity } from "core/components/notifications/_types";
import { RootStateType } from "reducers";
import { put, select, takeLatest } from "redux-saga/effects";
import { translationPath } from "share/utils/getPath";
import { lang, t } from "translation/i18n";
import { ActionType, getType } from "typesafe-actions";
import { submitToRepositoryDialogOpen } from "./_actions";

const getRepository = (state: RootStateType) =>
  state?.loginReducer?.global?.groups?.repository;

export function* watchSubmitToRepositoryDialogAction() {
  yield takeLatest(getType(submitToRepositoryDialogOpen), function* ({
    payload
  }: ActionType<typeof submitToRepositoryDialogOpen>) {
    if (!payload) {
      return;
    }
    const repository = yield select(getRepository);
    const { selected, onSubmitActionName } = payload;
    const onErrorNotification = {
      message: t(
        translationPath(lang.dialog.notifications.notFoundAnyRepositories)
      ),
      severity: NotificationSeverity.Error
    };
    if (repository.length === 0) {
      yield put(notificationAction(onErrorNotification));
      return;
    }
    const dialogData = {
      groupList: repository,
      onSubmitActionName,
      selected
    };
    yield put(
      dialogOpenAction({
        dialogData,
        dialogType: DialogType.SubmitTo
      })
    );
  });
}
