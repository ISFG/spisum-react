import { TableCell } from "@material-ui/core";
import React from "react";
import { ColumnProps } from "./Column";

export function HtmlColumn<Row, ColumnValue>({
  columnIndex,
  columnValue
}: ColumnProps<Row, ColumnValue>) {
  return (
    <TableCell
      key={columnIndex}
      dangerouslySetInnerHTML={{ __html: (columnValue as unknown) as string }}
    />
  );
}
