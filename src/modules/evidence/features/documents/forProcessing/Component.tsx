import { openDocumentWithSaveButtonsAction } from "core/api/document/_actions";
import { ControlsBarType, DataColumn } from "core/components/dataTable/_types";
import { dialogOpenAction } from "core/components/dialog/_actions";
import { DialogType } from "core/components/dialog/_types";
import DocumentView from "core/components/documentView";
import MenuLayout from "core/components/layout/MenuLayout";
import { SessionType } from "core/features/login/_types";
import { GenericDocument, genericDocumentProxy } from "core/types";
import {
  SenderType,
  SitePaths,
  SpisumNamesWithoutPrefix,
  SpisumNodeTypes
} from "enums";
import React, { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootStateType } from "reducers";
import { handoverDocument } from "share/components/dialog/documentHandoverDialog/_actions";
import { evidenceCancelDialogOpen } from "share/components/dialog/evidenceCancelDialog/_actions";
import { lostDestroyedDialogOpen } from "share/components/dialog/lostDestroyedDialog/_actions";
import { settleDocumentDialogOpen } from "share/components/dialog/settleDocumentDialog/_actions";
import { classPath, translationPath } from "share/utils/getPath";
import { getRelativePath } from "share/utils/query";
import { isUserInLeadership } from "share/utils/user";
import { lang, t, withTranslation } from "translation/i18n";
import { getControls } from "./controls";

const defaultColumn: DataColumn<GenericDocument> = {
  getValue: (x) =>
    x?.properties?.ssl?.senderType === "own"
      ? x?.createdAt
      : x?.properties?.ssl?.deliveryDate,
  isDate: true,
  keys: [
    classPath(genericDocumentProxy.properties!.ssl!.deliveryDate).path,
    classPath(genericDocumentProxy.createdAt).path
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
      keys: [classPath(genericDocumentProxy.properties!.ssl!.filePlan).path],
      label: t(translationPath(lang.general.filePlan))
    },
    {
      keys: [classPath(genericDocumentProxy.properties!.ssl!.fileMark).path],
      label: t(translationPath(lang.general.fileMark))
    },
    {
      keys: [
        classPath(genericDocumentProxy.properties!.ssl!.retentionMode).path
      ],
      label: t(translationPath(lang.general.retentionMode))
    },
    {
      isDate: true,
      keys: [
        classPath(genericDocumentProxy.properties!.ssl!.settleToDate).path
      ],
      label: t(translationPath(lang.general.settleToDate))
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
  const [controls, setControls] = useState<ControlsBarType<GenericDocument>>();
  const dispatch = useDispatch();
  const session = useSelector(
    (state: RootStateType) => state.loginReducer.session
  );
  const userId = useSelector(
    (state: RootStateType) => state.loginReducer.session.user?.id
  );

  const dispatchOpenDialog: (row: GenericDocument) => void = (row) => {
    dispatch(
      openDocumentWithSaveButtonsAction({
        ...row,
        canUploadComponents: row.properties?.ssl?.senderType === SenderType.Own
      })
    );
  };

  const relativePath = useSelector((state: RootStateType) =>
    getRelativePath(
      state.loginReducer.global.paths,
      state.loginReducer.session.activeGroup,
      SitePaths.Evidence,
      SitePaths.Documents,
      SitePaths.ForProcessing
    )
  );

  const handleOpenDescription = (selected: GenericDocument[]) =>
    dispatchOpenDialog(selected[0]);

  const handleCreateNewDocumentFile = (selected: GenericDocument[]) => {
    dispatch(
      dialogOpenAction({
        dialogData: selected[0],
        dialogType: DialogType.CreateNewDocumentFile
      })
    );
  };

  const handleHandoverDocument = (selected: GenericDocument[]) => {
    dispatch(handoverDocument(selected[0]));
  };

  const handleForSignatureDocument = (selected: GenericDocument[]) => {
    dispatch(
      dialogOpenAction({
        dialogData: selected[0],
        dialogType: DialogType.ForSignature
      })
    );
  };

  const handleSendShipment = (selected: GenericDocument[]) => {
    dispatch(
      dialogOpenAction({
        dialogData: selected[0],
        dialogType: DialogType.SendShipment
      })
    );
  };

  const handleOpenLostDestroyedDocumentDialog = (
    selected: GenericDocument[]
  ) => {
    dispatch(lostDestroyedDialogOpen(selected[0]));
  };

  const handleOpenSettleDocumentDialog = (selected: GenericDocument[]) => {
    dispatch(settleDocumentDialogOpen(selected[0]));
  };

  const handleOpenCancelDialog = (selected: GenericDocument[]) => {
    dispatch(evidenceCancelDialogOpen(selected[0]));
  };

  const onDataUpdated = useCallback(
    () =>
      getControls({
        handleCreateNewDocumentFile,
        handleForSignatureDocument,
        handleHandoverDocument,
        handleOpenCancelDialog,
        handleOpenDescription,
        handleOpenLostDestroyedDocumentDialog,
        handleOpenSettleDocumentDialog,
        handleSendShipment,
        userId
      })
        .then(setControls)
        .catch(() => {
          //noop
        }),
    []
  );

  return (
    <MenuLayout>
      <DocumentView
        children={{
          include: [SpisumNamesWithoutPrefix.IsFavorite],
          relativePath,
          where: `(nodeType='${SpisumNodeTypes.Document}')`
        }}
        columns={getColumns(session)}
        controls={controls}
        customTitle={t(translationPath(lang.table.documentsForProcessing))}
        defaultSortAsc={true}
        defaultSortColumn={defaultColumn}
        handleDoubleClick={dispatchOpenDialog}
        onDataRefreshed={onDataUpdated}
      />
    </MenuLayout>
  );
};

export default withTranslation()(Component);
