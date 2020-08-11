import {
  CreateNewFolder,
  Description,
  Mail,
  Send,
  Storage,
  Whatshot,
  WorkOff
} from "@material-ui/icons";
import { openDocumentWithSaveButtonsAction } from "core/api/document/_actions";
import { Node, SslProperties } from "core/api/models";
import { ControlsBarType, DataColumn } from "core/components/dataTable/_types";
import { dialogOpenAction } from "core/components/dialog/_actions";
import { DialogType } from "core/components/dialog/_types";
import DocumentView from "core/components/documentView";
import MenuLayout from "core/components/layout/MenuLayout";
import { SessionType } from "core/features/login/_types";
import { GenericDocument, genericDocumentProxy } from "core/types";
import {
  DocumentType,
  SenderType,
  SitePaths,
  SpisumNamesWithoutPrefix,
  SpisumNodeTypes,
  SubmitToRepositoryDialog
} from "enums";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootStateType } from "reducers";
import { handoverDocument } from "share/components/dialog/documentHandoverDialog/_actions";
import { lostDestroyedDialogOpen } from "share/components/dialog/lostDestroyedDialog/_actions";
import { submitToRepositoryDialogOpen } from "share/components/dialog/submitToRepository/_actions";
import {
  classPath,
  lastPathMember,
  translationPath
} from "share/utils/getPath";
import { getRelativePath } from "share/utils/query";
import { isUserInLeadership } from "share/utils/user";
import { isEmptyString } from "share/utils/utils";
import { validateItems } from "share/utils/validation";
import { lang, t, withTranslation } from "translation/i18n";
import * as yup from "yup";

const defaultColumn: DataColumn<GenericDocument> = {
  getValue: (x) =>
    x?.properties?.ssl?.senderType === "own"
      ? x?.createdAt
      : x?.properties?.ssl?.deliveryDate,
  isDateTime: true,
  keys: [
    classPath(genericDocumentProxy.properties!.ssl!.deliveryDate).path,
    classPath(genericDocumentProxy.createdAt).path
  ],
  label: t(translationPath(lang.general.dateOfEvidence))
};

const getColumns = (session: SessionType): DataColumn<GenericDocument>[] => {
  const columns: DataColumn<GenericDocument>[] = [
    {
      keys: [classPath(genericDocumentProxy.properties!.ssl!.pid).path],
      label: t(translationPath(lang.general.identifier))
    },
    {
      keys: [classPath(genericDocumentProxy.properties!.ssl!.ssid).path],
      label: t(translationPath(lang.general.referenceNumber))
    },
    {
      keys: [classPath(genericDocumentProxy.properties!.ssl!.subject).path],
      label: t(translationPath(lang.general.subject))
    },
    {
      getValue: (x) =>
        x?.properties?.ssl?.senderType === SenderType.Legal
          ? x?.properties?.ssl?.sender_orgName
          : x?.properties?.ssl?.sender_name,
      keys: [
        classPath(genericDocumentProxy.properties!.ssl!.sender_orgName).path,
        classPath(genericDocumentProxy.properties!.ssl!.sender_name).path
      ],
      label: t(translationPath(lang.general.sender))
    },
    defaultColumn,
    {
      keys: [classPath(genericDocumentProxy.properties!.ssl!.filePlan).path],
      label: t(translationPath(lang.general.filePlan))
    },
    {
      keys: [classPath(genericDocumentProxy.properties!.ssl!.fileMark).path],
      label: t(translationPath(lang.general.fileMark))
    },
    {
      keys: [
        classPath(genericDocumentProxy.properties!.ssl!.retentionMode).path
      ],
      label: t(translationPath(lang.general.retentionMode))
    },
    {
      isDateTime: true,
      keys: [classPath(genericDocumentProxy.properties!.ssl!.settleDate).path],
      label: t(translationPath(lang.general.settleDate))
    }
  ];

  if (isUserInLeadership(session)) {
    columns.push({
      keys: [
        classPath(genericDocumentProxy.properties!.cm!.owner?.displayName).path
      ],
      label: t(translationPath(lang.general.owner))
    });
  }

  return columns;
};

const Component = () => {
  const dispatch = useDispatch();
  const session = useSelector(
    (state: RootStateType) => state.loginReducer.session
  );
  const relativePath = useSelector((state: RootStateType) =>
    getRelativePath(
      state.loginReducer.global.paths,
      state.loginReducer.session.activeGroup,
      SitePaths.Evidence,
      SitePaths.Documents,
      SitePaths.Processed
    )
  );

  const toRegistryValidation = (items: Node<SslProperties>[]) =>
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
        .required(t(translationPath(lang._validations.requiredSubject))),
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
      ...(items.filter((x) => x?.properties?.ssl?.form === DocumentType.Analog)
        .length === items.length && {
        [classPath(genericDocumentProxy.properties!.ssl!.listCount)
          .path]: yup
          .string()
          .required(t(translationPath(lang._validations.requiredListCount))),
        [classPath(genericDocumentProxy.properties!.ssl!.attachmentsCount)
          .path]: yup
          .string()
          .required(
            t(translationPath(lang._validations.requiredAttachmentsCount))
          )
      }),
      ...(items.filter((x) => x?.properties?.ssl?.form === DocumentType.Digital)
        .length === items.length && {
        [classPath(genericDocumentProxy.properties!.ssl!.associationCount)
          .path]: yup
          .string()
          .required(
            t(translationPath(lang._validations.requiredAttachmentsCount))
          )
      }),
      [classPath(genericDocumentProxy.properties!.cm!.owner!.id)
        .path]: yup
        .string()
        .required(t(translationPath(lang._validations.requiredOwner))),
      [classPath(genericDocumentProxy.properties!.ssl!.fileMark)
        .path]: yup
        .string()
        .required(t(translationPath(lang._validations.requiredFileMark))),
      [classPath(genericDocumentProxy.properties!.ssl!.filePlan)
        .path]: yup
        .string()
        .required(t(translationPath(lang._validations.requiredFilePlan))),
      [classPath(genericDocumentProxy.properties!.ssl!.retentionMode)
        .path]: yup
        .string()
        .required(t(translationPath(lang._validations.requiredRetentionMode))),
      [classPath(genericDocumentProxy.properties!.ssl!.form)
        .path]: yup
        .string()
        .required(t(translationPath(lang._validations.requiredFormDocument))),
      [classPath(genericDocumentProxy.properties!.ssl!.form)
        .path]: yup
        .string()
        .required(t(translationPath(lang._validations.requiredFormDocument))),
      [classPath(genericDocumentProxy.properties!.ssl!.settleMethod)
        .path]: yup
        .string()
        .required(t(translationPath(lang._validations.requiredSettleMethod)))
    });

  const dispatchOpenDialog: (row: GenericDocument) => void = (row) => {
    dispatch(
      openDocumentWithSaveButtonsAction({
        canUploadComponents: false,
        data: row,
        isReadonly: true
      })
    );
  };

  const controls: ControlsBarType<GenericDocument> = {
    multi: {
      items: [
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
          filter: (x) => x.isFavorite === true,
          icon: <StarBorderOutlined />,
          title: t(translationPath(lang.general.bookmarkRemove))
        },
        */
        {
          action: (selected: GenericDocument[]) => {
            dispatch(
              submitToRepositoryDialogOpen({
                data: {
                  entityType: SubmitToRepositoryDialog.Documents,
                  selected
                }
              })
            );
          },
          icon: <Storage />,
          title: t(translationPath(lang.general.toRegistry)),
          validation: toRegistryValidation
        }
      ]
    },
    single: {
      items: [
        {
          action: (selected: GenericDocument[]) =>
            dispatchOpenDialog(selected[0]),
          icon: <Description />,
          title: t(translationPath(lang.general.showDetails))
        },
        {
          action: (selected: GenericDocument[]) => {
            dispatch(
              dialogOpenAction({
                dialogProps: { data: selected[0] },
                dialogType: DialogType.CreateNewDocumentFile
              })
            );
          },
          icon: <CreateNewFolder />,
          title: t(translationPath(lang.general.pasteToFile))
        },
        {
          action: (selected: GenericDocument[]) => {
            dispatch(handoverDocument({ data: selected[0] }));
          },
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
          filter: (x) => x.isFavorite === true,
          icon: <StarBorderOutlined />,
          title: t(translationPath(lang.general.bookmarkRemove))
        },
        */
        {
          action: (selected: GenericDocument[]) => {
            dispatch(
              dialogOpenAction({
                dialogProps: { data: selected[0] },
                dialogType: DialogType.SendShipment
              })
            );
          },
          icon: <Mail />,
          title: t(translationPath(lang.general.manageShipments))
        },
        {
          action: (selected: GenericDocument[]) => {
            dispatch(
              dialogOpenAction({
                dialogProps: { data: selected[0] },
                dialogType: DialogType.CancelProcessing
              })
            );
          },
          icon: <WorkOff />,
          title: t(translationPath(lang.general.cancelProcessing))
        },
        {
          action: (selected: GenericDocument[]) => {
            dispatch(
              submitToRepositoryDialogOpen({
                data: {
                  entityType: SubmitToRepositoryDialog.Documents,
                  selected
                }
              })
            );
          },
          icon: <Storage />,
          title: t(translationPath(lang.general.toRegistry)),
          validation: toRegistryValidation
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
          action: (selected: GenericDocument[]) => {
            dispatch(lostDestroyedDialogOpen({ data: selected[0] }));
          },
          filter: (x) => x.properties?.ssl?.form === DocumentType.Analog,
          icon: <Whatshot />,
          title: t(translationPath(lang.general.damaged))
        }
      ]
    }
  };

  return (
    <MenuLayout>
      <DocumentView
        children={{
          include: [SpisumNamesWithoutPrefix.IsFavorite],
          relativePath,
          where: `(nodeType='${SpisumNodeTypes.Document}')`
        }}
        columns={getColumns(session)}
        controls={controls}
        customTitle={t(translationPath(lang.table.processedDocuments))}
        defaultSortAsc={true}
        defaultSortColumn={defaultColumn}
        handleDoubleClick={dispatchOpenDialog}
      />
    </MenuLayout>
  );
};

export default withTranslation()(Component);
