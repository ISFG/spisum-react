import { SslConcept } from "core/api/models";
import { dialogOpenAction } from "core/components/dialog/_actions";
import { DialogType } from "core/components/dialog/_types";
import { metaFormAction__Update } from "core/components/MetaForm/_actions";
import { Concept } from "core/types";
import { put, takeLatest } from "redux-saga/effects";
import { getType } from "typesafe-actions";
import {
  dialogOpenConceptDetails,
  DialogOpenConceptDetailsActionType
} from "./_actions";

export function* watchDialogOpenConceptDetailsAction() {
  yield takeLatest(getType(dialogOpenConceptDetails), function* ({
    payload
  }: DialogOpenConceptDetailsActionType) {
    const document = payload as Concept;

    yield put(
      metaFormAction__Update({
        documentId: document.id,
        formValues: {
          ...document.properties?.ssl,
          createdAt: document.createdAt,
          owner: document.properties?.cm?.owner?.displayName
        } as SslConcept,
        isLoading: false,
        isLocked: document.isLocked,
        nodeType: document.nodeType
      })
    );

    yield put(
      dialogOpenAction({
        dialogData: payload,
        dialogType: DialogType.ConceptDetails
      })
    );
  });
}
