import DataTable from "core/components/dataTable";
import { DataColumn, ValueType } from "core/components/dataTable/_types";
import { useStyles } from "core/components/dialog/Dialog.styles";
import { DataTableValues } from "core/components/documentView/_types";
import { File } from "core/entities";
import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { generateColumns } from "./columns";
import { controls, readOnlyControls } from "./controls";
import { findMainFile } from "./methods";
import { SelectedComponentsFnType } from "./_types";

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
  handleDeleteComponent: SelectedComponentsFnType;
  handleDownloadComponent: SelectedComponentsFnType;
  handleRenameComponent: SelectedComponentsFnType;
  handleShowPreview: SelectedComponentsFnType;
  handleSelectionChange: SelectedComponentsFnType;
  handleSortingChange: SortChangeFnType;
  handleSwapComponentContent: (
    components: File[],
    files: globalThis.File[]
  ) => void;
  handleUploadComponent: (files: globalThis.File[]) => void;
  handleIsComponentDeletable: (component: File) => boolean;
  isLoading?: boolean;
  isReadonly?: boolean;
  items: File[];
  pageNumber: number;
  refreshTable: VoidFunction;
  rowsPerPage: number;
  sortAsc?: boolean;
  sortColumnIndex?: number | null;
  totalItems: number;
}

const ComponentsTab = <T,>({
  handleChangePage,
  handleChangeRowsPerPage,
  handleColumnChange,
  handleDeleteComponent,
  handleDownloadComponent,
  handleIsComponentDeletable,
  handleRenameComponent,
  handleShowPreview,
  handleSelectionChange,
  handleSortingChange,
  handleSwapComponentContent,
  handleUploadComponent,
  isLoading = false,
  isReadonly,
  items,
  pageNumber,
  refreshTable,
  rowsPerPage,
  sortAsc,
  sortColumnIndex,
  totalItems
}: OwnProps<T>) => {
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
                handleDeleteComponent,
                handleDownloadComponent,
                handleIsComponentDeletable,
                handleRenameComponent,
                handleShowPreview,
                handleSwapComponentContent,
                handleUploadComponent
              })
            : readOnlyControls({ handleShowPreview })
        }
        breadcrumbs={[]}
        columns={cols}
        dataTableValues={dataTableValues}
        defaultActionFirst={true}
        handleChangePage={handleChangePage}
        handleChangeRowsPerPage={handleChangeRowsPerPage}
        handleColumnChange={handleColumnChange}
        handleSelectionChange={handleSelectionChange}
        handleSortingChange={handleSortingChange}
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
      />
    </div>
  );
};

const typedMemo: <T>(c: T) => T = React.memo;
export default typedMemo(ComponentsTab);
