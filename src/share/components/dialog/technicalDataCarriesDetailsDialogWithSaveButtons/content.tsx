import { callAsyncAction } from "core/action";
import { documentUpdateActionType } from "core/api/document/_actions";
import { getDocumentSaveButtonsActions } from "core/api/document/_methods";
import { NodeChildAssociationEntry, SslProperties } from "core/api/models";
import {
  primaryAction,
  secondaryAction
} from "core/components/dialog/lib/actionsFactory";
import { CommentsTab } from "core/components/dialog/tabs/comments";
import { ComponentsTab } from "core/components/dialog/tabs/components";
import { HistoryTab } from "core/components/dialog/tabs/history";
import { SaveAndDiscardTab } from "core/components/dialog/tabs/saveAndDiscard/SaveAndDiscardTab";
import { SettleTab } from "core/components/dialog/tabs/settle/SettleTab";
import { ShipmentTab } from "core/components/dialog/tabs/shipment";
import { VersionTab } from "core/components/dialog/tabs/version";
import { DialogContentType, DialogType } from "core/components/dialog/_types";
import { documentViewAction__UpdateItem } from "core/components/documentView/_actions";
import NamedTitle from "core/components/namedTitle";
import { GenericDocument } from "core/types";
import React from "react";
import { translationPath } from "share/utils/getPath";
import { lang, t } from "translation/i18n";
import { createDocumentDialog } from "../baseDocumentDialog/documentDialogFactory";
import { handoverDocument } from "../documentHandoverDialog/_actions";
import MetaDataTab from "./MetaDataFormTab";

export const technicalDataCarriesDetailsWithSaveButtonsDialog: DialogContentType = createDocumentDialog(
  {
    actions: (dialogProps) => {
      const primaryButton = primaryAction(
        t(translationPath(lang.dialog.form.save)),
        ({ dispatch, channels, onClose, buttonState }) => {
          const formValues = channels?.Metadata?.state
            ?.formValues as SslProperties;
          if (!formValues) return;

          const onSuccess = (
            response: NodeChildAssociationEntry<SslProperties>
          ) => {
            // set all tabs to saved to close modal
            for (const key in channels) {
              if (!channels.hasOwnProperty(key)) continue;
              channels[key].setIsSaved(true);
            }
            dispatch(documentViewAction__UpdateItem(response));
            onClose();
          };

          const onError = () => {
            buttonState.setIsPending(false);
          };

          buttonState.setIsPending(true);

          dispatch(
            callAsyncAction({
              action: documentUpdateActionType,
              onError,
              onSuccess,
              payload: {
                body: {
                  properties: formValues as SslProperties
                },
                nodeId: channels?.Metadata?.state?.id
              }
            })
          );
        }
      );
      const secondaryButton = secondaryAction(
        t(translationPath(lang.dialog.form.saveAndRefer)),
        ({ dispatch, channels, onClose, buttonState }) => {
          const formValues = channels?.Metadata?.state?.formValues;
          if (!formValues) {
            return;
          }

          const onSuccess = (
            response: NodeChildAssociationEntry<SslProperties>
          ) => {
            // set all tabs to saved to close modal
            for (const key in channels) {
              if (!channels.hasOwnProperty(key)) continue;
              channels[key].setIsSaved(true);
            }

            // Dialog data are empty since document is fresh new,
            // thus we have to get id from tab state
            const bearer = {
              id: channels?.Metadata?.state?.id
            } as GenericDocument;

            dispatch(documentViewAction__UpdateItem(response));
            dispatch(handoverDocument({ data: bearer }));
            onClose();
          };

          const onError = () => {
            buttonState.setIsPending(false);
          };

          buttonState.setIsPending(true);

          dispatch(
            callAsyncAction({
              action: documentUpdateActionType,
              onError,
              onSuccess,
              payload: {
                body: {
                  properties: formValues as SslProperties
                },
                nodeId: channels?.Metadata?.state?.id
              }
            })
          );
        }
      );

      const {
        showPrimaryAction,
        showSecondaryAction
      } = getDocumentSaveButtonsActions(dialogProps);

      return [
        ...(showPrimaryAction ? [primaryButton] : []),
        ...(showSecondaryAction ? [secondaryButton] : [])
      ];
    },
    tabs: [
      {
        content: MetaDataTab,
        label: t(translationPath(lang.dialog.tabs.metadata))
      },
      {
        content: ComponentsTab,
        label: t(translationPath(lang.dialog.tabs.components))
      },
      {
        content: VersionTab,
        label: t(translationPath(lang.dialog.tabs.version))
      },
      {
        content: ShipmentTab,
        filter: ({ dialogProps }) => dialogProps.hideShipmentsTab !== true,
        label: t(translationPath(lang.dialog.tabs.shipment))
      },
      {
        content: SettleTab,
        filter: ({ dialogProps }) => {
          const { state } =
            (dialogProps.data as GenericDocument)?.properties?.ssl || {};

          return SettleTab.filter(state);
        },
        label: t(translationPath(lang.dialog.tabs.settle))
      },
      {
        content: SaveAndDiscardTab,
        filter: ({ dialogProps }) => {
          const { state } =
            (dialogProps.data as GenericDocument)?.properties?.ssl || {};

          return SaveAndDiscardTab.filter(state);
        },
        label: t(translationPath(lang.dialog.tabs.saveAndDiscard))
      },
      {
        content: CommentsTab,
        label: t(translationPath(lang.dialog.tabs.notes))
      },
      {
        content: HistoryTab,
        label: t(translationPath(lang.dialog.tabs.history))
      }
    ],
    title: (props) => (
      <NamedTitle
        text={t(translationPath(lang.dialog.title.documentDetail))}
        {...props}
      />
    ),
    type: DialogType.TechnicalDataCarriesDetailsWithSaveButtons
  }
);
