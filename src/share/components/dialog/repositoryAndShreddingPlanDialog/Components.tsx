import DataTable from "core/components/dataTable";
import { ControlsBarType, DataColumn } from "core/components/dataTable/_types";
import { useStyles } from "core/components/dialog/Dialog.styles";
import { ShreddingPlan } from "core/features/login/_types";
import React from "react";
import { lang, t } from "translation/i18n";
import { translationPath } from "../../../utils/getPath";

export type SortChangeFnType = (
  index: number,
  keys: string[]
) => (event: React.MouseEvent<HTMLTableRowElement, MouseEvent>) => void;

interface OwnProps<T> {
  controls: ControlsBarType<ShreddingPlan>;
  handleChangePage: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null,
    page: number
  ) => void;
  handleChangeRowsPerPage: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleSortingChange: SortChangeFnType;
  items: ShreddingPlan[];
  pageNumber: number;
  rowsPerPage: number;
  sortAsc?: boolean;
  sortColumnIndex?: number | null;
  totalItems: number;
  selected?: ShreddingPlan[];
  handleSelectionChange?: (items: ShreddingPlan[]) => void;
}

export const columns: DataColumn<ShreddingPlan>[] = [
  {
    keys: ["name"],
    label: t(translationPath(lang.general.name))
  }
];

const Components = <T,>({
  controls,
  handleChangePage,
  handleChangeRowsPerPage,
  handleSortingChange,
  items,
  pageNumber,
  rowsPerPage,
  sortAsc,
  sortColumnIndex,
  totalItems,
  selected,
  handleSelectionChange
}: OwnProps<T>) => {
  const dialogClasses = useStyles();

  return (
    <DataTable
      controls={controls}
      breadcrumbs={[]}
      columns={columns}
      handleChangePage={handleChangePage}
      handleChangeRowsPerPage={handleChangeRowsPerPage}
      handleSortingChange={handleSortingChange}
      handleSelectionChange={handleSelectionChange}
      pageNumber={pageNumber}
      paginationClassName={dialogClasses.tablePagination}
      pending={false}
      rows={items}
      rowsCount={totalItems}
      rowsPerPage={rowsPerPage}
      selected={selected}
      sortAsc={sortAsc}
      sortColumnIndex={sortColumnIndex}
      tableLayoutClassName="dialog__table-layout"
    />
  );
};

const typedMemo: <T>(c: T) => T = React.memo;
export default typedMemo(Components);
