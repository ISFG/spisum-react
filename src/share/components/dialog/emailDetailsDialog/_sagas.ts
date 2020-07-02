import { SslEmail } from "core/api/models";
import { dialogOpenAction } from "core/components/dialog/_actions";
import { DialogType } from "core/components/dialog/_types";
import { metaFormAction__Update } from "core/components/MetaForm/_actions";
import { EmailDocument } from "core/types";
import { put, takeLatest } from "redux-saga/effects";
import { getType } from "typesafe-actions";
import {
  DailogOpenEmailDetailsActionType,
  dialogOpenEmailDetails
} from "./_actions";

export function* watchDialogOpenEmailDetailsAction() {
  yield takeLatest(getType(dialogOpenEmailDetails), function* ({
    payload
  }: DailogOpenEmailDetailsActionType) {
    const document = payload as EmailDocument;

    yield put(
      metaFormAction__Update({
        documentId: document.id,
        formValues: {
          ...document.properties?.ssl,
          emailDeliveryTime: document.properties?.ssl?.emailDeliveryDate
        } as SslEmail,
        isLoading: false,
        nodeType: document.nodeType
      })
    );

    yield put(
      dialogOpenAction({
        dialogData: payload,
        dialogType: DialogType.EmailDetails
      })
    );
  });
}
