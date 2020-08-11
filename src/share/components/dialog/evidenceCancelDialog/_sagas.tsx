import { dialogOpenAction } from "core/components/dialog/_actions";
import { DialogType } from "core/components/dialog/_types";
import { put, takeLatest } from "redux-saga/effects";
import { ActionType, getType } from "typesafe-actions";
import { evidenceCancelDialogOpen } from "./_actions";

export function* watchEvidenceCancelDialogAction() {
  yield takeLatest(getType(evidenceCancelDialogOpen), function* ({
    payload
  }: ActionType<typeof evidenceCancelDialogOpen>) {
    if (!payload) {
      return;
    }

    yield put(
      dialogOpenAction({
        dialogProps: payload,
        dialogType: DialogType.CancelDialog
      })
    );
  });
}
