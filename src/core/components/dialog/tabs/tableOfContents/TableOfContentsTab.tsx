import DataTable from "core/components/dataTable";
import { ControlsBarType, DataColumn } from "core/components/dataTable/_types";
import { useStyles } from "core/components/dialog/Dialog.styles";
import { DataTableValues } from "core/components/documentView/_types";
import { SenderType } from "enums";
import React from "react";
import { classPath, translationPath } from "share/utils/getPath";
import { lang, t, withTranslation, WithTranslation } from "translation/i18n";
import { Node, SslProperties } from "../../../../api/models";
import { GenericDocument } from "../../../../types";
import {
  TableOfContentsTableType,
  TableOfContentsTableTypeProxy
} from "./_types";

export const columns: DataColumn<Node<SslProperties>>[] = [
  {
    getValue: (item) => item?.properties?.ssl?.pid,
    keys: [classPath(TableOfContentsTableTypeProxy?.properties?.ssl?.pid).path],
    label: t(translationPath(lang.general.pid))
  },
  {
    getValue: (item) => item?.properties?.ssl?.ssid,
    keys: [
      classPath(TableOfContentsTableTypeProxy?.properties?.ssl?.ssid).path
    ],
    label: t(translationPath(lang.general.ssid))
  },
  {
    getValue: (item) => item?.properties?.ssl?.subject,
    keys: [
      classPath(TableOfContentsTableTypeProxy?.properties?.ssl?.subject).path
    ],
    label: t(translationPath(lang.general.subject))
  },
  {
    getValue: (item) => {
      const ssl = item?.properties?.ssl;
      return ssl?.senderType === SenderType.Own
        ? item.createdAt
        : ssl?.deliveryDate;
    },
    isDateTime: true,
    keys: [
      classPath(TableOfContentsTableTypeProxy?.properties?.ssl?.dateOfEvidence)
        .path
    ],
    label: t(translationPath(lang.general.dateOfEvidence))
  }
];

const handleSortingChange: (
  index: number,
  keys: string[]
) => (
  event: React.MouseEvent<HTMLTableRowElement, MouseEvent>
) => void = () => () => void 0;

interface OwnProps {
  controls: ControlsBarType<GenericDocument>;
  isLoading: boolean;
  items: TableOfContentsTableType[];
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

const TableOfContentsTab = ({
  controls,
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

export default withTranslation()(React.memo(TableOfContentsTab));
