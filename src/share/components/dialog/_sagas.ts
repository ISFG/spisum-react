import { put, takeLatest } from "@redux-saga/core/effects";
import {
  documentCreateActionType,
  openDocumentDetailsAction,
  openDocumentReadonlyDetailsAction,
  openDocumentWithSaveButtonsAction
} from "core/api/document/_actions";
import { databoxMapper, emailMapper } from "core/api/mapper";
import { SslAnalog, SslProperties } from "core/api/models";
import { dialogOpenAction } from "core/components/dialog/_actions";
import {
  DialogTypeReadOnly,
  DialogTypeWithSaveButtons,
  DialogTypeWitRegisterButtons
} from "core/components/dialog/_types";
import { metaFormAction__Update } from "core/components/MetaForm/_actions";
import { FormValues } from "core/components/MetaForm/_types";
import { notificationAction } from "core/components/notifications/_actions";
import { NotificationSeverity } from "core/components/notifications/_types";
import { transformDocumentPayload } from "core/mappers/api/document";
import { DeliveryMode, DocumentType, SpisumNodeTypes } from "enums";
import { pick } from "lodash";
import { documentRegisterAction } from "modules/mailroom/features/income/_actions";
import { translationPath } from "share/utils/getPath";
import { handleResponse } from "share/utils/typesafeActions";
import { mapKey2Value } from "share/utils/utils";
import { lang, t } from "translation/i18n";
import { ActionType, getType } from "typesafe-actions";
import { defaultAnalogValues } from "./analogDetailsDialog/_sagas";
import { defaultTechnicalCarriesValues } from "./technicalDataCarriesDetailsDialog/_sagas";

const defaultDialogFormValues = {
  analog: defaultAnalogValues(),
  digital: defaultTechnicalCarriesValues()
};

export function* watchDialogOpenDocumentWithSaveButtonsDetailsAction() {
  yield takeLatest(getType(openDocumentWithSaveButtonsAction), function* ({
    payload
  }: ActionType<typeof openDocumentWithSaveButtonsAction>) {
    const form = payload?.properties?.ssl?.form;

    yield put(
      metaFormAction__Update({
        documentId: payload.id,
        formValues: {
          ...(form
            ? defaultDialogFormValues[form]
            : defaultDialogFormValues.analog),
          ...transformDocumentPayload(payload.properties?.ssl as SslProperties),
          createdAt: payload.createdAt || null,
          owner: payload.properties?.cm?.owner?.displayName
        },
        nodeType: payload.nodeType
      })
    );

    yield put(
      dialogOpenAction({
        dialogData: payload,
        dialogType: form
          ? DialogTypeWithSaveButtons[form]
          : DialogTypeWithSaveButtons.analog
      })
    );
  });
}

export function* watchDialogOpenReadOnlyDetailsAction() {
  yield takeLatest(getType(openDocumentReadonlyDetailsAction), function* ({
    payload
  }: ActionType<typeof openDocumentReadonlyDetailsAction>) {
    const form = payload?.properties?.ssl?.form;

    yield put(
      metaFormAction__Update({
        documentId: payload.id,
        formValues: {
          ...(form
            ? defaultDialogFormValues[form]
            : defaultDialogFormValues.analog),
          ...transformDocumentPayload(payload.properties?.ssl as SslProperties),
          owner: payload.properties?.cm?.owner?.displayName
        },
        nodeType: payload.nodeType
      })
    );

    yield put(
      dialogOpenAction({
        dialogData: {
          ...payload,
          isReadonly: true
        },
        dialogType: form ? DialogTypeReadOnly[form] : DialogTypeReadOnly.analog
      })
    );
  });
}

export function* watchOpenDialogDetailsAction() {
  yield takeLatest(getType(openDocumentDetailsAction), function* ({
    payload
  }: ActionType<typeof openDocumentDetailsAction>) {
    const form = payload?.properties?.ssl?.form;

    yield put(
      metaFormAction__Update({
        documentId: payload.id,
        formValues: {
          ...(form
            ? defaultDialogFormValues[form]
            : defaultDialogFormValues.analog),
          ...transformDocumentPayload(payload.properties?.ssl as SslProperties),
          owner: payload.properties?.cm?.owner?.displayName
        },
        nodeType: payload.nodeType
      })
    );

    yield put(
      dialogOpenAction({
        dialogData: {
          ...payload,
          useAutoSave: true
        },
        dialogType: form
          ? DialogTypeWitRegisterButtons[form]
          : DialogTypeWitRegisterButtons.analog
      })
    );
  });
}

const getDefaultValuesForEmailAndDataboxRegisterForm = (
  nodeType: SpisumNodeTypes
) => {
  const deliveryMode =
    nodeType === SpisumNodeTypes.Databox
      ? DeliveryMode.Databox
      : DeliveryMode.Email;

  return {
    attachmentsCount: 0,
    attachmentsType: "",
    deliveryDate: new Date(),
    deliveryMode,
    deliveryTime: new Date(),
    form: DocumentType.Digital,
    pid: "",
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
    subject: "0"
  };
};

export function* watchRegisterDocumentAction() {
  yield takeLatest(getType(documentRegisterAction), function* ({
    payload
  }: ActionType<typeof documentRegisterAction>) {
    const { dialogType, documentType, document, nodeType, onSuccess } = payload;

    yield put(
      dialogOpenAction({
        dialogData: {
          disableConverIcon: true,
          onSuccess,
          useAutoSave: true
        },
        dialogType
      })
    );

    yield put(
      documentCreateActionType.request({
        documentType,
        nodeId: document.id,
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

    const properties =
      nodeType === SpisumNodeTypes.Databox
        ? mapKey2Value<object, SslAnalog>(
            databoxMapper,
            document.properties?.ssl as object
          )
        : nodeType === SpisumNodeTypes.Email
        ? mapKey2Value<object, SslAnalog>(
            emailMapper,
            document.properties?.ssl as object
          )
        : document.properties?.ssl;

    const defaultValues = getDefaultValuesForEmailAndDataboxRegisterForm(
      nodeType
    );

    const allValues = {
      ...defaultValues,
      ...properties,
      ...successResponse.entry.properties?.ssl
    };

    const withDeliveryType = {
      ...allValues,
      deliveryTime: allValues.deliveryDate,
      sender_contact: allValues.sender
    };

    yield put(
      metaFormAction__Update({
        documentId: successResponse.entry.id,
        formValues: pick(
          withDeliveryType,
          Object.keys(defaultValues)
        ) as FormValues,
        isLoading: false,
        nodeType: successResponse.entry.nodeType
      })
    );
  });
}
