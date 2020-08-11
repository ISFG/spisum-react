import { fetchDocument } from "core/action";
import { SslConcept } from "core/api/models";
import { dialogOpenAction } from "core/components/dialog/_actions";
import { DialogType } from "core/components/dialog/_types";
import { metaFormAction__Update } from "core/components/MetaForm/_actions";
import { notificationAction } from "core/components/notifications/_actions";
import { NotificationSeverity } from "core/components/notifications/_types";
import { Concept } from "core/types";
import { put, takeLatest } from "redux-saga/effects";
import { translationPath } from "share/utils/getPath";
import { handleResponse } from "share/utils/typesafeActions";
import { t } from "translation/i18n";
import lang from "translation/lang";
import { getType } from "typesafe-actions";
import {
  dialogOpenConceptDetails,
  DialogOpenConceptDetailsActionType
} from "./_actions";

export function* watchDialogOpenConceptDetailsAction() {
  yield takeLatest(getType(dialogOpenConceptDetails), function* ({
    payload
  }: DialogOpenConceptDetailsActionType) {
    const document = payload!.data as Concept;

    yield put(
      fetchDocument.request({
        id: document.id,
        nodeType: document.nodeType
      })
    );

    const [successResponse, , success] = yield handleResponse(fetchDocument);

    if (!success) {
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
        documentId: successResponse.entry?.id,
        formValues: {
          subject: "",
          ...successResponse.entry?.properties?.ssl,
          createdAt: successResponse.entry?.createdAt,
          owner: successResponse.entry?.properties?.cm?.owner?.displayName
        } as SslConcept,
        isLoading: false,
        isLocked: successResponse.entry?.isLocked,
        nodeType: successResponse.entry?.nodeType
      })
    );

    yield put(
      dialogOpenAction({
        dialogProps: payload,
        dialogType: DialogType.ConceptDetails
      })
    );
  });
}
