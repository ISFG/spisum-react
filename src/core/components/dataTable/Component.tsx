import {
  Grid,
  LabelDisplayedRowsArgs,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel
} from "@material-ui/core";
import Checkbox from "@material-ui/core/Checkbox";
import clsx from "clsx";
import { unionBy } from "lodash";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { translationPath } from "share/utils/getPath";
import { lang, t } from "translation/i18n";
import { useSafeSetState } from "../../hooks/useSafeSetState";
import { DataTableValues, DocumentViewType } from "../documentView/_types";
import ActionBar from "./ActionBar";
import {
  PaperLayout,
  TableContainerLayout,
  useStyles,
  Wrapper
} from "./Component.styles";
import Loading from "./Loading";
import NoData from "./NoData";
import { Row, RowProps } from "./Row";
import { ControlsBarType, DataColumn } from "./_types";

interface OwnProps<T> {
  breadcrumbs: string[];
  columns: DataColumn<T>[];
  controls?: ControlsBarType<T>;
  customTitle?: string;
  customActionBarClassName?: string;
  dataTableValues?: DataTableValues;
  defaultActionFirst?: boolean;
  footerText?: string;
  readonly?: boolean;
  isRowDisabled?: (row: T) => boolean;
  handleCheckboxRowClick?: (row: T) => void;
  handleCustomRowClick?: (row: T) => void;
  handleDoubleClick?: (row: T) => void;
  handleSortingChange: (
    index: number,
    keys: string[]
  ) => (event: React.MouseEvent<HTMLTableRowElement, MouseEvent>) => void;
  handleChangePage: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null,
    page: number
  ) => void;
  handleChangeRowsPerPage: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleColumnChange?: RowProps<T>["onColumnChange"];
  handleSelectionChange?: (selection: T[]) => void;
  hideCheckbox?: boolean;
  pageNumber: number;
  pending?: boolean;
  refreshPending?: boolean;
  refreshTable?: VoidFunction;
  rows: T[];
  rowsCount: number;
  rowsPerPage: number;
  selected?: T[];
  sortAsc?: boolean;
  sortColumnIndex?: number | null;
  paginationClassName?: string;
  tableLayoutClassName?: string;
  tableWrapperClassName?: string;
}

const MIN_LOADING_TIME = 1500;

const voidFunction = () => {};

const DataTable = <T extends DocumentViewType>(props: OwnProps<T>) => {
  const {
    breadcrumbs,
    controls,
    columns,
    customTitle,
    customActionBarClassName,
    dataTableValues,
    defaultActionFirst,
    footerText,
    readonly,
    handleDoubleClick,
    handleCheckboxRowClick,
    handleCustomRowClick,
    handleChangePage,
    handleChangeRowsPerPage,
    handleSortingChange,
    handleColumnChange,
    handleSelectionChange,
    hideCheckbox,
    isRowDisabled,
    pageNumber,
    pending,
    refreshPending,
    refreshTable,
    rows,
    rowsCount,
    rowsPerPage,
    sortAsc,
    sortColumnIndex,
    paginationClassName,
    tableLayoutClassName = "",
    tableWrapperClassName = ""
  } = props;

  useTranslation();
  const classes = useStyles();

  const [selectedInState, setSelectedInState] = useSafeSetState<T[]>([]);
  const selected = props.selected || selectedInState;
  const [minLoadingTimePassed, setMinLoadingTimePassed] = useSafeSetState<
    boolean
  >(!pending);

  // Minimal loading time
  useEffect(() => {
    if (!pending) return;
    setMinLoadingTimePassed(false);
    window.setTimeout(() => {
      setMinLoadingTimePassed(true);
    }, MIN_LOADING_TIME);
  }, [pending]); // eslint-disable-line react-hooks/exhaustive-deps

  const setSelected = (items: T[]) => {
    setSelectedInState(items);
    handleSelectionChange?.(items);
  };

  useEffect(() => {
    if (dataTableValues && dataTableValues.resetIcons) {
      dataTableValues.resetIcons = false;
      setSelected(selected);
    }
  }, [dataTableValues]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleSelected = (
    row: T,
    append: boolean,
    alreadySelected: boolean
  ) => {
    if (append) {
      if (alreadySelected) {
        return setSelected(selected.filter((s) => s.id !== row.id));
      }
      setSelected(unionBy([...selected, row], "id"));
    } else {
      setSelected([row]);
    }
  };

  const handleRowClick = (event: React.MouseEvent, row: T) => {
    const target = event.target as HTMLElement;
    const alreadySelected = isSelected(row);

    if (!isRowDisabled?.(row)) {
      if (target.tagName === "TD") {
        const e = event as React.MouseEvent<HTMLTableRowElement>;
        // metaKey for MacOS system cmd key instead of ctrl
        handleSelected(
          row,
          e.ctrlKey || e.metaKey || alreadySelected,
          alreadySelected
        );
        handleCustomRowClick?.(row);
      } else if (
        target.tagName === "INPUT" &&
        (target as HTMLInputElement).type === "checkbox"
      ) {
        handleSelected(row, true, alreadySelected);
        handleCheckboxRowClick?.(row);
      }
    }
  };

  const handleRowDoubleClick = (row: T) => handleDoubleClick?.(row);

  const handleAllRowsSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const validRows = isRowDisabled
        ? rows.filter((row) => !isRowDisabled?.(row))
        : rows;
      setSelected(validRows as T[]);
      return;
    }
    setSelected([]);
  };

  const selectedIds = selected.map((s) => s.id);
  const isSelected = (row: T) =>
    selectedIds.findIndex((sId) => sId === row.id) !== -1;

  const refreshPendingText = t(
    translationPath(lang.general.refreshPendingTableText)
  );

  const PaginatorWrapper: React.FC = ({ children }) => {
    return (
      <div className={clsx(classes.pagination, paginationClassName)}>
        <Grid container={true}>
          <Grid className={classes.footerText} item={true} xs={6}>
            {refreshPending ? refreshPendingText : footerText}
          </Grid>
          <Grid item={true} xs={6}>
            {children}
          </Grid>
        </Grid>
      </div>
    );
  };
  const labelDisplayedRows = ({ from, to, count }: LabelDisplayedRowsArgs) =>
    `${from}-${to} ${t(translationPath(lang.general.from))} ${
      count !== -1
        ? count
        : `${t(translationPath(lang.general.moreThan))} ${to}`
    }`;
  return (
    <Wrapper className={tableWrapperClassName}>
      <ActionBar<T>
        breadcrumbs={breadcrumbs}
        controls={controls}
        customTitle={customTitle}
        customActionBarClassName={customActionBarClassName}
        refreshTable={refreshTable || voidFunction}
        selected={rows.filter(isSelected)}
        refreshPending={refreshPending}
        defaultActionFirst={defaultActionFirst}
      />
      <TableContainerLayout
        className={clsx(classes.height, tableLayoutClassName)}
      >
        <TableContainer className={classes.container} component={PaperLayout}>
          {((pending || !minLoadingTimePassed) && <Loading />) ||
            (rows && rows.length && (
              <Table
                stickyHeader={true}
                aria-label="Data Table"
                className={classes.table}
              >
                <TableHead className={classes.tableHead}>
                  <TableRow>
                    {!hideCheckbox && (
                      <TableCell padding="checkbox">
                        <Checkbox
                          // indeterminate={numSelected > 0 && numSelected < rowsCount}
                          // checked={rowsCount > 0 && numSelected === rowsCount}
                          onChange={handleAllRowsSelect}
                        />
                      </TableCell>
                    )}
                    {columns &&
                      columns.length &&
                      columns.map((column) => {
                        const index = columns.indexOf(column);
                        return (
                          <TableCell
                            key={index}
                            sortDirection={
                              sortColumnIndex === index
                                ? sortAsc === true
                                  ? "asc"
                                  : "desc"
                                : false
                            }
                          >
                            <TableSortLabel
                              active={sortColumnIndex === index}
                              direction={
                                sortColumnIndex === index
                                  ? sortAsc === true
                                    ? "asc"
                                    : "desc"
                                  : "desc"
                              }
                              onClick={handleSortingChange(
                                index,
                                column.sortKeys || column.keys || []
                              )}
                            >
                              {column.label}
                            </TableSortLabel>
                          </TableCell>
                        );
                      })}
                  </TableRow>
                </TableHead>
                <TableBody className={classes.tbody}>
                  {rows.map((row, rowIndex) => (
                    <Row
                      key={rowIndex}
                      row={row}
                      columns={columns}
                      hideCheckbox={hideCheckbox}
                      readonly={readonly}
                      selected={isSelected(row)}
                      onRowClick={handleRowClick}
                      onRowDoubleClick={handleRowDoubleClick}
                      onColumnChange={handleColumnChange}
                      rowDisabled={isRowDisabled?.(row)}
                    />
                  ))}
                </TableBody>
              </Table>
            )) || <NoData />}
          <TablePagination
            backIconButtonText={t(translationPath(lang.general.previousPage))}
            rowsPerPageOptions={[10, 25, 50, 100]}
            component={PaginatorWrapper}
            count={rowsCount}
            labelDisplayedRows={labelDisplayedRows}
            labelRowsPerPage={t(translationPath(lang.table.rowsPerPage))}
            nextIconButtonText={t(translationPath(lang.general.nextPage))}
            rowsPerPage={rowsPerPage}
            page={pageNumber}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />
        </TableContainer>
      </TableContainerLayout>
    </Wrapper>
  );
};

export default DataTable;
