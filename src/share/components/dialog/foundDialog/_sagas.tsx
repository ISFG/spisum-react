import { dialogOpenAction } from "core/components/dialog/_actions";
import { DialogType } from "core/components/dialog/_types";
import { put, takeLatest } from "redux-saga/effects";
import { ActionType, getType } from "typesafe-actions";
import { openFoundDialog } from "./_actions";

export function* watchFoundDialogAction() {
  yield takeLatest(getType(openFoundDialog), function* ({
    payload
  }: ActionType<typeof openFoundDialog>) {
    if (!payload) {
      return;
    }

    yield put(
      dialogOpenAction({
        dialogData: payload,
        dialogType: DialogType.FoundDialog
      })
    );
  });
}
