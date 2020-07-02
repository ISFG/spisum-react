import {
  AddBoxOutlined,
  Alarm,
  AlarmOff,
  Description,
  SwapHoriz
} from "@material-ui/icons";
import { openDocumentWithSaveButtonsAction } from "core/api/document/_actions";
import { ControlsBarType, DataColumn } from "core/components/dataTable/_types";
import { openFileDetailsAction } from "core/components/dialog/tabs/tableOfContents/_actions";
import { dialogOpenAction } from "core/components/dialog/_actions";
import { DialogType } from "core/components/dialog/_types";
import DocumentView from "core/components/documentView";
import MenuLayout from "core/components/layout/MenuLayout";
import { GenericDocument, genericDocumentProxy } from "core/types";
import { SitePaths, SpisumNames, SpisumNodeTypes } from "enums";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootStateType } from "reducers";
import { classPath, translationPath } from "share/utils/getPath";
import { alfrescoQuery, getQueryPath } from "share/utils/query";
import { lang, t, withTranslation } from "translation/i18n";

const defaultColumn: DataColumn<GenericDocument> = {
  keys: [classPath(genericDocumentProxy.properties!.ssl!.shreddingYear).path],
  label: t(translationPath(lang.general.yearOfShredding))
};

export const columns: DataColumn<GenericDocument>[] = [
  {
    keys: [classPath(genericDocumentProxy.properties!.ssl!.pid).path],
    label: t(translationPath(lang.general.identifier))
  },
  {
    getValue: (item) =>
      item.nodeType === SpisumNodeTypes.DocumentRM
        ? item.properties?.ssl?.ssid
        : item.properties?.ssl?.fileIdentificator,
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
  defaultColumn,
  {
    keys: [classPath(genericDocumentProxy.properties!.ssl!.location).path],
    label: t(translationPath(lang.general.location))
  }
];

const Component = () => {
  const dispatch = useDispatch();
  const path = useSelector(
    (state: RootStateType) =>
      getQueryPath(
        state.loginReducer.global.paths,
        null,
        SitePaths.RM,
        SitePaths.ShreddingPlan
      )?.path || ""
  );

  const dispatchOpenDialog: (row: GenericDocument) => void = (row) => {
    if (row.nodeType === SpisumNodeTypes.DocumentRM) {
      dispatch(
        openDocumentWithSaveButtonsAction({
          ...row,
          canUploadComponents: false,
          id: row?.properties?.ssl?.ref || row.id,
          isReadonly: true
        })
      );
    } else if (row.nodeType === SpisumNodeTypes.FileRM) {
      dispatch(
        openFileDetailsAction({
          ...row,
          id: row?.properties?.ssl?.ref || row.id,
          readonly: true
        })
      );
    }
  };

  const controls: ControlsBarType<GenericDocument> = {
    multi: {
      items: [
        {
          action: (selected) => {
            dispatch(
              dialogOpenAction({
                dialogData: selected,
                dialogType: DialogType.CreateRetentionProposal
              })
            );
          },
          icon: <AddBoxOutlined />,
          title: t(translationPath(lang.general.createShreddingProposal))
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
          action: () => {},
          icon: <SwapHoriz />,
          title: t(translationPath(lang.general.changeFileMark))
        },
        {
          action: (selected: GenericDocument[]) => {
            dispatch(
              dialogOpenAction({
                dialogData: selected[0],
                dialogType: DialogType.ShreddingDiscard
              })
            );
          },
          filter: (x) => !x.properties?.ssl?.discardTo,
          icon: <Alarm />,
          title: t(translationPath(lang.general.discardFromShredding))
        },
        {
          action: (selected: GenericDocument[]) => {
            dispatch(
              dialogOpenAction({
                dialogData: selected[0],
                dialogType: DialogType.CancelDiscardDialog
              })
            );
          },
          filter: (x) => !!x.properties?.ssl?.discardTo,
          icon: <AlarmOff />,
          title: t(translationPath(lang.general.cancelDiscard))
        },
        {
          action: (selected: GenericDocument[]) => {
            dispatch(
              dialogOpenAction({
                dialogData: selected[0],
                dialogType: DialogType.ChangeToA
              })
            );
          },
          filter: (x) =>
            x.properties?.ssl?.retentionMark === "S" ||
            x.properties?.ssl?.retentionMark === "V",
          icon: (
            <svg height="21" width="10" style={{ fontSize: 16 }}>
              <text x="0" y="16" fill="black">
                A
              </text>
            </svg>
          ),
          title: t(translationPath(lang.general.changeToA))
        },
        {
          action: (selected: GenericDocument[]) => {
            dispatch(
              dialogOpenAction({
                dialogData: selected[0],
                dialogType: DialogType.ChangeToS
              })
            );
          },
          filter: (x) =>
            x.properties?.ssl?.retentionMark === "A" ||
            x.properties?.ssl?.retentionMark === "V",
          icon: (
            <svg height="21" width="10" style={{ fontSize: 16 }}>
              <text x="0" y="16" fill="black">
                S
              </text>
            </svg>
          ),
          title: t(translationPath(lang.general.changeToS))
        },
        {
          action: (selected) => {
            dispatch(
              dialogOpenAction({
                dialogData: selected,
                dialogType: DialogType.CreateRetentionProposal
              })
            );
          },
          filter: (x) => !x.properties?.ssl?.discardTo,
          icon: <AddBoxOutlined />,
          title: t(translationPath(lang.general.createShreddingProposal))
        }
      ]
    }
  };

  return (
    <MenuLayout>
      <DocumentView
        columns={columns}
        controls={controls}
        customTitle={t(translationPath(lang.table.documentsFilesForShredding))}
        defaultSortAsc={true}
        defaultSortColumn={defaultColumn}
        handleDoubleClick={dispatchOpenDialog}
        search={{
          query: {
            query: alfrescoQuery({
              paths: [path],
              type: [SpisumNodeTypes.DocumentRM, SpisumNodeTypes.FileRM],
              where: `${SpisumNames.CutOffDate}:[* TO *]`
            })
          }
        }}
      />
    </MenuLayout>
  );
};

export default withTranslation()(Component);
