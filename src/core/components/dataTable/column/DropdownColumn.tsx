import { MenuItem, Select, TableCell } from "@material-ui/core";
import React, { useMemo } from "react";
import { ColumnProps } from "./Column";

export function DropDownColumn<Row, ColumnValue>({
  row,
  columnValue,
  column,
  onChange,
  disabled
}: ColumnProps<Row, ColumnValue>) {
  const handleColumnChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    if (columnValue === event.target.value) return;
    onChange?.(column, event.target.value as ColumnValue);
  };

  const items = useMemo(
    () =>
      column.getDropdownItems
        ? column.getDropdownItems(row)
        : column.dropdownItems,
    [row, column]
  );

  return (
    <TableCell>
      <Select
        value={columnValue}
        onChange={handleColumnChange}
        disabled={disabled}
      >
        {items &&
          items?.map((v, k) => (
            <MenuItem key={k} value={v.value}>
              {v.text}
            </MenuItem>
          ))}
      </Select>
    </TableCell>
  );
}
