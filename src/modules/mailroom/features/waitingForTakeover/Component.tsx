import { CancelScheduleSend, Description, Send } from "@material-ui/icons";
import { openDocumentReadonlyDetailsAction } from "core/api/document/_actions";
import { ControlsBarType, DataColumn } from "core/components/dataTable/_types";
import DocumentView from "core/components/documentView";
import MenuLayout from "core/components/layout/MenuLayout";
import { GenericDocument, genericDocumentProxy } from "core/types";
import { SenderType, SitePaths, SpisumGroups, SpisumNodeTypes } from "enums";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootStateType } from "reducers";
import { handoverDocument } from "share/components/dialog/documentHandoverDialog/_actions";
import { dialogOpenHandoverBack } from "share/components/dialog/handoverBackDialog/_actions";
import { classPath, translationPath } from "share/utils/getPath";
import { getRelativePath } from "share/utils/query";
import { validateItems } from "share/utils/validation";
import { lang, t, withTranslation } from "translation/i18n";
import * as yup from "yup";

const defaultColumn: DataColumn<GenericDocument> = {
  isDate: true,
  keys: [classPath(genericDocumentProxy.properties!.ssl!.deliveryDate).path],
  label: t(translationPath(lang.general.deliveryDate))
};

export const columns: DataColumn<GenericDocument>[] = [
  {
    keys: [classPath(genericDocumentProxy.properties!.ssl!.pidRef).path],
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
    getValue: (x) =>
      x.properties?.ssl?.nextOwner === "-group-"
        ? x.properties?.ssl?.nextGroup
        : x.properties?.ssl?.nextOwner,
    keys: [classPath(genericDocumentProxy.properties!.ssl!.nextOwner).path],
    label: t(translationPath(lang.general.nextOwner))
  }
];

const Component = () => {
  const dispatch = useDispatch();
  const relativePath = useSelector((state: RootStateType) =>
    getRelativePath(
      state.loginReducer.global.paths,
      SpisumGroups.Mailroom,
      SitePaths.Evidence,
      SitePaths.WaitingForTakeOver
    )
  );
  const dispatchOpenDialog: (row: GenericDocument) => void = (row) => {
    dispatch(
      openDocumentReadonlyDetailsAction({
        ...row,
        hideShipmentsTab: true,
        id: row.properties?.ssl?.waitingRef || row.id
      })
    );
  };

  const controls: ControlsBarType<GenericDocument> = {
    single: {
      items: [
        {
          action: (selected: GenericDocument[]) => {
            dispatchOpenDialog({
              ...selected[0],
              id: selected[0].properties?.ssl?.waitingRef || selected[0].id
            });
          },
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
          relativePath,
          where: `(nodeType='${SpisumNodeTypes.TakeDocumentForProcessing}')`
        }}
        columns={columns}
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
