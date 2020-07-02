import DataTable from "core/components/dataTable";
import { DataColumn, ValueType } from "core/components/dataTable/_types";
import { useStyles } from "core/components/dialog/Dialog.styles";
import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { File } from "../../../../entities";
import { generateColumns } from "./columns";
import { componentValidation, findMainFile } from "./methods";
import { SelectedComponentsFnType } from "./_types";
import clsx from "clsx";
import { lang, t } from "../../../../../translation/i18n";
import { translationPath } from "../../../../../share/utils/getPath";
import { useStyles as useShipmentStyles } from "../../../../../share/components/dialog/createShipmentDialog/CreateShipment.styles";
import { sumFileSizes } from "../../../../helpers/file";

const convertToKB = (value: number | undefined) => {
  if (value) {
    return (value / 1024).toFixed(1);
  }
  return 0;
};
const handleSortingChange: (
  index: number,
  keys: string[]
) => (
  event: React.MouseEvent<HTMLTableRowElement, MouseEvent>
) => void = () => () => void 0;

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
  handleRenameComponent: SelectedComponentsFnType;
  handleShowPreview: SelectedComponentsFnType;
  handleSelectionChange: SelectedComponentsFnType;
  handleIsComponentDeletable: (component: File) => boolean;
  isLoading?: boolean;
  selected?: File[];
  isReadonly?: boolean;
  items: File[];
  pageNumber: number;
  refreshTable: VoidFunction;
  nodeType: string;
}

const ComponentsTab = <T,>({
  handleChangePage,
  handleChangeRowsPerPage,
  handleSelectionChange,
  isLoading = false,
  isReadonly,
  selected,
  items,
  nodeType
}: OwnProps<T>) => {
  const classes = useShipmentStyles();
  useTranslation();
  const dialogClasses = useStyles();

  const cols = useMemo(() => generateColumns(findMainFile(items), true), [
    items
  ]);

  const selectedSize = useMemo(() => (selected ? sumFileSizes(selected) : 0), [
    selected
  ]);
  const { isTooBig, isWrongCountOfFiles } = componentValidation(
    selected,
    nodeType
  );

  return (
    <div className="body-fullsize">
      <DataTable
        breadcrumbs={[]}
        columns={cols}
        defaultActionFirst={true}
        handleChangePage={handleChangePage}
        handleChangeRowsPerPage={handleChangeRowsPerPage}
        handleSelectionChange={handleSelectionChange}
        handleSortingChange={handleSortingChange}
        pageNumber={0}
        paginationClassName={dialogClasses.tablePaginationDisabled}
        pending={isLoading}
        rows={items}
        rowsCount={10}
        rowsPerPage={100}
        selected={selected}
        tableLayoutClassName="dialog__table-layout--shipment"
        tableWrapperClassName={classes.dialogShipmentTable}
      />
      <div className={clsx(dialogClasses.fullWidth, classes.tableInfo)}>
        <span
          className={clsx(
            dialogClasses.mrGap,
            {
              [classes.tableInfoItemError]: isWrongCountOfFiles
            },
            classes.tableInfoCountItem
          )}
        >
          {t(translationPath(lang.general.attachmentsCount))}
          {": "}
          {selected?.length || 0}
        </span>
        <span
          className={clsx(
            {
              [classes.tableInfoItemError]: isTooBig
            },
            classes.tableInfoSizeItem
          )}
        >
          {t(translationPath(lang.general.totalSize))}
          {": "}
          {convertToKB(selectedSize)} kB
        </span>
      </div>
    </div>
  );
};

const typedMemo: <T>(c: T) => T = React.memo;
export default typedMemo(ComponentsTab);
