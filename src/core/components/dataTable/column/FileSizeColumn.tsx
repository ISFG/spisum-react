import { TableCell } from "@material-ui/core";
import fileSize from "filesize";
import React from "react";
import { ColumnProps } from "./Column";

export const FileSizeColumn = <Row, ColumnValue>({
  columnValue,
  columnIndex
}: ColumnProps<Row, ColumnValue>) => (
  <TableCell key={columnIndex}>{fileSize(Number(columnValue))}</TableCell>
);
