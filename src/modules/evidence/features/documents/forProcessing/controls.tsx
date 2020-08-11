import { green } from "@material-ui/core/colors";
import {
  CreateNewFolder,
  Delete,
  Description,
  Gesture,
  Mail,
  NextWeek,
  Send,
  Whatshot
} from "@material-ui/icons";
import { ControlsBarType } from "core/components/dataTable/_types";
import { File } from "core/entities";
import { fetchDocumentComponents } from "core/helpers/api/DocumentComponentFetcher";
import { GenericDocument, genericDocumentProxy } from "core/types";
import { DocumentType, SenderType } from "enums";
import React from "react";
import {
  classPath,
  lastPathMember,
  translationPath
} from "share/utils/getPath";
import { isEmptyString } from "share/utils/utils";
import { validateItems } from "share/utils/validation";
import { lang, t } from "translation/i18n";
import * as yup from "yup";
import { ControlsType } from "./_types";

export const getControls: ControlsType = async ({
  handleOpenDescription,
  handleCreateNewDocumentFile,
  handleHandoverDocument,
  handleForSignatureDocument,
  handleSendShipment,
  handleOpenSettleDocumentDialog,
  handleOpenLostDestroyedDocumentDialog,
  handleOpenCancelDialog,
  userId
}): Promise<ControlsBarType<GenericDocument>> => {
  return {
    /*
   multi: {
      items: [
        {
          action: (selected: GenericDocument[]) => {
            dispatch(
              changeDocumentIsFavoriteAction({
                actionType: ChangeDocumentIsFavoriteActionType.Add,
                items: selected,
                nodeType: SpisumNodeTypes.Document
              })
            );
          },
          filter: (x) => !x.isFavorite,
          icon: <Star />,
          title: t(translationPath(lang.general.bookmark))
        },
        {
          action: (selected: GenericDocument[]) => {
            dispatch(
              changeDocumentIsFavoriteAction({
                actionType: ChangeDocumentIsFavoriteActionType.Remove,
                items: selected,
                nodeType: SpisumNodeTypes.Document
              })
            );
          },
          filter: (x) => !!x.isFavorite,
          icon: <StarBorderOutlined />,
          title: t(translationPath(lang.general.bookmarkRemove))
        }
      ]
    },
    */
    single: {
      items: [
        {
          action: handleOpenDescription,
          icon: <Description />,
          title: t(translationPath(lang.general.showDetails))
        },
        {
          action: handleCreateNewDocumentFile,
          icon: <CreateNewFolder />,
          title: t(translationPath(lang.general.pasteToFile))
        },
        {
          action: handleHandoverDocument,
          icon: <Send />,
          title: t(translationPath(lang.general.handOVer))
        },
        /*
        {
          action: (selected: GenericDocument[]) => {
            dispatch(
              changeDocumentIsFavoriteAction({
                actionType: ChangeDocumentIsFavoriteActionType.Add,
                items: selected,
                nodeType: SpisumNodeTypes.Document
              })
            );
          },
          filter: (x) => !x.isFavorite,
          icon: <Star />,
          title: t(translationPath(lang.general.bookmark))
        },
        {
          action: (selected: GenericDocument[]) => {
            dispatch(
              changeDocumentIsFavoriteAction({
                actionType: ChangeDocumentIsFavoriteActionType.Remove,
                items: selected,
                nodeType: SpisumNodeTypes.Document
              })
            );
          },
          filter: (x) => !!x.isFavorite,
          icon: <StarBorderOutlined />,
          title: t(translationPath(lang.general.bookmarkRemove))
        },
        */
        {
          action: handleForSignatureDocument,
          filter: (x) =>
            x?.properties?.ssl?.form === DocumentType.Digital &&
            x?.properties?.cm?.owner?.id === userId &&
            x?.properties?.ssl?.senderType === SenderType.Own,
          icon: <Gesture />,
          title: t(translationPath(lang.general.toSign)),
          validation: async (items: GenericDocument[]) => {
            const components = await fetchDocumentComponents(items[0]?.id);

            let isValid = true;
            components?.entities?.forEach((x: File) => {
              if (x.fileIsInOutputFormat === "no") {
                isValid = false;
                return;
              }
            });

            return !isValid
              ? t(translationPath(lang._validations.componentsNotInOutputMode))
              : null;
          }
        },
        /* V2
        {
          action: () => {},
          icon: <HowToReg />,
          title: t(translationPath(lang.general.toApprove))
        },
        */
        {
          action: handleSendShipment,
          icon: <Mail />,
          title: t(translationPath(lang.general.manageShipments))
        },
        {
          action: handleOpenSettleDocumentDialog,
          icon: <NextWeek style={{ color: green[500] }} />,
          title: t(translationPath(lang.general.settle)),
          validation: (items: GenericDocument[]) =>
            validateItems(items, {
              [classPath(genericDocumentProxy.properties!.ssl!.pid)
                .path]: yup
                .string()
                .required(t(translationPath(lang._validations.requiredPid))),
              [classPath(genericDocumentProxy.properties!.ssl!.ssid)
                .path]: yup
                .string()
                .required(t(translationPath(lang._validations.requiredSsid))),
              [classPath(genericDocumentProxy.properties!.ssl!.subject)
                .path]: yup
                .string()
                .required(
                  t(translationPath(lang._validations.requiredSubject))
                ),
              [classPath(genericDocumentProxy.properties!.ssl!.sender_name)
                .path]: yup
                .string()
                .test(
                  "oneOfRequired",
                  t(translationPath(lang._validations.requiredSender)),
                  function () {
                    return (
                      !isEmptyString(
                        this.parent[
                          lastPathMember(
                            genericDocumentProxy.properties!.ssl!.sender_orgName
                          ).path
                        ]
                      ) ||
                      !isEmptyString(
                        this.parent[
                          lastPathMember(
                            genericDocumentProxy.properties!.ssl!.sender_contact
                          ).path
                        ]
                      ) ||
                      !isEmptyString(
                        this.parent[
                          lastPathMember(
                            genericDocumentProxy.properties!.ssl!.sender_name
                          ).path
                        ]
                      )
                    );
                  }
                ),
              ...(items.filter(
                (x) => x?.properties?.ssl?.form === DocumentType.Analog
              ).length === items.length && {
                [classPath(genericDocumentProxy.properties!.ssl!.listCount)
                  .path]: yup
                  .string()
                  .required(
                    t(translationPath(lang._validations.requiredListCount))
                  ),
                [classPath(
                  genericDocumentProxy.properties!.ssl!.attachmentsCount
                ).path]: yup
                  .string()
                  .required(
                    t(
                      translationPath(
                        lang._validations.requiredAttachmentsCount
                      )
                    )
                  )
              }),
              ...(items.filter(
                (x) => x?.properties?.ssl?.form === DocumentType.Digital
              ).length === items.length && {
                [classPath(
                  genericDocumentProxy.properties!.ssl!.associationCount
                ).path]: yup
                  .string()
                  .required(
                    t(
                      translationPath(
                        lang._validations.requiredAttachmentsCount
                      )
                    )
                  )
              }),
              [classPath(genericDocumentProxy.properties!.cm!.owner!.id)
                .path]: yup
                .string()
                .required(t(translationPath(lang._validations.requiredOwner))),
              [classPath(genericDocumentProxy.properties!.ssl!.fileMark)
                .path]: yup
                .string()
                .required(
                  t(translationPath(lang._validations.requiredFileMark))
                ),
              [classPath(genericDocumentProxy.properties!.ssl!.filePlan)
                .path]: yup
                .string()
                .required(
                  t(translationPath(lang._validations.requiredFilePlan))
                ),
              [classPath(genericDocumentProxy.properties!.ssl!.retentionMode)
                .path]: yup
                .string()
                .required(
                  t(translationPath(lang._validations.requiredRetentionMode))
                ),
              [classPath(genericDocumentProxy.properties!.ssl!.form)
                .path]: yup
                .string()
                .required(
                  t(translationPath(lang._validations.requiredFormDocument))
                )
            })
        }
      ],
      more: [
        /* V2
        {
          action: () => {},
          icon: <Print />,
          title: t(translationPath(lang.general.print))
        },
        */
        {
          action: handleOpenLostDestroyedDocumentDialog,
          filter: (x) => x.properties?.ssl?.form === DocumentType.Analog,
          icon: <Whatshot />,
          title: t(translationPath(lang.general.damaged))
        },
        {
          action: handleOpenCancelDialog,
          filter: (x) => x?.properties?.ssl?.senderType === "own",
          icon: <Delete />,
          title: t(translationPath(lang.general.cancel))
        }
      ]
    }
  };
};
