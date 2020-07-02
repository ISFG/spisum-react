import { CancelScheduleSend, Description, Send } from "@material-ui/icons";
import { openDocumentWithSaveButtonsAction } from "core/api/document/_actions";
import { ControlsBarType, DataColumn } from "core/components/dataTable/_types";
import { openFileDetailsAction } from "core/components/dialog/tabs/tableOfContents/_actions";
import DocumentView from "core/components/documentView";
import MenuLayout from "core/components/layout/MenuLayout";
import { SessionType } from "core/features/login/_types";
import { GenericDocument, genericDocumentProxy } from "core/types";
import { SenderType, SitePaths, SpisumNodeTypes } from "enums";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootStateType } from "reducers";
import { dialogOpenConceptDetails } from "share/components/dialog/conceptDetailsDialog/_actions";
import { handoverDocument } from "share/components/dialog/documentHandoverDialog/_actions";
import { dialogOpenHandoverBack } from "share/components/dialog/handoverBackDialog/_actions";
import { classPath, translationPath } from "share/utils/getPath";
import { getRelativePath } from "share/utils/query";
import { isUserInLeadership } from "share/utils/user";
import { validateItems } from "share/utils/validation";
import { lang, t, withTranslation } from "translation/i18n";
import * as yup from "yup";

const defaultColumn: DataColumn<GenericDocument> = {
  getValue: (x) =>
    x.nodeType === SpisumNodeTypes.File
      ? x?.properties?.ssl?.createdDate
      : x?.properties?.ssl?.senderType === "own"
      ? x?.createdAt
      : x?.properties?.ssl?.deliveryDate,
  isDate: true,
  keys: [
    classPath(genericDocumentProxy.properties!.ssl!.deliveryDate).path,
    classPath(genericDocumentProxy.createdAt).path,
    classPath(genericDocumentProxy.properties!.ssl!.createdDate).path
  ],
  label: t(translationPath(lang.general.dateOfEvidence))
};

const getColumns = (session: SessionType): DataColumn<GenericDocument>[] => {
  const columns: DataColumn<GenericDocument>[] = [
    {
      keys: [classPath(genericDocumentProxy.properties!.ssl!.pidRef).path],
      label: t(translationPath(lang.general.identifier))
    },
    {
      getValue: (item) =>
        item.nodeType === SpisumNodeTypes.TakeFileClosed ||
        item.nodeType === SpisumNodeTypes.TakeFileOpen
          ? item.properties?.ssl?.fileIdentificator
          : item.properties?.ssl?.ssid,
      keys: [
        classPath(genericDocumentProxy.properties!.ssl!.ssid).path,
        classPath(genericDocumentProxy.properties!.ssl!.fileIdentificator).path
      ],
      label: `${t(translationPath(lang.general.referenceNumber))}/${t(
        translationPath(lang.general.fileIdentificator)
      )}`
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
      getValue: (x) =>
        x.properties?.ssl?.nextOwner === "-group-"
          ? x.properties?.ssl?.nextGroup
          : x.properties?.ssl?.nextOwner,
      keys: [classPath(genericDocumentProxy.properties!.ssl!.nextOwner).path],
      label: t(translationPath(lang.general.nextOwner))
    }
  ];

  if (isUserInLeadership(session)) {
    columns.push({
      keys: [
        classPath(genericDocumentProxy.properties!.ssl!.currentOwner).path
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
  const activeGroup = session.activeGroup;
  const relativePath = useSelector((state: RootStateType) =>
    getRelativePath(
      state.loginReducer.global.paths,
      activeGroup,
      SitePaths.Evidence,
      SitePaths.WaitingForTakeOver
    )
  );

  const dispatchOpenDialog: (row: GenericDocument) => void = (row) => {
    if (
      row.nodeType === SpisumNodeTypes.TakeDocumentForProcessing ||
      row.nodeType === SpisumNodeTypes.TakeDocumentProcessed
    ) {
      dispatch(
        openDocumentWithSaveButtonsAction({
          ...row,
          canUploadComponents: false,
          id: row.properties?.ssl?.waitingRef || row.id,
          isReadonly: true
        })
      );
    } else if (
      row.nodeType === SpisumNodeTypes.TakeFileOpen ||
      row.nodeType === SpisumNodeTypes.TakeFileClosed
    ) {
      dispatch(
        openFileDetailsAction({
          ...row,
          id: row.properties?.ssl?.waitingRef || row.id,
          readonly: true
        })
      );
    } else if (row.nodeType === SpisumNodeTypes.TakeConcept) {
      dispatch(
        dialogOpenConceptDetails({
          ...row,
          id: row.properties?.ssl?.waitingRef || row.id,
          isReadonly: true
        })
      );
    }
  };

  const controls: ControlsBarType<GenericDocument> = {
    single: {
      items: [
        {
          action: (selected: GenericDocument[]) =>
            dispatchOpenDialog({
              ...selected[0],
              id: selected[0].properties?.ssl?.waitingRef || selected[0].id
            }),
          icon: <Description />,
          title: t(translationPath(lang.general.showDetails))
        },
        {
          action: (selected: GenericDocument[]) => {
            dispatch(
              dialogOpenHandoverBack({
                ...selected[0],
                id: selected[0].properties?.ssl?.waitingRef || selected[0].id
              })
            );
          },
          icon: <CancelScheduleSend />,
          title: t(translationPath(lang.general.giveBack)),
          validation: (items) =>
            validateItems(items, {
              [classPath(genericDocumentProxy.properties!.ssl!.nextGroup)
                .path]: yup
                .string()
                .required(
                  t(
                    translationPath(
                      lang._validations.nodeHandoverIsBeingCancelled
                    )
                  )
                )
            })
        },
        {
          action: (selected: GenericDocument[]) => {
            dispatch(
              handoverDocument({
                ...selected[0],
                id: selected[0].properties?.ssl?.waitingRef || selected[0].id,
                ...{ cancelDocumentOwner: true }
              })
            );
          },
          icon: <Send />,
          title: t(translationPath(lang.general.giveNext))
        }
      ]
    }
  };

  return (
    <MenuLayout>
      <DocumentView
        children={{
          relativePath
        }}
        columns={getColumns(session)}
        controls={controls}
        customTitle={t(translationPath(lang.menu.items.waitingForTakeover))}
        defaultSortAsc={true}
        defaultSortColumn={defaultColumn}
        handleDoubleClick={dispatchOpenDialog}
      />
    </MenuLayout>
  );
};

export default withTranslation()(Component);
