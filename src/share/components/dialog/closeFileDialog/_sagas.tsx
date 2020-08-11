import { dialogOpenAction } from "core/components/dialog/_actions";
import { DialogType } from "core/components/dialog/_types";
import { put, takeLatest } from "redux-saga/effects";
import { ActionType, getType } from "typesafe-actions";
import { closeFileDialogOpen } from "./_actions";

export function* watchCloseFileDialogAction() {
  yield takeLatest(getType(closeFileDialogOpen), function* ({
    payload
  }: ActionType<typeof closeFileDialogOpen>) {
    if (!payload) {
      return;
    }

    yield put(
      dialogOpenAction({
        dialogProps: payload,
        dialogType: DialogType.CloseFile
      })
    );
  });
}
