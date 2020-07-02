import {
  AddCircleOutlineOutlined,
  Delete,
  Description,
  Publish,
  Send
} from "@material-ui/icons";
import { ControlsBarType, DataColumn } from "core/components/dataTable/_types";
import DocumentView from "core/components/documentView";
import MenuLayout from "core/components/layout/MenuLayout";
import { SessionType } from "core/features/login/_types";
import { GenericDocument, genericDocumentProxy } from "core/types";
import { SitePaths, SpisumNodeTypes } from "enums";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootStateType } from "reducers";
import { dialogOpenConceptDetails } from "share/components/dialog/conceptDetailsDialog/_actions";
import { evidenceCreateConceptDialogOpen } from "share/components/dialog/createConceptDialog/_actions";
import { evidenceCancelDialogOpen } from "share/components/dialog/evidenceCancelDialog/_actions";
import { classPath, translationPath } from "share/utils/getPath";
import { getRelativePath } from "share/utils/query";
import { isUserInLeadership } from "share/utils/user";
import { lang, t, withTranslation } from "translation/i18n";
import { dialogOpenAction } from "../../../../core/components/dialog/_actions";
import { DialogType } from "../../../../core/components/dialog/_types";
import { handoverDocument } from "../../../../share/components/dialog/documentHandoverDialog/_actions";

const defaultColumn: DataColumn<GenericDocument> = {
  isDate: true,
  keys: [classPath(genericDocumentProxy.createdAt).path],
  label: t(translationPath(lang.general.dateOfCreation))
};

const getColumns = (session: SessionType): DataColumn<GenericDocument>[] => {
  const columns: DataColumn<GenericDocument>[] = [
    {
      keys: [classPath(genericDocumentProxy.properties!.ssl!.pid).path],
      label: t(translationPath(lang.general.identifier))
    },
    {
      keys: [classPath(genericDocumentProxy.properties!.ssl!.subject).path],
      label: t(translationPath(lang.general.subject))
    },
    defaultColumn
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
  const userId = useSelector(
    (state: RootStateType) => state.loginReducer.session.user?.id
  );
  const relativePath = useSelector((state: RootStateType) =>
    getRelativePath(
      state.loginReducer.global.paths,
      state.loginReducer.session.activeGroup,
      SitePaths.Evidence,
      SitePaths.Concepts
    )
  );

  const dispatchOpenDialog: (row: GenericDocument) => void = (row) =>
    dispatch(dialogOpenConceptDetails(row));

  const controls: ControlsBarType<GenericDocument> = {
    default: {
      items: [
        {
          action: (selected: GenericDocument[]) =>
            dispatch(evidenceCreateConceptDialogOpen()),
          icon: <AddCircleOutlineOutlined />,
          title: t(translationPath(lang.general.addConcept))
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
            dispatch(
              dialogOpenAction({
                dialogData: selected[0],
                dialogType: DialogType.PromoteConceptToDocument
              })
            );
          },
          icon: <Publish />,
          title: t(translationPath(lang.general.toDocument))
        },
        /* V2
        {
          action: () => {},
          icon: <CreateNewFolder />,
          title: t(translationPath(lang.general.pasteToFile))
        },
        */
        {
          action: (selected: GenericDocument[]) => {
            dispatch(handoverDocument(selected[0]));
          },
          icon: <Send />,
          title: t(translationPath(lang.general.handOVer))
        }
      ],
      more: [
        {
          action: (selected: GenericDocument[]) => {
            dispatch(evidenceCancelDialogOpen(selected[0]));
          },
          filter: (x) =>
            (userId && x?.properties?.cm?.owner?.id === userId) === true,
          icon: <Delete />,
          title: t(translationPath(lang.general.cancel))
        }
      ]
    }
  };

  return (
    <MenuLayout>
      <DocumentView
        children={{
          relativePath,
          where: `(nodeType='${SpisumNodeTypes.Concept}')`
        }}
        columns={getColumns(session)}
        controls={controls}
        customTitle={t(translationPath(lang.table.concepts))}
        defaultSortAsc={true}
        defaultSortColumn={defaultColumn}
        handleDoubleClick={dispatchOpenDialog}
      />
    </MenuLayout>
  );
};

export default withTranslation()(Component);
