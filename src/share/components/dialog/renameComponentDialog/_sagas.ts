import { dialogOpenAction } from "core/components/dialog/_actions";
import { DialogType } from "core/components/dialog/_types";
import { put, takeLatest } from "redux-saga/effects";
import { ActionType, getType } from "typesafe-actions";
import { renameComponentAction } from "./_actions";

export function* watchRenameComponentAction() {
  yield takeLatest(getType(renameComponentAction), function* ({
    payload
  }: ActionType<typeof renameComponentAction>) {
    yield put(
      dialogOpenAction({
        dialogData: payload,
        dialogType: DialogType.RenameComponent
      })
    );
  });
}
