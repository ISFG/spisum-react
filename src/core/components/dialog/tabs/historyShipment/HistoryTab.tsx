import DataTable from "core/components/dataTable";
import { DataColumn } from "core/components/dataTable/_types";
import { useStyles } from "core/components/dialog/Dialog.styles";
import { DataTableValues } from "core/components/documentView/_types";
import React from "react";
import { classPath, translationPath } from "share/utils/getPath";
import { lang, t, withTranslation, WithTranslation } from "translation/i18n";
import {
  ShipmentHistoryTableType,
  shipmentHistoryTableTypeProxy
} from "./_types";

export const columns: DataColumn<ShipmentHistoryTableType>[] = [
  {
    keys: [classPath(shipmentHistoryTableTypeProxy.pid).path],
    label: t(translationPath(lang.general.identifier))
  },
  {
    isDate: true,
    keys: [classPath(shipmentHistoryTableTypeProxy.createdAt).path],
    label: t(translationPath(lang.general.creationDate))
  },
  {
    keys: [classPath(shipmentHistoryTableTypeProxy.description).path],
    label: t(translationPath(lang.general.narration))
  },
  {
    keys: [classPath(shipmentHistoryTableTypeProxy.createdBy).path],
    label: t(translationPath(lang.general.authorOfTheChange))
  },
  {
    keys: [classPath(shipmentHistoryTableTypeProxy.type).path],
    label: t(translationPath(lang.general.eventType))
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
  items: ShipmentHistoryTableType[];
  pageNumber: number;
  totalItems: number;
  refreshTable: VoidFunction;
  rowsPerPage: number;
  handleChangePage: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null,
    page: number
  ) => void;
  handleChangeRowsPerPage: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const HistoryTab = ({
  isLoading,
  items,
  totalItems,
  refreshTable,
  rowsPerPage,
  handleChangePage,
  handleChangeRowsPerPage,
  pageNumber
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

export default withTranslation()(React.memo(HistoryTab));
