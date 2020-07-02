import { conceptCreateActionType } from "core/api/concept/_actions";
import { dialogOpenAction } from "core/components/dialog/_actions";
import { DialogType } from "core/components/dialog/_types";
import { metaFormAction__Update } from "core/components/MetaForm/_actions";
import { notificationAction } from "core/components/notifications/_actions";
import { NotificationSeverity } from "core/components/notifications/_types";
import { put, takeLatest } from "redux-saga/effects";
import { lang, t } from "translation/i18n";
import { getType } from "typesafe-actions";
import { SpisumNodeTypes } from "../../../../enums";
import { translationPath } from "../../../utils/getPath";
import { handleResponse } from "../../../utils/typesafeActions";
import { evidenceCreateConceptDialogOpen } from "./_actions";

export function* watchEvidenceCreateConceptDialogOpenAction() {
  yield takeLatest(getType(evidenceCreateConceptDialogOpen), function* () {
    yield put(
      dialogOpenAction({
        dialogData: {
          nodeType: SpisumNodeTypes.Concept
        },
        dialogType: DialogType.CreateConcept
      })
    );

    yield put(conceptCreateActionType.request());

    const [successResponse, errorResponse] = yield handleResponse(
      conceptCreateActionType
    );

    if (errorResponse) {
      yield put(
        notificationAction({
          message: t(translationPath(lang.dialog.notifications.actionFailed)),
          severity: NotificationSeverity.Error
        })
      );
      return;
    }

    yield put(
      metaFormAction__Update({
        documentId: successResponse.id
      })
    );
  });
}
