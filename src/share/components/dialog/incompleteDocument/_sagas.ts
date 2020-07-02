import { dialogOpenAction } from "core/components/dialog/_actions";
import { DialogType } from "core/components/dialog/_types";
import { put, takeLatest } from "redux-saga/effects";
import { getType } from "typesafe-actions";
import {
  DailogOpenIncompleteActionType,
  dialogOpenIncomplete
} from "./_action";

export function* watchDialogOpenIncompleteAction() {
  yield takeLatest(getType(dialogOpenIncomplete), function* ({
    payload
  }: DailogOpenIncompleteActionType) {
    yield put(
      dialogOpenAction({
        dialogData: payload,
        dialogType: DialogType.IncompleteDocument
      })
    );
  });
}
