import { dialogOpenAction } from "core/components/dialog/_actions";
import { DialogType } from "core/components/dialog/_types";
import { put, takeLatest } from "redux-saga/effects";
import { ActionType, getType } from "typesafe-actions";
import { recoverDialogOpen } from "./_actions";

export function* watchRecoverDialogAction() {
  yield takeLatest(getType(recoverDialogOpen), function* ({
    payload
  }: ActionType<typeof recoverDialogOpen>) {
    if (!payload) {
      return;
    }

    yield put(
      dialogOpenAction({
        dialogData: payload,
        dialogType: DialogType.RecoverDialog
      })
    );
  });
}
