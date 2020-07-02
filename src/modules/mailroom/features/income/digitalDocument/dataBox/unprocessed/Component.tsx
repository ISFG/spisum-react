import { Check, Close, Description, Refresh } from "@material-ui/icons";
import { callAsyncAction } from "core/action";
import { AnimatedRefreshRotate } from "core/components/dataTable/Component.styles";
import { ControlsBarType, DataColumn } from "core/components/dataTable/_types";
import { dialogOpenAction } from "core/components/dialog/_actions";
import { DialogType } from "core/components/dialog/_types";
import DocumentView from "core/components/documentView";
import { documentViewAction__Refresh } from "core/components/documentView/_actions";
import MenuLayout from "core/components/layout/MenuLayout";
import { notificationAction } from "core/components/notifications/_actions";
import { NotificationSeverity } from "core/components/notifications/_types";
import { DataboxDocument, dataBoxDocumentProxy } from "core/types";
import { DocumentType, SitePaths, SpisumNodeTypes } from "enums";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootStateType } from "reducers";
import { dialogOpenDataboxDetails } from "share/components/dialog/databoxDetailsDialog/_actions";
import { classPath, translationPath } from "share/utils/getPath";
import { getRelativePath } from "share/utils/query";
import { lang, t, withTranslation } from "translation/i18n";
import { RefreshStatusPayload } from "../../../types";
import {
  documentDataBoxRefreshAction,
  documentDataBoxRefreshStatusAction,
  documentRefreshAction,
  documentRegisterAction
} from "../../../_actions";

const defaultColumn: DataColumn<DataboxDocument> = {
  isDate: true,
  keys: [
    classPath(dataBoxDocumentProxy.properties!.ssl!.databoxDeliveryDate).path
  ],
  label: t(translationPath(lang.general.delivery))
};

const columns: DataColumn<DataboxDocument>[] = [
  {
    keys: [
      classPath(dataBoxDocumentProxy.properties!.ssl!.databoxSubject).path
    ],
    label: t(translationPath(lang.general.subject))
  },
  {
    keys: [
      classPath(dataBoxDocumentProxy.properties!.ssl!.databoxSenderName).path
    ],
    label: t(translationPath(lang.general.sender))
  },
  defaultColumn,
  {
    keys: [
      classPath(dataBoxDocumentProxy.properties!.ssl!.databoxAttachmentsCount)
        .path
    ],
    label: t(translationPath(lang.general.attachmentsCount))
  }
];

const Component = () => {
  const dispatch = useDispatch();
  const [refreshPending, setRefreshPending] = useState<boolean>(false);

  const dispatchOpenDialog: (row: DataboxDocument) => void = (row) => {
    dispatch(dialogOpenDataboxDetails(row));
  };

  const onSuccess = (payload: RefreshStatusPayload) => {
    setRefreshPending(false);

    dispatch(
      notificationAction({
        message: t(
          translationPath(lang.dialog.notifications.refreshSucceeded),
          { count: payload.newMessageCount }
        ),
        severity: NotificationSeverity.Success
      })
    );

    dispatch(documentViewAction__Refresh(true));
  };

  const onError = () => {
    setRefreshPending(false);
  };

  const triggerFetchDataboxMessages = () => {
    if (refreshPending) {
      return;
    }

    setRefreshPending(true);

    dispatch(
      callAsyncAction({
        action: documentRefreshAction,
        onError,
        onSuccess,
        onSuccessNotification: null,
        payload: {
          refreshAction: documentDataBoxRefreshAction,
          statusAction: documentDataBoxRefreshStatusAction
        }
      })
    );
  };

  const controls: ControlsBarType<DataboxDocument> = {
    default: {
      items: [
        {
          action: triggerFetchDataboxMessages,
          icon: () =>
            refreshPending ? <AnimatedRefreshRotate /> : <Refresh />,
          title: t(translationPath(lang.general.refreshMessages))
        }
      ]
    },
    single: {
      items: [
        {
          action: (selected: DataboxDocument[]) => {
            dispatchOpenDialog(selected[0]);
          },
          icon: <Description />,
          title: t(translationPath(lang.general.showDetails))
        },
        {
          action: (selected: DataboxDocument[]) => {
            dispatch(
              documentRegisterAction({
                dialogType: DialogType.RegisterDatabox,
                document: selected[0],
                documentType: DocumentType.Digital,
                nodeType: SpisumNodeTypes.Databox
              })
            );
          },
          icon: <Check />,
          title: t(translationPath(lang.general.register))
        },
        {
          action: (selected: DataboxDocument[]) => {
            dispatch(
              dialogOpenAction({
                dialogData: selected[0],
                dialogType: DialogType.DontRegisterDocument
              })
            );
          },
          icon: <Close />,
          title: t(translationPath(lang.general.notRegister))
        }
      ]
    }
  };

  const paths = useSelector(
    (state: RootStateType) => state.loginReducer.global.paths
  );

  const relativePath = getRelativePath(
    paths,
    null,
    SitePaths.Mailroom,
    SitePaths.DataBox,
    SitePaths.Unprocessed
  );

  return (
    <MenuLayout>
      <DocumentView
        children={{
          includeSource: true,
          relativePath,
          where: `(nodeType='${SpisumNodeTypes.Databox}')`
        }}
        columns={columns}
        controls={controls}
        customTitle={t(translationPath(lang.table.unprocessedDataboxes))}
        defaultSortAsc={true}
        defaultSortColumn={defaultColumn}
        handleDoubleClick={dispatchOpenDialog}
        refreshPending={refreshPending}
      />
    </MenuLayout>
  );
};

Component.displayName = "unprocessed";

export default withTranslation()(Component);
