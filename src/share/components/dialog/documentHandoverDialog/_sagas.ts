import { dialogOpenAction } from "core/components/dialog/_actions";
import { DialogType } from "core/components/dialog/_types";
import { put, takeLatest } from "redux-saga/effects";
import { ActionType, getType } from "typesafe-actions";
import { handoverDocument } from "./_actions";

export function* watchDocumentHandoverAction() {
  yield takeLatest(getType(handoverDocument), function* ({
    payload
  }: ActionType<typeof handoverDocument>) {
    yield put(
      dialogOpenAction({
        dialogData: payload,
        dialogType: DialogType.HandoverDocument
      })
    );
  });
}
