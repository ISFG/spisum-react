import { Backspace, Description, Gesture } from "@material-ui/icons";
import { openDocumentWithSaveButtonsAction } from "core/api/document/_actions";
import { ControlsBarType, DataColumn } from "core/components/dataTable/_types";
import { dialogOpenAction } from "core/components/dialog/_actions";
import { DialogType } from "core/components/dialog/_types";
import DocumentView from "core/components/documentView";
import MenuLayout from "core/components/layout/MenuLayout";
import { GenericDocument, genericDocumentProxy } from "core/types";
import { DocumentType, SitePaths } from "enums";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootStateType } from "reducers";
import { classPath, translationPath } from "share/utils/getPath";
import { getRelativePath } from "share/utils/query";
import { traverseNodeType } from "share/utils/utils";
import { lang, t, withTranslation } from "translation/i18n";

const defaultColumn: DataColumn<GenericDocument> = {
  isDateTime: true,
  keys: [
    classPath(genericDocumentProxy.properties!.ssl!.forSignatureDate).path
  ],
  label: t(translationPath(lang.general.requestDate))
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
    keys: [classPath(genericDocumentProxy.properties!.ssl!.currentOwner).path],
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
  const relativePath = useSelector((state: RootStateType) =>
    getRelativePath(
      state.loginReducer.global.paths,
      activeGroup,
      SitePaths.Evidence,
      SitePaths.ForSignature
    )
  );

  const dispatchOpenDialog: (row: GenericDocument) => void = (row) => {
    dispatch(
      openDocumentWithSaveButtonsAction({
        canUploadComponents: false,
        data: {
          ...row,
          id: row.properties?.ssl?.takeRef || row.id,
          nodeType: traverseNodeType(row.nodeType),
          properties: {
            ...row.properties,
            ssl: {
              ...row.properties?.ssl,
              pid: row.properties?.ssl?.pidRef
            }
          }
        },
        hideManageShipmentsIcon: true,
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
                dialogProps: {
                  data: {
                    ...selected[0],
                    id: selected[0].properties?.ssl?.takeRef || selected[0].id,
                    nodeType: traverseNodeType(selected[0].nodeType)
                  }
                },
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
                dialogProps: {
                  data: {
                    ...selected[0],
                    id: selected[0].properties?.ssl?.takeRef || selected[0].id,
                    nodeType: traverseNodeType(selected[0].nodeType)
                  }
                },
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
        children={{
          relativePath
        }}
        columns={columns}
        controls={controls}
        customTitle={t(translationPath(lang.table.documentsForSignature))}
        defaultSortAsc={true}
        defaultSortColumn={defaultColumn}
        handleDoubleClick={dispatchOpenDialog}
      />
    </MenuLayout>
  );
};

export default withTranslation()(Component);
