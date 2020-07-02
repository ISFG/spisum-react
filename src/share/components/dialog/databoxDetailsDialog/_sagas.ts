import { SslDatabox } from "core/api/models";
import { dialogOpenAction } from "core/components/dialog/_actions";
import { DialogType } from "core/components/dialog/_types";
import { metaFormAction__Update } from "core/components/MetaForm/_actions";
import { DataboxDocument } from "core/types";
import { put, takeLatest } from "redux-saga/effects";
import { getType } from "typesafe-actions";
import {
  DailogOpenDataboxDetailsActionType,
  dialogOpenDataboxDetails
} from "./_actions";

export function* watchDialogOpenDataboxDetailsAction() {
  yield takeLatest(getType(dialogOpenDataboxDetails), function* ({
    payload
  }: DailogOpenDataboxDetailsActionType) {
    const document = payload as DataboxDocument;

    yield put(
      metaFormAction__Update({
        documentId: document.id,
        formValues: {
          ...document.properties?.ssl,
          databoxDeliveryTime: document.properties?.ssl?.databoxDeliveryDate
        } as SslDatabox,
        isLoading: false,
        nodeType: document.nodeType
      })
    );

    yield put(
      dialogOpenAction({
        dialogData: payload,
        dialogType: DialogType.DataboxDetails
      })
    );
  });
}
