import { Backspace, Description, Telegram } from "@material-ui/icons";
import { ControlsBarType, DataColumn } from "core/components/dataTable/_types";
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
import { getHtmlMultilineValue } from "share/utils/formatter";
import { classPath, translationPath } from "share/utils/getPath";
import { getRelativePath } from "share/utils/query";
import { lang, t, withTranslation } from "translation/i18n";
import { dialogOpenAction } from "../../../../../core/components/dialog/_actions";
import { DialogType } from "../../../../../core/components/dialog/_types";
import { shipmentDetailDialogOpen } from "../../../../../share/components/dialog/shipmentDetailDialog/_action";

const defaultColumn: DataColumn<GenericDocument> = {
  isDate: true,
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
  {
    getValue: (item) =>
      getHtmlMultilineValue(
        item.properties?.ssl?.address1,
        item.properties?.ssl?.address2,
        item.properties?.ssl?.address3,
        item.properties?.ssl?.address4
      ),
    keys: [
      classPath(genericDocumentProxy.properties!.ssl!.address1).path,
      classPath(genericDocumentProxy.properties!.ssl!.address2).path,
      classPath(genericDocumentProxy.properties!.ssl!.address3).path,
      classPath(genericDocumentProxy.properties!.ssl!.address4).path
    ],
    label: t(translationPath(lang.general.addressee))
  },
  {
    keys: [classPath(genericDocumentProxy.properties!.ssl!.postItemType).path],
    label: t(translationPath(lang.general.postItemType))
  },
  defaultColumn
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
    /* V1.x
    multi: {
      items: [
        {
          action: () => {},
          icon: <Print />,
          title: t(translationPath(lang.general.printPostSheet))
        }
      ]
    },
    */
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
                dialogData: selected[0],
                dialogType: DialogType.ReturnShipment
              })
            );
          },
          icon: <Backspace />,
          title: t(translationPath(lang.general.returnShipment))
        },
        {
          action: (selected: ShipmentDocument[]) => {
            dispatch(
              dialogOpenAction({
                dialogData: selected[0],
                dialogType: DialogType.DispatchPostShipment
              })
            );
          },
          icon: <Telegram />,
          title: t(translationPath(lang.general.dispatch))
        }
        /* V1.x,
        {
          action: () => {},
          icon: <Print />,
          title: t(translationPath(lang.general.printPostSheet))
        }
        */
      ]
    }
  };

  return (
    <MenuLayout>
      <DocumentView
        children={{
          relativePath,
          where: `(nodeType='${SpisumNodeTypes.ShipmentPost}')`
        }}
        columns={columns}
        controls={controls}
        customTitle={t(translationPath(lang.table.dispatchingByPost))}
        defaultSortAsc={true}
        defaultSortColumn={defaultColumn}
        handleDoubleClick={openShipmentDetail}
      />
    </MenuLayout>
  );
};

export default withTranslation()(Component);
