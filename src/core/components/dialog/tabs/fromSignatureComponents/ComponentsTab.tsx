import DataTable from "core/components/dataTable";
import { DataColumn, ValueType } from "core/components/dataTable/_types";
import { useStyles } from "core/components/dialog/Dialog.styles";
import { DataTableValues } from "core/components/documentView/_types";
import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { RootStateType } from "reducers";
import { File } from "../../../../entities";
import { generateColumns } from "./columns";
import { controls, readOnlyControls } from "./controls";
import { findMainFile } from "./methods";
import { SelectedComponentFnType, SelectedComponentsFnType } from "./_types";

export type SortChangeFnType = (
  index: number,
  keys: string[]
) => (event: React.MouseEvent<HTMLTableRowElement, MouseEvent>) => void;

interface OwnProps<T> {
  handleChangePage: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null,
    page: number
  ) => void;
  handleChangeRowsPerPage: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleColumnChange: (
    row: File,
    column: DataColumn<File>,
    value: ValueType
  ) => void;
  handleCanShowPreview: (component: File) => boolean;
  handleShowPreview: SelectedComponentsFnType;
  handleSign: SelectedComponentsFnType;
  handleSortingChange: SortChangeFnType;
  handleCustomRowClick: SelectedComponentFnType;
  isLoading?: boolean;
  isReadonly?: boolean;
  isRowDisabled: (component: File) => boolean;
  items: File[];
  pageNumber: number;
  refreshTable: VoidFunction;
  rowsPerPage: number;
  sortAsc?: boolean;
  sortColumnIndex?: number | null;
  totalItems: number;
  selectedComponents?: File[];
  handleSelectionChange?: (items: File[]) => void;
}

const ComponentsTab = <T,>({
  handleChangePage,
  handleChangeRowsPerPage,
  handleColumnChange,
  handleSign,
  handleSortingChange,
  handleCustomRowClick,
  isLoading = false,
  isReadonly,
  isRowDisabled,
  items,
  pageNumber,
  refreshTable,
  rowsPerPage,
  sortAsc,
  sortColumnIndex,
  totalItems,
  selectedComponents,
  handleSelectionChange
}: OwnProps<T>) => {
  const { signer } = useSelector(
    (state: RootStateType) => state.loginReducer.session
  );
  const dataTableValues: DataTableValues = {
    resetIcons: true
  };
  useTranslation();
  const dialogClasses = useStyles();
  const cols = useMemo(() => generateColumns(findMainFile(items), isReadonly), [
    items,
    isReadonly
  ]);

  return (
    <div className="body-fullsize">
      <DataTable
        controls={
          !isReadonly
            ? controls({
                handleSign,
                signer
              })
            : readOnlyControls({
                handleSign,
                signer
              })
        }
        breadcrumbs={[]}
        columns={cols}
        dataTableValues={dataTableValues}
        defaultActionFirst={true}
        handleChangePage={handleChangePage}
        handleChangeRowsPerPage={handleChangeRowsPerPage}
        handleColumnChange={handleColumnChange}
        handleSortingChange={handleSortingChange}
        handleSelectionChange={handleSelectionChange}
        handleCustomRowClick={handleCustomRowClick}
        isRowDisabled={isRowDisabled}
        pageNumber={pageNumber}
        paginationClassName={dialogClasses.tablePagination}
        pending={isLoading}
        readonly={!!isReadonly}
        refreshTable={refreshTable}
        rows={items}
        rowsCount={totalItems}
        rowsPerPage={rowsPerPage}
        sortAsc={sortAsc}
        sortColumnIndex={sortColumnIndex}
        tableLayoutClassName="dialog__table-layout"
        selected={selectedComponents}
      />
    </div>
  );
};

const typedMemo: <T>(c: T) => T = React.memo;
export default typedMemo(ComponentsTab);
