import { SslShipment } from "core/api/models";
import DataTable from "core/components/dataTable";
import {
  ControlsBarType,
  DataColumn,
  DataColumnType
} from "core/components/dataTable/_types";
import { useStyles } from "core/components/dialog/Dialog.styles";
import { DataTableValues } from "core/components/documentView/_types";
import { ShipmentDocument, shipmentDocumentProxy } from "core/types";
import { SpisumNodeTypes } from "enums";
import React from "react";
import { classPath, translationPath } from "share/utils/getPath";
import { getNameTypeMap } from "share/utils/mapper";
import { lang, t, withTranslation, WithTranslation } from "translation/i18n";

const formattedAddress = (properties?: SslShipment) => {
  if (!properties) {
    return "";
  }

  return [
    properties.address1,
    properties.address2,
    properties.address3,
    properties.address4,
    properties.addressStreet,
    properties.addressCity,
    properties.addressZip,
    properties.addressState
  ]
    .filter(Boolean)
    .map((x) => `${x} <br />`)
    .join("");
};

const selectAddressByNodeType = (document: ShipmentDocument) => {
  switch (document.nodeType) {
    case SpisumNodeTypes.ShipmentEmail:
    case SpisumNodeTypes.ShipmentDatabox:
      return document.properties?.ssl?.recipient;
    case SpisumNodeTypes.ShipmentPersonally:
    case SpisumNodeTypes.ShipmentPost:
      return formattedAddress(document.properties?.ssl);
    default:
      return "";
  }
};

export const columns: DataColumn<ShipmentDocument>[] = [
  {
    keys: [classPath(shipmentDocumentProxy.properties?.ssl?.pid).path],
    label: t(translationPath(lang.general.pid))
  },
  {
    getValue: (x) => getNameTypeMap(x.nodeType),
    keys: [classPath(shipmentDocumentProxy.nodeType).path],
    label: t(translationPath(lang.general.sendMode))
  },
  {
    getValue: selectAddressByNodeType,
    keys: [classPath(shipmentDocumentProxy.nodeType).path],
    label: t(translationPath(lang.general.addressee)),
    type: DataColumnType.html
  },
  {
    keys: [
      classPath(shipmentDocumentProxy.properties?.ssl?.internalState).path
    ],
    label: t(translationPath(lang.general.state))
  }
];

const handleSortingChange: (
  index: number,
  keys: string[]
) => (
  event: React.MouseEvent<HTMLTableRowElement, MouseEvent>
) => void = () => () => void 0;

interface OwnProps {
  isLoading: boolean;
  items: ShipmentDocument[];
  pageNumber: number;
  totalItems: number;
  refreshTable: VoidFunction;
  rowsPerPage: number;
  handleChangePage: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null,
    page: number
  ) => void;
  handleChangeRowsPerPage: (event: React.ChangeEvent<HTMLInputElement>) => void;
  controls: ControlsBarType<ShipmentDocument>;
}

const ShipmentTab = ({
  isLoading,
  items,
  totalItems,
  refreshTable,
  rowsPerPage,
  handleChangePage,
  handleChangeRowsPerPage,
  pageNumber,
  controls
}: OwnProps & WithTranslation) => {
  const dataTableValues: DataTableValues = {
    resetIcons: true
  };
  const dialogClasses = useStyles();

  return (
    <div className="body-fullsize">
      <DataTable
        breadcrumbs={[]}
        columns={columns}
        controls={controls}
        dataTableValues={dataTableValues}
        defaultActionFirst={true}
        handleChangePage={handleChangePage}
        handleChangeRowsPerPage={handleChangeRowsPerPage}
        handleSortingChange={handleSortingChange}
        pageNumber={pageNumber}
        paginationClassName={dialogClasses.tablePagination}
        pending={isLoading}
        refreshTable={refreshTable}
        rows={items}
        rowsCount={totalItems}
        rowsPerPage={rowsPerPage}
        tableLayoutClassName="dialog__table-layout"
      />
    </div>
  );
};

export default withTranslation()(React.memo(ShipmentTab));
