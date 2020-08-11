import { dialogOpenAction } from "core/components/dialog/_actions";
import { DialogType } from "core/components/dialog/_types";
import { put, takeLatest } from "redux-saga/effects";
import { ActionType, getType } from "typesafe-actions";
import { lostDestroyedDialogOpen } from "./_actions";

export function* watchLostDestroyedDialogAction() {
  yield takeLatest(getType(lostDestroyedDialogOpen), function* ({
    payload
  }: ActionType<typeof lostDestroyedDialogOpen>) {
    if (!payload) {
      return;
    }

    yield put(
      dialogOpenAction({
        dialogProps: payload,
        dialogType: DialogType.LostDestroyed
      })
    );
  });
}
