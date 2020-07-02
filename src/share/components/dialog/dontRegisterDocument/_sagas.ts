import { dialogOpenAction } from "core/components/dialog/_actions";
import { DialogType } from "core/components/dialog/_types";
import { put, takeLatest } from "redux-saga/effects";
import { getType } from "typesafe-actions";
import {
  DailogOpenDontRegisterActionType,
  dialogOpenDontRegister
} from "./_actions";

export function* watchDialogOpenDontRegisterAction() {
  yield takeLatest(getType(dialogOpenDontRegister), function* ({
    payload
  }: DailogOpenDontRegisterActionType) {
    yield put(
      dialogOpenAction({
        dialogData: payload,
        dialogType: DialogType.DontRegisterDocument
      })
    );
  });
}
