import { TableCell, TableRow } from "@material-ui/core";
import Checkbox from "@material-ui/core/Checkbox";
import { get } from "lodash";
import React from "react";
import { Column } from "./column/Column";
import { useStyles } from "./Component.styles";
import { DataColumn, ValueType } from "./_types";

export interface RowProps<T> {
  row: T;
  columns: DataColumn<T>[];
  hideCheckbox?: boolean;
  readonly?: boolean;
  onColumnChange?: (row: T, column: DataColumn<T>, value: ValueType) => void;
  onRowClick: (event: React.MouseEvent, row: T) => void;
  onRowDoubleClick: (row: T) => void;
  selected: boolean;
  rowDisabled?: boolean;
}

export function Row<T>(props: RowProps<T>) {
  const {
    row,
    columns,
    hideCheckbox,
    readonly,
    onColumnChange,
    onRowClick,
    onRowDoubleClick,
    selected,
    rowDisabled
  } = props;
  const classes = useStyles();
  const id = get(row, "id");

  const handleRowClick = (event: React.MouseEvent) => onRowClick(event, row);
  const handleRowDoubleClick = () => onRowDoubleClick(row);
  const handleColumnChange = (column: DataColumn<T>, value: ValueType) =>
    onColumnChange?.(row, column, value);

  return (
    <TableRow
      className={rowDisabled ? classes.rowDisabled : ""}
      selected={selected}
      key={id}
      hover={true}
      onClick={handleRowClick}
      onDoubleClick={handleRowDoubleClick}
    >
      {!hideCheckbox && (
        <TableCell padding="checkbox">
          <Checkbox
            checked={selected}
            className={rowDisabled ? classes.checkboxDisabled : ""}
          />
        </TableCell>
      )}
      {columns.map((column, columnIndex) => {
        const { getValue, keys } = column;
        const key = keys && keys[0];
        const columnValue = getValue ? getValue(row) : key && get(row, key, "");

        return (
          <Column
            key={columnIndex}
            columnIndex={columnIndex}
            column={column}
            columnValue={columnValue}
            onChange={handleColumnChange}
            disabled={readonly}
            row={row}
          />
        );
      })}
    </TableRow>
  );
}
