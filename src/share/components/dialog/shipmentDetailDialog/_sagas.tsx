import { dialogOpenAction } from "core/components/dialog/_actions";
import { DialogType } from "core/components/dialog/_types";
import { metaFormAction__Update } from "core/components/MetaForm/_actions";
import { notificationAction } from "core/components/notifications/_actions";
import { NotificationSeverity } from "core/components/notifications/_types";
import { SpisumNodeTypes } from "enums";
import { put, takeLatest } from "redux-saga/effects";
import { translationPath } from "share/utils/getPath";
import { getNameTypeMap } from "share/utils/mapper";
import { lang, t } from "translation/i18n";
import { ActionType, getType } from "typesafe-actions";
import {
  ShipmentDetailDataBoxInitialValues,
  ShipmentDetailEmailInitialValues,
  ShipmentDetailPersonallyInitialValues,
  ShipmentDetailPostInitialValues,
  ShipmentDetailPublishInitialValues
} from "./mappers";
import { shipmentDetailFormList } from "./MetadataFormTab";
import { shipmentDetailDialogOpen } from "./_action";

const initialValuesMap = {
  [SpisumNodeTypes.ShipmentDatabox]: ShipmentDetailDataBoxInitialValues,
  [SpisumNodeTypes.ShipmentEmail]: ShipmentDetailEmailInitialValues,
  [SpisumNodeTypes.ShipmentPost]: ShipmentDetailPostInitialValues,
  [SpisumNodeTypes.ShipmentPersonally]: ShipmentDetailPersonallyInitialValues,
  [SpisumNodeTypes.ShipmentPublish]: ShipmentDetailPublishInitialValues
};

export function* watchShipmentDetailDialogAction() {
  yield takeLatest(getType(shipmentDetailDialogOpen), function* ({
    payload
  }: ActionType<typeof shipmentDetailDialogOpen>) {
    if (!payload) {
      return;
    }

    const {
      selected,
      documentId,
      onClose,
      readonly,
      componentReadonly
    } = payload;
    const sslPostType = selected.properties?.ssl?.postType;
    const formData = {
      ...initialValuesMap[selected.nodeType],
      ...selected.properties?.ssl,
      postType: sslPostType ? sslPostType.split(",") : []
    };

    const onErrorNotification = {
      message: t(translationPath(lang.dialog.notifications.actionFailed)),
      severity: NotificationSeverity.Error
    };
    const nodeTypeName = getNameTypeMap(selected.nodeType);
    let isForm = false;
    if (
      shipmentDetailFormList.hasOwnProperty(selected.nodeType) &&
      !!shipmentDetailFormList[selected.nodeType]
    ) {
      isForm = true;
    }

    if (!isForm || !selected) {
      yield put(notificationAction(onErrorNotification));
      return;
    }

    yield put(
      dialogOpenAction({
        dialogData: {
          ...selected,
          documentId,
          isComponentReadonly: componentReadonly,
          isReadonly: !!readonly,
          onClose
        },
        dialogType: DialogType.OpenShipmentDetail
      })
    );
    yield put(
      metaFormAction__Update({
        documentId: selected.id,
        formValues: {
          ...formData,
          createdAt: selected.createdAt,
          nodeType: selected.nodeType as SpisumNodeTypes,
          nodeTypeName
        },
        nodeType: selected.nodeType
      })
    );
  });
}
