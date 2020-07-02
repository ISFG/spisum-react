import { Check, Close, Description, SwapHoriz } from "@material-ui/icons";
import { callAsyncAction } from "core/action";
import {
  documentAcceptActionType,
  openDocumentWithSaveButtonsAction
} from "core/api/document/_actions";
import { ControlsBarType, DataColumn } from "core/components/dataTable/_types";
import { openFileDetailsAction } from "core/components/dialog/tabs/tableOfContents/_actions";
import { dialogOpenAction } from "core/components/dialog/_actions";
import { DialogType } from "core/components/dialog/_types";
import DocumentView from "core/components/documentView";
import { documentViewAction__Refresh } from "core/components/documentView/_actions";
import MenuLayout from "core/components/layout/MenuLayout";
import { GenericDocument, genericDocumentProxy } from "core/types";
import { SenderType, SitePaths, SpisumNodeTypes } from "enums";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootStateType } from "reducers";
import { classPath, translationPath } from "share/utils/getPath";
import { getRelativePath } from "share/utils/query";
import { validateItems } from "share/utils/validation";
import { lang, t, withTranslation } from "translation/i18n";
import * as yup from "yup";

const defaultColumn: DataColumn<GenericDocument> = {
  isDate: true,
  keys: [classPath(genericDocumentProxy.properties!.ssl!.shreddingYear).path],
  label: t(translationPath(lang.general.yearOfShredding))
};

export const columns: DataColumn<GenericDocument>[] = [
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
      SitePaths.ToTakeOver
    )
  );

  const onSuccess = () => {
    dispatch(documentViewAction__Refresh(true));
  };

  const dispatchOpenDialog: (row: GenericDocument) => void = (row) => {
    if (row.nodeType === SpisumNodeTypes.TakeDocumentProcessed) {
      dispatch(
        openDocumentWithSaveButtonsAction({
          ...row,
          canUploadComponents: false,
          id: row.properties?.ssl?.takeRef || row.id,
          isReadonly: true
        })
      );
    } else if (row.nodeType === SpisumNodeTypes.TakeFileClosed) {
      dispatch(
        openFileDetailsAction({
          ...row,
          id: row.properties?.ssl?.takeRef || row.id,
          readonly: true
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
              id: selected[0].properties?.ssl?.takeRef || selected[0].id
            }),
          icon: <Description />,
          title: t(translationPath(lang.general.showDetails))
        },
        {
          action: (selected: GenericDocument[]) => {
            dispatch(
              callAsyncAction({
                action: documentAcceptActionType,
                onSuccess,
                payload: {
                  nodeId:
                    selected[0].properties?.ssl?.takeRef || selected[0].id,
                  nodeType: selected[0].nodeType
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
                dialogData: {
                  ...selected[0],
                  id: selected[0].properties?.ssl?.takeRef || selected[0].id
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
        },
        {
          action: (selected: GenericDocument[]) => {
            dispatch(
              dialogOpenAction({
                dialogData: {
                  ...selected[0],
                  id: selected[0].properties?.ssl?.takeRef || selected[0].id
                },
                dialogType: DialogType.ChangeFileMark
              })
            );
          },
          icon: <SwapHoriz />,
          title: t(translationPath(lang.general.changeFileMark))
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
        customTitle={t(translationPath(lang.table.documentsFilesForTakeOver))}
        defaultSortAsc={true}
        defaultSortColumn={defaultColumn}
        handleDoubleClick={dispatchOpenDialog}
      />
    </MenuLayout>
  );
};

export default withTranslation()(Component);
