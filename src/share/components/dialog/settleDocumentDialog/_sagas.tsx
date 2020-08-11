import { dialogOpenAction } from "core/components/dialog/_actions";
import { DialogType } from "core/components/dialog/_types";
import { put, takeLatest } from "redux-saga/effects";
import { ActionType, getType } from "typesafe-actions";
import { settleDocumentDialogOpen } from "./_actions";

export function* watchSettleDocumentDialogAction() {
  yield takeLatest(getType(settleDocumentDialogOpen), function* ({
    payload
  }: ActionType<typeof settleDocumentDialogOpen>) {
    if (!payload) {
      return;
    }

    yield put(
      dialogOpenAction({
        dialogProps: payload,
        dialogType: DialogType.SettleDocument
      })
    );
  });
}
