import { documentCreateActionType } from "core/api/document/_actions";
import { SslAnalogWithOwner } from "core/api/models";
import { dialogOpenAction } from "core/components/dialog/_actions";
import { DialogType } from "core/components/dialog/_types";
import { metaFormAction__Update } from "core/components/MetaForm/_actions";
import { notificationAction } from "core/components/notifications/_actions";
import { NotificationSeverity } from "core/components/notifications/_types";
import { DocumentType, SpisumNodeTypes } from "enums";
import { put, takeLatest } from "redux-saga/effects";
import { createTechnicalDataCarriesDocument } from "share/components/dialog/technicalDataCarriesDetailsDialog/_actions";
import { translationPath } from "share/utils/getPath";
import { handleResponse } from "share/utils/typesafeActions";
import { lang, t } from "translation/i18n";
import { ActionType, getType } from "typesafe-actions";

export const defaultTechnicalCarriesValues = (): SslAnalogWithOwner => {
  return {
    attachmentsCount: 0,
    attachmentsType: "",
    borrowDate: null,
    borrowReturnDate: null,
    createdAt: null,
    deliveryDate: new Date(),
    deliveryMode: "",
    deliveryTime: new Date(),
    fileMark: "",
    filePlan: "",
    form: DocumentType.Digital,
    listCountAttachments: 0,
    owner: "",
    pid: "",
    retentionMark: "",
    retentionMode: "",
    retentionPeriod: null,
    sender: "",
    senderRegistrationNumber: "",
    senderType: "individual",
    sender_address: "",
    sender_contact: "",
    sender_job: "",
    sender_name: "",
    sender_orgName: "",
    sender_orgUnit: "",
    settleToDate: null,
    shreddingDate: null,
    state: "",
    subject: ""
  };
};

export function* watchTechnicalDataCarriesDocumentAction() {
  yield takeLatest(getType(createTechnicalDataCarriesDocument), function* ({
    payload
  }: ActionType<typeof createTechnicalDataCarriesDocument>) {
    yield put(
      dialogOpenAction({
        dialogData: {
          onClose: payload.onClose,
          saveOnOpen: true,
          useAutoSave: true
        },
        dialogType: DialogType.TechnicalDataCarriesDetails
      })
    );

    yield put(
      documentCreateActionType.request({
        documentType: DocumentType.Digital,
        nodeType: SpisumNodeTypes.Document
      })
    );

    const [successResponse, , success] = yield handleResponse(
      documentCreateActionType
    );

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
        documentId: successResponse.entry.id,
        formValues: {
          ...defaultTechnicalCarriesValues(),
          ...successResponse.entry.properties.ssl
        },
        isLocked: successResponse.entry.isLocked,
        nodeType: successResponse.entry.nodeType
      })
    );
  });
}
