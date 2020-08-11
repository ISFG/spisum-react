import { SslShipment } from "core/api/models";
import DataTable from "core/components/dataTable";
import { ControlsBarType, DataColumn } from "core/components/dataTable/_types";
import { useStyles } from "core/components/dialog/Dialog.styles";
import { DataTableValues } from "core/components/documentView/_types";
import { ShipmentDocument, shipmentDocumentProxy } from "core/types";
import { SpisumNodeTypes } from "enums";
import { default as React } from "react";
import { lang, t } from "translation/i18n";
import { v1 as uuidv1 } from "uuid";
import { classPath, translationPath } from "../../../utils/getPath";
import { useStyles as useShipmentStyles } from "./SendShipment.styles";

const sendModeNameValues = {
  [SpisumNodeTypes.ShipmentDatabox]: t(
    translationPath(lang.enums.deliveryMode.databox)
  ),
  [SpisumNodeTypes.ShipmentEmail]: t(
    translationPath(lang.enums.deliveryMode.email)
  ),
  [SpisumNodeTypes.ShipmentPost]: t(
    translationPath(lang.enums.deliveryMode.post)
  ),
  [SpisumNodeTypes.ShipmentPublish]: t(
    translationPath(lang.enums.deliveryMode.publish)
  ),
  [SpisumNodeTypes.ShipmentPersonally]: t(
    translationPath(lang.enums.deliveryMode.personally)
  )
};

const formatAddress = (shipment?: SslShipment) =>
  [
    shipment?.address1,
    shipment?.address2,
    shipment?.address3,
    shipment?.address4
  ]
    .filter(Boolean)
    .map((address) => <div key={uuidv1()}>{address}</div>);

const columns: DataColumn<ShipmentDocument>[] = [
  {
    keys: [classPath(shipmentDocumentProxy.properties?.ssl?.pid).path],
    label: t(translationPath(lang.general.identifier))
  },
  {
    getValue: (entity) => sendModeNameValues[entity.nodeType],
    keys: [classPath(shipmentDocumentProxy.nodeType).path],
    label: t(translationPath(lang.general.sendMode))
  },
  {
    getValue: (entity) => {
      const props = entity.properties?.ssl;
      if (
        entity.nodeType === SpisumNodeTypes.ShipmentPersonally ||
        entity.nodeType === SpisumNodeTypes.ShipmentPost
      ) {
        return formatAddress(props);
      }

      return props?.recipient;
    },
    keys: [classPath(shipmentDocumentProxy.properties?.ssl?.recipient).path],
    label: t(translationPath(lang.general.addressee))
  }
];

interface OwnProps {
  returnedShipmentTotalItems: number;
  createdShipmentTotalItems: number;
  returnedShipmentLoading: boolean;
  createdShipmentLoading: boolean;
  returnedShipmentRows: ShipmentDocument[];
  createdShipmentRows: ShipmentDocument[];
  handleChangePageReturnedShipment: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null,
    page: number
  ) => void;
  handleChangeRowsPerPageReturnedShipment: (
    event: React.ChangeEvent<HTMLInputElement>
  ) => void;
  handleRefreshReturnedShipment: VoidFunction;
  handleRefreshCreatedShipment: VoidFunction;
  handleSortingChangeReturnedShipment: (
    index: number,
    keys: string[]
  ) => (event: React.MouseEvent<HTMLTableRowElement, MouseEvent>) => void;
  handleSortingChangeCreatedShipment: (
    index: number,
    keys: string[]
  ) => (event: React.MouseEvent<HTMLTableRowElement, MouseEvent>) => void;
  handleChangePageCreatedShipment: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null,
    page: number
  ) => void;
  handleChangeRowsPerPageCreatedShipment: (
    event: React.ChangeEvent<HTMLInputElement>
  ) => void;
  handleSelectionChangeReturnedShipment: (items: ShipmentDocument[]) => void;
  handleSelectionChangeCreatedShipment: (items: ShipmentDocument[]) => void;
  returnedShipmentPageNumber: number;
  createdShipmentPageNumber: number;
  returnedShipmentRowsPerPage: number;
  createdShipmentRowsPerPage: number;
  returnedShipmentControls: ControlsBarType<ShipmentDocument>;
  createdShipmentControls: ControlsBarType<ShipmentDocument>;
}

export const SendShipment = ({
  returnedShipmentTotalItems,
  returnedShipmentLoading,
  returnedShipmentRows,
  handleChangePageReturnedShipment,
  handleChangeRowsPerPageReturnedShipment,
  handleSortingChangeCreatedShipment,
  handleSortingChangeReturnedShipment,
  handleRefreshReturnedShipment,
  returnedShipmentPageNumber,
  returnedShipmentRowsPerPage,
  returnedShipmentControls,
  createdShipmentControls,
  createdShipmentRows,
  createdShipmentTotalItems,
  createdShipmentLoading,
  handleRefreshCreatedShipment,
  createdShipmentPageNumber,
  handleChangePageCreatedShipment,
  handleChangeRowsPerPageCreatedShipment,
  createdShipmentRowsPerPage,
  handleSelectionChangeReturnedShipment,
  handleSelectionChangeCreatedShipment
}: OwnProps) => {
  const classes = useShipmentStyles();
  const dialogClasses = useStyles();

  const dataTableValues: DataTableValues = {
    resetIcons: true
  };

  return (
    <div className="body-fullsize">
      <DataTable
        breadcrumbs={[]}
        columns={columns}
        controls={createdShipmentControls}
        customActionBarClassName={dialogClasses.actionBarPrimary}
        customTitle={t(translationPath(lang.general.createdShipments))}
        dataTableValues={dataTableValues}
        defaultActionFirst={true}
        handleChangePage={handleChangePageCreatedShipment}
        handleChangeRowsPerPage={handleChangeRowsPerPageCreatedShipment}
        handleSelectionChange={handleSelectionChangeCreatedShipment}
        handleSortingChange={handleSortingChangeCreatedShipment}
        pageNumber={createdShipmentPageNumber}
        paginationClassName={dialogClasses.tablePagination}
        pending={createdShipmentLoading}
        refreshTable={handleRefreshCreatedShipment}
        rows={createdShipmentRows}
        rowsCount={createdShipmentTotalItems}
        rowsPerPage={createdShipmentRowsPerPage}
        tableLayoutClassName="dialog__table-layout"
        tableWrapperClassName={classes.returnedTable}
      />
      <DataTable
        breadcrumbs={[]}
        columns={columns}
        controls={returnedShipmentControls}
        customActionBarClassName={dialogClasses.actionBarPrimary}
        customTitle={t(
          translationPath(lang.general.returnedShipmentsFromDispatch)
        )}
        dataTableValues={dataTableValues}
        defaultActionFirst={true}
        handleChangePage={handleChangePageReturnedShipment}
        handleChangeRowsPerPage={handleChangeRowsPerPageReturnedShipment}
        handleSelectionChange={handleSelectionChangeReturnedShipment}
        handleSortingChange={handleSortingChangeReturnedShipment}
        pageNumber={returnedShipmentPageNumber}
        paginationClassName={dialogClasses.tablePagination}
        pending={returnedShipmentLoading}
        refreshTable={handleRefreshReturnedShipment}
        rows={returnedShipmentRows}
        rowsCount={returnedShipmentTotalItems}
        rowsPerPage={returnedShipmentRowsPerPage}
        tableLayoutClassName="dialog__table-layout"
        tableWrapperClassName={classes.createdTable}
      />
    </div>
  );
};
