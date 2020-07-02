import {
  AllInbox,
  AssignmentInd,
  Description,
  SwapHoriz
} from "@material-ui/icons";
import { openDocumentWithSaveButtonsAction } from "core/api/document/_actions";
import { ControlsBarType, DataColumn } from "core/components/dataTable/_types";
import { dialogOpenAction } from "core/components/dialog/_actions";
import { DialogType } from "core/components/dialog/_types";
import DocumentView from "core/components/documentView";
import MenuLayout from "core/components/layout/MenuLayout";
import { GenericDocument, genericDocumentProxy } from "core/types";
import { SenderType, SitePaths, SpisumNodeTypes } from "enums";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootStateType } from "reducers";
import { classPath, translationPath } from "share/utils/getPath";
import { getRelativePath } from "share/utils/query";
import { lang, t, withTranslation } from "translation/i18n";

const defaultColumn: DataColumn<GenericDocument> = {
  isDate: true,
  keys: [classPath(genericDocumentProxy.properties!.ssl!.shreddingYear).path],
  label: t(translationPath(lang.general.yearOfShredding))
};

export const columns: DataColumn<GenericDocument>[] = [
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
  {
    keys: [classPath(genericDocumentProxy.properties!.ssl!.filePlan).path],
    label: t(translationPath(lang.general.filePlan))
  },
  {
    keys: [classPath(genericDocumentProxy.properties!.ssl!.fileMark).path],
    label: t(translationPath(lang.general.fileMark))
  },
  {
    keys: [classPath(genericDocumentProxy.properties!.ssl!.retentionMode).path],
    label: t(translationPath(lang.general.retentionMode))
  },
  {
    keys: [classPath(genericDocumentProxy.properties!.ssl!.location).path],
    label: t(translationPath(lang.general.storageLocation))
  },
  defaultColumn
];

const Component = () => {
  const dispatch = useDispatch();
  const relativePath = useSelector((state: RootStateType) =>
    getRelativePath(
      state.loginReducer.global.paths,
      null,
      SitePaths.Repository,
      SitePaths.Documents,
      SitePaths.Stored
    )
  );

  const dispatchOpenDialog: (row: GenericDocument) => void = (row) =>
    dispatch(
      openDocumentWithSaveButtonsAction({
        ...row,
        canUploadComponents: false,
        isReadonly: true
      })
    );

  const controls: ControlsBarType<GenericDocument> = {
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
                dialogData: selected[0],
                dialogType: DialogType.ChangeFileMark
              })
            );
          },
          icon: <SwapHoriz />,
          title: t(translationPath(lang.general.changeFileMark))
        },
        {
          action: (selected: GenericDocument[]) => {
            dispatch(
              dialogOpenAction({
                dialogData: selected[0],
                dialogType: DialogType.ChangeLocation
              })
            );
          },
          icon: <AllInbox />,
          title: t(translationPath(lang.general.editStorageLocation))
        },
        {
          action: (selected: GenericDocument[]) => {
            dispatch(
              dialogOpenAction({
                dialogData: selected[0],
                dialogType: DialogType.Borrow
              })
            );
          },
          icon: <AssignmentInd />,
          title: t(translationPath(lang.general.borrow))
        }
      ]
    }
  };

  return (
    <MenuLayout>
      <DocumentView
        children={{
          relativePath,
          where: `(nodeType='${SpisumNodeTypes.Document}')`
        }}
        columns={columns}
        controls={controls}
        customTitle={t(translationPath(lang.menu.items.storedDocuments))}
        defaultSortAsc={true}
        defaultSortColumn={defaultColumn}
        handleDoubleClick={dispatchOpenDialog}
      />
    </MenuLayout>
  );
};

export default withTranslation()(Component);