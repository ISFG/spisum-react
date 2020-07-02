import React from "react";
import { DataColumn, DataColumnType } from "../_types";
import { DefaultColumn } from "./DefaultColumn";
import { DropDownColumn } from "./DropdownColumn";
import { FileSizeColumn } from "./FileSizeColumn";
import { HtmlColumn } from "./HtmlColumn";

export interface ColumnProps<Row, ColumnValue> {
  row: Row;
  column: DataColumn<Row>;
  columnIndex: number;
  columnValue: ColumnValue;
  onChange?: (column: DataColumn<Row>, value: ColumnValue) => void;
  disabled?: boolean;
}

const columnComponents = {
  [DataColumnType.default]: DefaultColumn,
  [DataColumnType.dropdown]: DropDownColumn,
  [DataColumnType.fileSize]: FileSizeColumn,
  [DataColumnType.html]: HtmlColumn
};

export function Column<Row, ColumnValue>(props: ColumnProps<Row, ColumnValue>) {
  const { column } = props;

  const Com = column.type
    ? columnComponents[column.type]
    : columnComponents.default;

  return <Com<Row, ColumnValue> {...props} />;
}
