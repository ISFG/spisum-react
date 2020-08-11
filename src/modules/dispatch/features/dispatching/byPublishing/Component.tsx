import { Backspace, Description, Telegram } from "@material-ui/icons";
import { ControlsBarType, DataColumn } from "core/components/dataTable/_types";
import { dialogOpenAction } from "core/components/dialog/_actions";
import { DialogType } from "core/components/dialog/_types";
import DocumentView from "core/components/documentView";
import MenuLayout from "core/components/layout/MenuLayout";
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
import { classPath, translationPath } from "share/utils/getPath";
import { getRelativePath } from "share/utils/query";
import { lang, t, withTranslation } from "translation/i18n";

const defaultColumn: DataColumn<GenericDocument> = {
  isDateTime: true,
  keys: [classPath(genericDocumentProxy.properties!.ssl!.toDispatchDate).path],
  label: t(translationPath(lang.general.toDispatchDate))
};

export const columns: DataColumn<GenericDocument>[] = [
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
  defaultColumn,
  {
    isDateTime: true,
    keys: [classPath(genericDocumentProxy.properties!.ssl!.dateFrom).path],
    label: t(translationPath(lang.general.dateFrom))
  },
  {
    isDateTime: true,
    keys: [classPath(genericDocumentProxy.properties!.ssl!.dateTo).path],
    label: t(translationPath(lang.general.dateTo))
  }
];

const Component = () => {
  const dispatch = useDispatch();
  const relativePath = useSelector((state: RootStateType) =>
    getRelativePath(
      state.loginReducer.global.paths,
      null,
      SitePaths.Dispatch,
      SitePaths.ToDispatch
    )
  );

  const openShipmentDetail = (row: ShipmentDocument) => {
    dispatch(
      shipmentDetailDialogOpen({
        componentReadonly: true,
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
          action: (selected) => {
            dispatch(
              dialogOpenAction({
                dialogProps: { data: selected[0] },
                dialogType: DialogType.ReturnShipment
              })
            );
          },
          icon: <Backspace />,
          title: t(translationPath(lang.general.returnShipment))
        },
        {
          action: (selected: GenericDocument[]) => {
            dispatch(
              dialogOpenAction({
                dialogProps: { data: selected[0] },
                dialogType: DialogType.DispatchPublishShipment
              })
            );
          },
          icon: <Telegram />,
          title: t(translationPath(lang.general.dispatch))
        }
      ]
    }
  };

  return (
    <MenuLayout>
      <DocumentView
        children={{
          relativePath,
          where: `(nodeType='${SpisumNodeTypes.ShipmentPublish}')`
        }}
        columns={columns}
        controls={controls}
        customTitle={t(translationPath(lang.general.dispatchByPublishing))}
        defaultSortAsc={true}
        defaultSortColumn={defaultColumn}
        handleDoubleClick={openShipmentDetail}
      />
    </MenuLayout>
  );
};

export default withTranslation()(Component);
