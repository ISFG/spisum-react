import { SslDatabox } from "core/api/models";
import { dialogOpenAction } from "core/components/dialog/_actions";
import { DialogType } from "core/components/dialog/_types";
import { metaFormAction__Update } from "core/components/MetaForm/_actions";
import { DataboxDocument } from "core/types";
import { put, takeLatest } from "redux-saga/effects";
import { getType } from "typesafe-actions";
import {
  dialogOpenDataboxDetails,
  DialogOpenDataboxDetailsActionType
} from "./_actions";

export function* watchDialogOpenDataboxDetailsAction() {
  yield takeLatest(getType(dialogOpenDataboxDetails), function* ({
    payload
  }: DialogOpenDataboxDetailsActionType) {
    const data = payload.data as DataboxDocument;

    yield put(
      metaFormAction__Update({
        documentId: data.id,
        formValues: {
          ...data.properties?.ssl,
          databoxDeliveryTime: data.properties?.ssl?.digitalDeliveryDeliveryDate
        } as SslDatabox,
        isLoading: false,
        nodeType: data.nodeType
      })
    );

    yield put(
      dialogOpenAction({
        dialogProps: payload,
        dialogType: DialogType.DataboxDetails
      })
    );
  });
}
