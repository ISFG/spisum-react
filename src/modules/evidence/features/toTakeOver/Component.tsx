import { Check, Close } from "@material-ui/icons";
import { callAsyncAction } from "core/action";
import { documentAcceptActionType } from "core/api/document/_actions";
import { ControlsBarType, DataColumn } from "core/components/dataTable/_types";
import { dialogOpenAction } from "core/components/dialog/_actions";
import { DialogType } from "core/components/dialog/_types";
import DocumentView from "core/components/documentView";
import { documentViewAction__Refresh } from "core/components/documentView/_actions";
import MenuLayout from "core/components/layout/MenuLayout";
import { SessionType } from "core/features/login/_types";
import { GenericDocument, genericDocumentProxy } from "core/types";
import { SenderType, SitePaths, SpisumNodeTypes } from "enums";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootStateType } from "reducers";
import { classPath, translationPath } from "share/utils/getPath";
import { getRelativePath } from "share/utils/query";
import { isUserInLeadership } from "share/utils/user";
import { traverseNodeType } from "share/utils/utils";
import { validateItems } from "share/utils/validation";
import { lang, t, withTranslation } from "translation/i18n";
import * as yup from "yup";

const defaultColumn: DataColumn<GenericDocument> = {
  getValue: (x) =>
    x.nodeType === SpisumNodeTypes.TakeFileClosed ||
    x.nodeType === SpisumNodeTypes.TakeFileOpen
      ? x?.properties?.ssl?.createdDate
      : x?.properties?.ssl?.senderType === "own"
      ? x?.createdAt
      : x?.properties?.ssl?.deliveryDate,
  isDateTime: true,
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
      keys: [
        classPath(genericDocumentProxy.properties!.ssl!.currentOwner).path
      ],
      label: t(translationPath(lang.general.passedFrom))
    }
  ];

  if (isUserInLeadership(session)) {
    columns.push({
      getValue: (x) =>
        x.properties?.ssl?.nextOwner === "-group-"
          ? x.properties?.ssl?.nextGroup
          : x.properties?.ssl?.nextOwner,
      keys: [classPath(genericDocumentProxy.properties!.ssl!.nextOwner).path],
      label: t(translationPath(lang.general.nextOwner))
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
      SitePaths.ToTakeOver
    )
  );
  const onSuccess = () => {
    dispatch(documentViewAction__Refresh(true));
  };

  const controls: ControlsBarType<GenericDocument> = {
    single: {
      items: [
        {
          action: (selected: GenericDocument[]) => {
            dispatch(
              callAsyncAction({
                action: documentAcceptActionType,
                onSuccess,
                payload: {
                  nodeId: selected[0].properties?.ssl?.takeRef,
                  nodeType: traverseNodeType(selected[0].nodeType)
                }
              })
            );
          },
          icon: <Check />,
          title: t(translationPath(lang.general.assume)),
          validation: (items) =>
            validateItems(items, {
              [classPath(genericDocumentProxy.properties!.ssl!.nextGroup)
                .path]: yup
                .string()
                .required(
                  t(
                    translationPath(
                      lang._validations.nodeHandoverIsBeingAccepted
                    )
                  )
                )
            })
        },
        {
          action: (selected: GenericDocument[]) => {
            dispatch(
              dialogOpenAction({
                dialogProps: {
                  data: {
                    ...selected[0],
                    id: selected[0].properties?.ssl?.takeRef || selected[0].id,
                    nodeType: traverseNodeType(selected[0].nodeType)
                  }
                },
                dialogType: DialogType.DeclineHandover
              })
            );
          },
          icon: <Close />,
          title: t(translationPath(lang.general.refuse)),
          validation: (items) =>
            validateItems(items, {
              [classPath(genericDocumentProxy.properties!.ssl!.nextGroup)
                .path]: yup
                .string()
                .required(
                  t(
                    translationPath(
                      lang._validations.nodeHandoverIsBeingRefused
                    )
                  )
                )
            })
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
        customTitle={t(translationPath(lang.menu.items.toTakeOver))}
        defaultSortAsc={true}
        defaultSortColumn={defaultColumn}
      />
    </MenuLayout>
  );
};

export default withTranslation()(Component);
