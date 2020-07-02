import { dialogOpenAction } from "core/components/dialog/_actions";
import { DialogType } from "core/components/dialog/_types";
import { put, takeLatest } from "redux-saga/effects";
import { ActionType, getType } from "typesafe-actions";
import { discardCancelDialogOpen } from "./_actions";

export function* watchDiscardCancelDialogAction() {
  yield takeLatest(getType(discardCancelDialogOpen), function* ({
    payload
  }: ActionType<typeof discardCancelDialogOpen>) {
    if (!payload) {
      return;
    }

    yield put(
      dialogOpenAction({
        dialogData: payload,
        dialogType: DialogType.CancelDiscardDialog
      })
    );
  });
}
