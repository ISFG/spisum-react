import { dialogOpenAction } from "core/components/dialog/_actions";
import { DialogType } from "core/components/dialog/_types";
import { put, takeLatest } from "redux-saga/effects";
import { getType } from "typesafe-actions";
import {
  DailogOpenHandoverBackActionType,
  dialogOpenHandoverBack
} from "./_actions";

export function* watchDialogOpenHandoverBackAction() {
  yield takeLatest(getType(dialogOpenHandoverBack), function* ({
    payload
  }: DailogOpenHandoverBackActionType) {
    yield put(
      dialogOpenAction({
        dialogData: payload,
        dialogType: DialogType.HandoverDocumentBack
      })
    );
  });
}
