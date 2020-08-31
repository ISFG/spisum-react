import { Check, Description } from "@material-ui/icons";
import { ControlsBarType, DataColumn } from "core/components/dataTable/_types";
import { dialogOpenAction } from "core/components/dialog/_actions";
import { DialogType } from "core/components/dialog/_types";
import DocumentView from "core/components/documentView";
import MenuLayout from "core/components/layout/MenuLayout";
import { DataboxDocument, dataBoxDocumentProxy } from "core/types";
import { DocumentType, SitePaths, SpisumNodeTypes } from "enums";
import React, { Dispatch } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootStateType } from "reducers";
import { dialogOpenDataboxDetails } from "share/components/dialog/databoxDetailsDialog/_actions";
import { classPath, translationPath } from "share/utils/getPath";
import { getRelativePath } from "share/utils/query";
import { lang, t, withTranslation } from "translation/i18n";
import { ActionType } from "typesafe-actions";
import { documentRegisterAction } from "../../../_actions";

const defaultColumn: DataColumn<DataboxDocument> = {
  isDateTime: true,
  keys: [
    classPath(dataBoxDocumentProxy.properties!.ssl!.digitalDeliveryDeliveryDate)
      .path
  ],
  label: t(translationPath(lang.general.delivery))
};

const Component = () => {
  const dispatch = useDispatch<
    Dispatch<
      ActionType<
        | typeof dialogOpenDataboxDetails
        | typeof dialogOpenAction
        | typeof documentRegisterAction
      >
    >
  >();

  const databoxAccounts = useSelector(
    (state: RootStateType) => state.databoxReducer.databoxAccounts
  );

  const columns: DataColumn<DataboxDocument>[] = [
    {
      keys: [
        classPath(dataBoxDocumentProxy.properties!.ssl!.digitalDeliverySubject)
          .path
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
        classPath(
          dataBoxDocumentProxy.properties!.ssl!.digitalDeliveryAttachmentsCount
        ).path
      ],
      label: t(translationPath(lang.general.attachmentsCount))
    },
    {
      keys: [
        classPath(
          dataBoxDocumentProxy.properties!.ssl!
            .digitalDeliveryNotRegisteredReason
        ).path
      ],
      label: t(translationPath(lang.general.notRegisterReason))
    }
  ];

  if (databoxAccounts?.length > 1) {
    columns.push({
      getValue: (x) => {
        return (
          databoxAccounts.find(
            (y) => y.username === x.properties?.ssl?.databoxRecipientUid
          )?.name || x.properties?.ssl?.databoxRecipientUid
        );
      },
      keys: [
        classPath(dataBoxDocumentProxy.properties!.ssl!.databoxRecipientUid)
          .path
      ],
      label: t(translationPath(lang.general.recipient))
    });
  }

  const paths = useSelector(
    (state: RootStateType) => state.loginReducer.global.paths
  );

  const relativePath = getRelativePath(
    paths,
    null,
    SitePaths.Mailroom,
    SitePaths.DataBox,
    SitePaths.NotRegistered
  );

  const dispatchOpenDialog: (row: DataboxDocument) => void = (row) => {
    dispatch(dialogOpenDataboxDetails({ data: row }));
  };

  const controls: ControlsBarType<DataboxDocument> = {
    single: {
      items: [
        {
          action: (selected: DataboxDocument[], refreshTable) => {
            dispatchOpenDialog(selected[0] as DataboxDocument);
          },
          icon: <Description />,
          title: t(translationPath(lang.general.showDetails))
        },
        {
          action: (selected: DataboxDocument[]) => {
            dispatch(
              documentRegisterAction({
                dialogType: DialogType.RegisterDatabox,
                document: selected[0] as DataboxDocument,
                documentType: DocumentType.Digital,
                nodeType: SpisumNodeTypes.Databox
              })
            );
          },
          icon: <Check />,
          title: t(translationPath(lang.general.register))
        }
      ]
    }
  };

  return (
    <MenuLayout>
      <DocumentView
        children={{
          relativePath,
          where: `(nodeType='${SpisumNodeTypes.Databox}')`
        }}
        columns={columns}
        controls={controls}
        customTitle={t(translationPath(lang.table.notRegisteredDataboxes))}
        defaultSortAsc={true}
        defaultSortColumn={defaultColumn}
        handleDoubleClick={dispatchOpenDialog}
      />
    </MenuLayout>
  );
};

Component.displayName = "notRegistered";

export default withTranslation()(Component);
