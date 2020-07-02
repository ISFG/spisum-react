import {
  documentCreateActionType,
  documentRegisterActionType
} from "core/api/document/_actions";
import { SslAnalogWithOwner, SslProperties } from "core/api/models";
import { dialogOpenAction } from "core/components/dialog/_actions";
import { DialogType } from "core/components/dialog/_types";
import { metaFormAction__Update } from "core/components/MetaForm/_actions";
import { notificationAction } from "core/components/notifications/_actions";
import { NotificationSeverity } from "core/components/notifications/_types";
import { DocumentType, SpisumNodeTypes } from "enums";
import { put, takeLatest } from "redux-saga/effects";
import {
  createAnalogDocument,
  saveDocumentAction
} from "share/components/dialog/analogDetailsDialog/_actions";
import { handleResponse } from "share/utils/typesafeActions";
import { lang, t } from "translation/i18n";
import { ActionType, getType } from "typesafe-actions";
import { translationPath } from "../../../utils/getPath";

export const defaultAnalogValues = (): SslAnalogWithOwner => {
  return {
    CDCount: "",
    USBCount: "",
    attachmentsCount: 0,
    borrowDate: null,
    borrowReturnDate: null,
    createdAt: null,
    deliveryDate: new Date(),
    deliveryMode: "",
    deliveryTime: new Date(),
    description: "",
    fileMark: "",
    filePlan: "",
    form: DocumentType.Digital,
    listCount: 0,
    listCountAttachments: 0,
    openSheetCount: 0,
    owner: "",
    pid: "",
    retentionMark: "",
    retentionMode: "",
    retentionPeriod: null,
    sender: "",
    senderIdent: "",
    senderSSID: "",
    senderType: "individual",
    sender_address: "",
    sender_contact: "",
    sender_job: "",
    sender_name: "",
    sender_orgName: "",
    sender_orgUnit: "",
    serialNumber: "",
    settleToDate: null,
    shreddingDate: null,
    ssid: "",
    state: "",
    subject: "",
    volumesCount: 0
  };
};

export function* watchDocumentDetailAction() {
  yield takeLatest(getType(createAnalogDocument), function* ({
    payload
  }: ActionType<typeof createAnalogDocument>) {
    yield put(
      dialogOpenAction({
        dialogData: {
          onClose: payload.onClose,
          saveOnOpen: true,
          useAutoSave: true
        },
        dialogType: DialogType.AnalogDetails
      })
    );

    yield put(
      documentCreateActionType.request({
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
          ...defaultAnalogValues(),
          ...successResponse.entry.properties.ssl
        },
        isLocked: successResponse.entry.isLocked,
        nodeType: successResponse.entry.nodeType
      })
    );
  });

  yield takeLatest(getType(saveDocumentAction), function* ({
    payload
  }: ActionType<typeof saveDocumentAction>) {
    yield put(
      documentRegisterActionType.request({
        body: {
          properties: payload.data as SslProperties
        },
        nodeId: payload.id
      })
    );

    const [, , success] = yield handleResponse(documentRegisterActionType);

    if (!success) {
      yield put(
        notificationAction({
          message: t(translationPath(lang.dialog.notifications.notRegistered))
        })
      );
      return;
    }

    yield put(
      notificationAction({
        message: t(translationPath(lang.dialog.notifications.registered))
      })
    );

    payload.onSuccess?.();
  });
}
