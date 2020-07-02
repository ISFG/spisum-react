import { Description, RestorePage } from "@material-ui/icons";
import { openDocumentWithSaveButtonsAction } from "core/api/document/_actions";
import { ControlsBarType, DataColumn } from "core/components/dataTable/_types";
import { openFileDetailsAction } from "core/components/dialog/tabs/tableOfContents/_actions";
import DocumentView from "core/components/documentView";
import MenuLayout from "core/components/layout/MenuLayout";
import { SessionType } from "core/features/login/_types";
import { GenericDocument, genericDocumentProxy } from "core/types";
import { SitePaths, SpisumNodeTypes } from "enums";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootStateType } from "reducers";
import { dialogOpenConceptDetails } from "share/components/dialog/conceptDetailsDialog/_actions";
import { openFoundDialog } from "share/components/dialog/foundDialog/_actions";
import { classPath, translationPath } from "share/utils/getPath";
import { getRelativePath } from "share/utils/query";
import { isUserInLeadership } from "share/utils/user";
import { lang, t, withTranslation } from "translation/i18n";

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
      keys: [classPath(genericDocumentProxy.properties!.ssl!.pid).path],
      label: t(translationPath(lang.general.identifier))
    },
    {
      getValue: (item) =>
        item.nodeType === SpisumNodeTypes.Document
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
      keys: [
        classPath(genericDocumentProxy.properties!.ssl!.fileIdentificator).path
      ],
      label: t(translationPath(lang.general.fileIdentificator))
    },
    {
      keys: [classPath(genericDocumentProxy.properties!.ssl!.subject).path],
      label: t(translationPath(lang.general.subject))
    },
    defaultColumn,
    {
      keys: [classPath(genericDocumentProxy.properties!.ssl!.lostReason).path],
      label: t(translationPath(lang.general.lostReason))
    },
    {
      isDate: true,
      keys: [classPath(genericDocumentProxy.properties!.ssl!.lostDate).path],
      label: t(translationPath(lang.general.lostDate))
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
      SitePaths.LostDestroyed
    )
  );

  const dispatchOpenDialog: (row: GenericDocument) => void = (row) => {
    if (row.nodeType === SpisumNodeTypes.Document) {
      dispatch(
        openDocumentWithSaveButtonsAction({
          ...row,
          canUploadComponents: false,
          isReadonly: true
        })
      );
    } else if (row.nodeType === SpisumNodeTypes.File) {
      dispatch(openFileDetailsAction({ ...row, readonly: true }));
    } else if (row.nodeType === SpisumNodeTypes.Concept) {
      dispatch(dialogOpenConceptDetails({ ...row, isReadonly: true }));
    }
  };

  const controls: ControlsBarType<GenericDocument> = {
    multi: {
      items: [
        {
          action: (selected: GenericDocument[]) => {
            dispatch(openFoundDialog(selected));
          },
          icon: <RestorePage />,
          title: t(translationPath(lang.general.find))
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
            dispatch(openFoundDialog(selected));
          },
          icon: <RestorePage />,
          title: t(translationPath(lang.general.find))
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
        customTitle={t(translationPath(lang.table.lostDestroyed))}
        defaultSortAsc={true}
        defaultSortColumn={defaultColumn}
        handleDoubleClick={dispatchOpenDialog}
      />
    </MenuLayout>
  );
};

export default withTranslation()(Component);
