import {
  Check,
  Close,
  Description,
  NotInterested,
  Refresh
} from "@material-ui/icons";
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
import { EmailDocument, emailDocumentProxy } from "core/types";
import { DocumentType, SitePaths, SpisumNodeTypes } from "enums";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootStateType } from "reducers";
import { dialogOpenEmailDetails } from "share/components/dialog/emailDetailsDialog/_actions";
import { classPath, translationPath } from "share/utils/getPath";
import { getRelativePath } from "share/utils/query";
import { isEmptyString } from "share/utils/utils";
import { lang, t, withTranslation } from "translation/i18n";
import { RefreshStatusPayload } from "../../../types";
import {
  documentEmailRefreshAction,
  documentEmailRefreshStatusAction,
  documentRefreshAction,
  documentRegisterAction
} from "../../../_actions";

const defaultColumn: DataColumn<EmailDocument> = {
  isDateTime: true,
  keys: [classPath(emailDocumentProxy.properties!.ssl!.emailDeliveryDate).path],
  label: t(translationPath(lang.general.delivery))
};

const Component = () => {
  const dispatch = useDispatch();
  const [refreshPending, setRefreshPending] = useState<boolean>(false);

  const emailAccounts = useSelector(
    (state: RootStateType) => state.emailReducer.emailAccounts
  );

  const columns: DataColumn<EmailDocument>[] = [
    {
      keys: [classPath(emailDocumentProxy.properties!.ssl!.emailSubject).path],
      label: t(translationPath(lang.general.subject))
    },
    {
      getValue: (item) =>
        `${item.properties?.ssl?.emailSender}${
          !isEmptyString(item.properties?.ssl?.emailSenderName)
            ? ` (${item.properties?.ssl?.emailSenderName})`
            : ""
        }`,
      keys: [
        classPath(emailDocumentProxy.properties!.ssl!.emailSender).path,
        classPath(emailDocumentProxy.properties!.ssl!.emailSenderName).path
      ],
      label: t(translationPath(lang.general.sender))
    },
    defaultColumn,
    {
      keys: [
        classPath(emailDocumentProxy.properties!.ssl!.emailAttachmentsCount)
          .path
      ],
      label: t(translationPath(lang.general.attachmentsCount))
    }
  ];

  if (emailAccounts?.length > 1) {
    columns.push({
      keys: [
        classPath(emailDocumentProxy.properties!.ssl!.emailRecipient).path
      ],
      label: t(translationPath(lang.general.recipient))
    });
  }

  const dispatchOpenDialog: (row: EmailDocument) => void = (row) => {
    dispatch(dialogOpenEmailDetails({ data: row }));
  };

  const onSuccess = (payload: RefreshStatusPayload) => {
    setRefreshPending(false);

    dispatch(
      notificationAction({
        message: t(
          translationPath(lang.dialog.notifications.refreshSucceeded),
          {
            count: payload.newMessageCount
          }
        ),
        severity: NotificationSeverity.Success
      })
    );

    dispatch(documentViewAction__Refresh(true));
  };

  const onError = () => {
    setRefreshPending(false);
  };

  const triggerFetchEmails = () => {
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
          refreshAction: documentEmailRefreshAction,
          statusAction: documentEmailRefreshStatusAction
        }
      })
    );
  };

  const controls: ControlsBarType<EmailDocument> = {
    default: {
      items: [
        {
          action: triggerFetchEmails,
          icon: () =>
            refreshPending ? <AnimatedRefreshRotate /> : <Refresh />,
          title: t(translationPath(lang.general.refreshEmails))
        }
      ]
    },
    single: {
      items: [
        {
          action: (selected: EmailDocument[]) => {
            dispatchOpenDialog(selected[0]);
          },
          icon: <Description />,
          title: t(translationPath(lang.general.showDetails))
        },
        {
          action: (selected: EmailDocument[]) => {
            dispatch(
              documentRegisterAction({
                dialogType: DialogType.RegisterEmail,
                document: selected[0] as EmailDocument,
                documentType: DocumentType.Digital,
                nodeType: SpisumNodeTypes.Email,
                sitePath: SitePaths.Unprocessed
              })
            );
          },
          icon: <Check />,
          title: t(translationPath(lang.general.register))
        },
        {
          action: (selected: EmailDocument[]) => {
            dispatch(
              dialogOpenAction({
                dialogProps: { data: selected[0] },
                dialogType: DialogType.DontRegisterDocument
              })
            );
          },
          icon: <Close />,
          title: t(translationPath(lang.general.notRegister))
        },
        {
          action: (selected: EmailDocument[]) => {
            dispatch(
              dialogOpenAction({
                dialogProps: { data: selected[0] },
                dialogType: DialogType.IncompleteDocument
              })
            );
          },
          icon: <NotInterested />,
          title: t(translationPath(lang.general.notValid))
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
    SitePaths.MailBox,
    SitePaths.Unprocessed
  );

  return (
    <MenuLayout>
      <DocumentView
        children={{
          includeSource: true,
          relativePath,
          where: `(nodeType='${SpisumNodeTypes.Email}')`
        }}
        columns={columns}
        controls={controls}
        customTitle={t(translationPath(lang.table.unprocessedEmails))}
        defaultSortAsc={true}
        defaultSortColumn={defaultColumn}
        refreshPending={refreshPending}
        handleDoubleClick={dispatchOpenDialog}
      />
    </MenuLayout>
  );
};

Component.displayName = "unprocessed";

export default withTranslation()(Component);
