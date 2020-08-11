import { Block, Description, Mail } from "@material-ui/icons";
import { ControlsBarType, DataColumn } from "core/components/dataTable/_types";
import { dialogOpenAction } from "core/components/dialog/_actions";
import { DialogType } from "core/components/dialog/_types";
import DocumentView from "core/components/documentView";
import MenuLayout from "core/components/layout/MenuLayout";
import { SessionType } from "core/features/login/_types";
import {
  GenericDocument,
  genericDocumentProxy,
  ShipmentDocument
} from "core/types";
import { SitePaths, SpisumNodeTypes } from "enums";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootStateType } from "reducers";
import { shipmentDetailDialogOpen } from "share/components/dialog/shipmentDetailDialog/_action";
import { getHtmlMultilineValue } from "share/utils/formatter";
import { classPath, translationPath } from "share/utils/getPath";
import { alfrescoQuery, getQueryPath } from "share/utils/query";
import { isUserInLeadership } from "share/utils/user";
import { lang, t, withTranslation } from "translation/i18n";

const defaultColumn: DataColumn<GenericDocument> = {
  isDateTime: true,
  keys: [classPath(genericDocumentProxy.properties!.ssl!.toDispatchDate).path],
  label: t(translationPath(lang.general.toDispatchDate))
};

const getColumns = (session: SessionType): DataColumn<GenericDocument>[] => {
  const columns: DataColumn<GenericDocument>[] = [
    {
      keys: [classPath(genericDocumentProxy.properties!.ssl!.pid).path],
      label: t(translationPath(lang.general.identifier))
    },
    {
      getValue: (item) =>
        item.properties?.ssl?.fileIdentificator || item.properties?.ssl?.ssid,
      keys: [
        classPath(genericDocumentProxy.properties!.ssl!.fileIdentificator).path,
        classPath(genericDocumentProxy.properties!.ssl!.ssid).path
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
      getValue: (item) => {
        switch (item.nodeType) {
          case SpisumNodeTypes.ShipmentEmail:
          case SpisumNodeTypes.ShipmentDatabox:
            return item.properties?.ssl?.recipient;
          case SpisumNodeTypes.ShipmentPersonally:
          case SpisumNodeTypes.ShipmentPost:
            return getHtmlMultilineValue(
              item.properties?.ssl?.address1,
              item.properties?.ssl?.address2,
              item.properties?.ssl?.address3,
              item.properties?.ssl?.address4
            );
          default:
            return null;
        }
      },
      keys: [
        classPath(genericDocumentProxy.properties!.ssl!.recipient).path,
        classPath(genericDocumentProxy.properties!.ssl!.address1).path,
        classPath(genericDocumentProxy.properties!.ssl!.address2).path,
        classPath(genericDocumentProxy.properties!.ssl!.address3).path,
        classPath(genericDocumentProxy.properties!.ssl!.address4).path
      ],
      label: t(translationPath(lang.general.addressee))
    },
    defaultColumn,
    {
      keys: [
        classPath(genericDocumentProxy.properties!.ssl!.reasonForReturn).path
      ],
      label: t(translationPath(lang.general.reasonForReturn))
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
  const activeGroup = useSelector(
    (state: RootStateType) => state.loginReducer.session.activeGroup
  );
  const path = useSelector(
    (state: RootStateType) =>
      getQueryPath(
        state.loginReducer.global.paths,
        null,
        SitePaths.Dispatch,
        SitePaths.Returned
      )?.path || ""
  );

  const openShipmentDetail = (row: ShipmentDocument) => {
    dispatch(
      shipmentDetailDialogOpen({
        documentId: row?.properties?.ssl?.shRefId,
        selected: row
      })
    );
  };

  const controls: ControlsBarType<ShipmentDocument> = {
    single: {
      items: [
        {
          action: (selected) => {
            openShipmentDetail(selected[0]);
          },
          icon: <Description />,
          title: t(translationPath(lang.general.showDetails))
        },
        {
          action: (selected: ShipmentDocument[]) => {
            dispatch(
              dialogOpenAction({
                dialogProps: { data: { id: selected[0].id } },
                dialogType: DialogType.ResendShipment
              })
            );
          },
          icon: <Mail />,
          title: t(translationPath(lang.general.sendTodispatchAgain))
        },
        {
          action: (selected: ShipmentDocument[]) => {
            dispatch(
              dialogOpenAction({
                dialogProps: { data: { id: selected[0].id } },
                dialogType: DialogType.CancelShipment
              })
            );
          },
          icon: <Block />,
          title: t(translationPath(lang.general.deleteShipment))
        }
      ]
    }
  };

  return (
    <MenuLayout>
      <DocumentView
        columns={getColumns(session)}
        controls={controls}
        customTitle={t(translationPath(lang.table.returnedDispatch))}
        defaultSortAsc={true}
        defaultSortColumn={defaultColumn}
        search={{
          query: {
            query: alfrescoQuery({
              paths: [path],
              type: [
                SpisumNodeTypes.Databox,
                SpisumNodeTypes.ShipmentEmail,
                SpisumNodeTypes.ShipmentPersonally,
                SpisumNodeTypes.ShipmentPost,
                SpisumNodeTypes.ShipmentPublish
              ],
              where: `ssl:group:${activeGroup}`
            })
          }
        }}
        handleDoubleClick={openShipmentDetail}
      />
    </MenuLayout>
  );
};

export default withTranslation()(Component);
