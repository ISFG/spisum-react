import {
  Delete,
  Description,
  Lock,
  Mail,
  Send,
  Star,
  StarBorderOutlined,
  Whatshot
} from "@material-ui/icons";
import { ControlsBarType, DataColumn } from "core/components/dataTable/_types";
import { dialogOpenAction } from "core/components/dialog/_actions";
import { DialogType } from "core/components/dialog/_types";
import DocumentView from "core/components/documentView";
import MenuLayout from "core/components/layout/MenuLayout";
import { SessionType } from "core/features/login/_types";
import {
  GenericDocument,
  genericDocumentProxy,
  ShipmentDocument
} from "core/types";
import {
  DocumentType,
  SenderType,
  SitePaths,
  SpisumNamesWithoutPrefix,
  SpisumNodeTypes
} from "enums";
import { changeDocumentIsFavoriteAction } from "modules/evidence/_actions";
import { ChangeDocumentIsFavoriteActionType } from "modules/evidence/_types";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootStateType } from "reducers";
import { closeFileDialogOpen } from "share/components/dialog/closeFileDialog/_actions";
import { handoverDocument } from "share/components/dialog/documentHandoverDialog/_actions";
import { evidenceCancelDialogOpen } from "share/components/dialog/evidenceCancelDialog/_actions";
import { lostDestroyedDialogOpen } from "share/components/dialog/lostDestroyedDialog/_actions";
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
import { openFileDetailsAction } from "../../../../../core/components/dialog/tabs/tableOfContents/_actions";

const defaultColumn: DataColumn<GenericDocument> = {
  isDate: true,
  keys: [classPath(genericDocumentProxy.properties!.ssl!.settleToDate).path],
  label: t(translationPath(lang.general.settleToDate))
};

const getColumns = (session: SessionType): DataColumn<GenericDocument>[] => {
  const columns: DataColumn<GenericDocument>[] = [
    {
      keys: [classPath(genericDocumentProxy.properties!.ssl!.pid).path],
      label: t(translationPath(lang.general.identifier))
    },
    {
      keys: [
        classPath(genericDocumentProxy.properties!.ssl!.fileIdentificator).path
      ],
      label: t(translationPath(lang.general.fileIdentificator))
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
    {
      isDate: true,
      keys: [classPath(genericDocumentProxy.properties!.ssl!.createdDate).path],
      label: t(translationPath(lang.general.dateOfEvidence))
    },
    defaultColumn,
    {
      keys: [
        classPath(genericDocumentProxy.properties!.ssl!.associationCount).path
      ],
      label: t(translationPath(lang.general.documentsCount))
    },
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
                nodeType: SpisumNodeTypes.File
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
                nodeType: SpisumNodeTypes.File
              })
            );
          },
          filter: (x) => x.isFavorite === true,
          icon: <StarBorderOutlined />,
          title: t(translationPath(lang.general.bookmarkRemove))
        }
        */
      ]
    },
    single: {
      items: [
        {
          action: (selected: GenericDocument[]) => {
            dispatch(openFileDetailsAction(selected[0]));
          },
          icon: <Description />,
          title: t(translationPath(lang.general.showDetails))
        },
        {
          action: (selected: GenericDocument[]) => {
            dispatch(handoverDocument(selected[0]));
          },
          icon: <Send />,
          title: t(translationPath(lang.general.handOVer))
        },
        {
          action: (selected: GenericDocument[]) => {
            dispatch(
              changeDocumentIsFavoriteAction({
                actionType: ChangeDocumentIsFavoriteActionType.Add,
                items: selected,
                nodeType: SpisumNodeTypes.File
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
                nodeType: SpisumNodeTypes.File
              })
            );
          },
          filter: (x) => x.isFavorite === true,
          icon: <StarBorderOutlined />,
          title: t(translationPath(lang.general.bookmarkRemove))
        },
        {
          action: (selected: GenericDocument[]) => {
            dispatch(
              dialogOpenAction({
                dialogData: selected[0],
                dialogType: DialogType.SendShipment
              })
            );
          },
          icon: <Mail />,
          title: t(translationPath(lang.general.manageShipments))
        },
        {
          action: (selected: GenericDocument[]) => {
            dispatch(closeFileDialogOpen(selected[0]));
          },
          icon: <Lock />,
          title: t(translationPath(lang.general.lock)),
          validation: (items) =>
            validateItems(items, {
              [classPath(genericDocumentProxy.properties!.ssl!.pid)
                .path]: yup
                .string()
                .required(t(translationPath(lang._validations.requiredPid))),
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
          title: t(translationPath(lang.general.printEnvelopes))
        },
        {
          action: () => {},
          icon: <Print />,
          title: t(translationPath(lang.general.printInventoryDocuments))
        },
        */
        {
          action: (selected: GenericDocument[]) => {
            dispatch(lostDestroyedDialogOpen(selected[0]));
          },
          filter: (x) =>
            x.properties?.ssl?.form === DocumentType.Analog ||
            x.properties?.ssl?.form === DocumentType.Hybrid,
          icon: <Whatshot />,
          title: t(translationPath(lang.general.damaged))
        },
        {
          action: (selected: GenericDocument[]) => {
            dispatch(evidenceCancelDialogOpen(selected[0]));
          },
          filter: (x) => !x.properties?.ssl?.associationCount,
          icon: <Delete />,
          title: t(translationPath(lang.general.cancel))
        }
      ]
    }
  };

  const handleDoubleClick = (row: ShipmentDocument) => {
    dispatch(openFileDetailsAction(row));
  };

  const relativePath = useSelector((state: RootStateType) =>
    getRelativePath(
      state.loginReducer.global.paths,
      state.loginReducer.session.activeGroup,
      SitePaths.Evidence,
      SitePaths.Files,
      SitePaths.Open
    )
  );

  return (
    <MenuLayout>
      <DocumentView
        children={{
          include: [SpisumNamesWithoutPrefix.IsFavorite],
          relativePath,
          where: `(nodeType='${SpisumNodeTypes.File}')`
        }}
        columns={getColumns(session)}
        controls={controls}
        customTitle={t(translationPath(lang.table.openFiles))}
        defaultSortAsc={true}
        defaultSortColumn={defaultColumn}
        handleDoubleClick={handleDoubleClick}
      />
    </MenuLayout>
  );
};

export default withTranslation()(Component);
