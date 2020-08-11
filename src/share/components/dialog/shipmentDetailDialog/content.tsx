import { callAsyncAction } from "core/action";
import { secondaryAction } from "core/components/dialog/lib/actionsFactory";
import { HistoryShipmentTab } from "core/components/dialog/tabs/historyShipment";
import { ComponentsShipmentTab } from "core/components/dialog/tabs/shipmentComponents";
import {
  DialogContentPropsType,
  DialogContentType,
  DialogDataGenericData,
  DialogType
} from "core/components/dialog/_types";
import { documentViewAction__Refresh } from "core/components/documentView/_actions";
import NamedTitle from "core/components/namedTitle";
import { SpisumNodeTypes } from "enums";
import React from "react";
import { translationPath } from "share/utils/getPath";
import { lang, t } from "translation/i18n";
import { createDocumentDialog } from "../baseDocumentDialog/documentDialogFactory";
import {
  shipmentDetailBodyList,
  shipmentDetailSaveActionList
} from "./mappers";
import MetaDataTab from "./MetadataFormTab";

const komponentList = {
  [SpisumNodeTypes.ShipmentDatabox]: true,
  [SpisumNodeTypes.ShipmentEmail]: true,
  [SpisumNodeTypes.ShipmentPost]: false,
  [SpisumNodeTypes.ShipmentPersonally]: false,
  [SpisumNodeTypes.ShipmentPublish]: true
};
const componentFilter = ({
  dialogProps
}: DialogContentPropsType) => {
  return komponentList[(dialogProps.data as DialogDataGenericData).nodeType!];
};

export const openShipmentDetailDialog: DialogContentType = createDocumentDialog(
  {
    actions: () => [
      secondaryAction(
        t(translationPath(lang.dialog.form.edit)),
        ({
          dispatch,
          channels,
          onClose,
          buttonState,
          dialogProps
        }) => {
          const formValues = channels?.Metadata?.state?.formValues;
          const componentIdList =
            channels?.Komponenty?.state?.selectedComponentsIds;
          const preventAction = channels?.Komponenty?.state?.preventAction;
          if (!formValues) {
            return;
          }

          const { nodeType } = dialogProps.data as DialogDataGenericData;
          if (komponentList[nodeType!] && preventAction) return;

          if (
            !shipmentDetailSaveActionList.hasOwnProperty(nodeType!) ||
            !shipmentDetailBodyList.hasOwnProperty(nodeType!)
          ) {
            return;
          }

          const action = shipmentDetailSaveActionList[nodeType!];
          const bodyMapper = shipmentDetailBodyList[nodeType!];
          const body = bodyMapper(formValues, componentIdList);

          const onSuccess = () => {
            // set all tabs to saved to close modal
            for (const key in channels) {
              if (!channels.hasOwnProperty(key)) continue;
              channels[key].setIsSaved(true);
            }

            dispatch(documentViewAction__Refresh(true));
            onClose();
          };

          const onError = () => {
            buttonState.setIsPending(false);
            channels?.Metadata?.setIsSaved(false);
          };

          buttonState.setIsPending(true);

          dispatch(
            callAsyncAction({
              action,
              onError,
              onSuccess,
              payload: {
                body,
                nodeId: channels?.Metadata?.state?.id as string
              }
            })
          );
        }
      )
    ],
    tabs: [
      {
        content: MetaDataTab,
        label: t(translationPath(lang.dialog.tabs.metadata))
      },
      {
        content: ComponentsShipmentTab,
        filter: componentFilter,
        label: t(translationPath(lang.dialog.tabs.components))
      },
      {
        content: HistoryShipmentTab,
        label: t(translationPath(lang.dialog.tabs.history))
      }
    ],
    title: (props) => (
      <NamedTitle
        text={t(translationPath(lang.dialog.title.shipmentDetail))}
        {...props}
      />
    ),
    type: DialogType.OpenShipmentDetail
  }
);
