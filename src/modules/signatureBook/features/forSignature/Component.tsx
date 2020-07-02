import { Backspace, Description, Gesture } from "@material-ui/icons";
import { openDocumentWithSaveButtonsAction } from "core/api/document/_actions";
import { ControlsBarType, DataColumn } from "core/components/dataTable/_types";
import DocumentView from "core/components/documentView";
import MenuLayout from "core/components/layout/MenuLayout";
import { GenericDocument, genericDocumentProxy } from "core/types";
import { DocumentType, SitePaths, SpisumNames, SpisumNodeTypes } from "enums";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootStateType } from "reducers";
import { classPath, translationPath } from "share/utils/getPath";
import { alfrescoQuery, getQueryPath } from "share/utils/query";
import { lang, t, withTranslation } from "translation/i18n";
import { dialogOpenAction } from "../../../../core/components/dialog/_actions";
import { DialogType } from "../../../../core/components/dialog/_types";

const defaultColumn: DataColumn<GenericDocument> = {
  isDate: true,
  keys: [
    classPath(genericDocumentProxy.properties!.ssl!.forSignatureDate).path
  ],
  label: t(translationPath(lang.general.requestDate))
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
      x.properties?.ssl?.form === DocumentType.Analog
        ? x.properties!.ssl!.attachmentsCount
        : x.properties!.ssl!.associationCount,
    keys: [
      classPath(genericDocumentProxy.properties!.ssl!.attachmentsCount).path,
      classPath(genericDocumentProxy.properties!.ssl!.associationCount).path
    ],
    label: t(translationPath(lang.general.attachmentsCount))
  },
  {
    keys: [
      classPath(genericDocumentProxy.properties!.cm!.owner!.displayName).path
    ],
    label: t(translationPath(lang.general.owner))
  },
  defaultColumn
];

const Component = () => {
  const dispatch = useDispatch();
  const session = useSelector(
    (state: RootStateType) => state.loginReducer.session
  );
  const activeGroup = session.activeGroup;
  const pathDocuments = useSelector(
    (state: RootStateType) =>
      getQueryPath(
        state.loginReducer.global.paths,
        state.loginReducer.session.activeGroup,
        SitePaths.Evidence,
        SitePaths.Documents,
        SitePaths.ForProcessing,
        SitePaths.ForSignature
      )?.path || ""
  );
  const pathFileDocuments = useSelector(
    (state: RootStateType) =>
      getQueryPath(
        state.loginReducer.global.paths,
        state.loginReducer.session.activeGroup,
        SitePaths.Evidence,
        SitePaths.Files,
        SitePaths.Documents,
        SitePaths.ForProcessing,
        SitePaths.ForSignature
      )?.path || ""
  );

  const dispatchOpenDialog: (row: GenericDocument) => void = (row) => {
    dispatch(
      openDocumentWithSaveButtonsAction({
        ...row,
        canUploadComponents: false,
        isReadonly: true
      })
    );
  };

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
                dialogType: DialogType.FromSignature
              })
            );
          },
          icon: <Gesture />,
          title: t(translationPath(lang.table.forSignature))
        },
        {
          action: (selected) => {
            dispatch(
              dialogOpenAction({
                dialogData: selected[0],
                dialogType: DialogType.ReturnForRework
              })
            );
          },
          icon: <Backspace />,
          title: t(translationPath(lang.general.returnForRework))
        }
      ]
    }
  };

  return (
    <MenuLayout>
      <DocumentView
        columns={columns}
        controls={controls}
        customTitle={t(translationPath(lang.table.documentsForSignature))}
        defaultSortAsc={true}
        defaultSortColumn={defaultColumn}
        handleDoubleClick={dispatchOpenDialog}
        search={{
          query: {
            query: alfrescoQuery({
              paths: [pathDocuments, pathFileDocuments],
              type: [SpisumNodeTypes.Document],
              where: `${SpisumNames.ForSignatureGroup}:'${activeGroup}'`
            })
          }
        }}
      />
    </MenuLayout>
  );
};

export default withTranslation()(Component);
