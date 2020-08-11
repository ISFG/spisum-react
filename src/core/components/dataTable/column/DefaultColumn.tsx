import { TableCell } from "@material-ui/core";
import clsx from "clsx";
import React from "react";
import { formatDate } from "share/utils/convert";
import { translationPath } from "share/utils/getPath";
import { lang, t } from "translation/i18n";
import { useStyles } from "../Component.styles";
import { DataColumn } from "../_types";
import { ColumnProps } from "./Column";

export function DefaultColumn<Row, ColumnValue>({
  columnIndex,
  columnValue,
  column
}: ColumnProps<Row, ColumnValue>) {
  const classes = useStyles();

  return (
    <TableCell
      key={columnIndex}
      className={clsx((column.isDate || column.isDateTime) && classes.date)}
    >
      {getFormattedValue<Row, ColumnValue>(column, columnValue)}
    </TableCell>
  );
}

const getFormattedValue = <Row, ColumnValue>(
  { isDate, isDateTime, isBoolean }: DataColumn<Row>,
  value: ColumnValue
) => {
  if (value === null || value === undefined) {
    return value;
  }
  if (isDate) {
    return formatDate(((value as unknown) as string) || "", "");
  }
  if (isDateTime) {
    return formatDate(((value as unknown) as string) || "");
  }
  if (isBoolean) {
    return t(translationPath(value ? lang.general.yes : lang.general.no));
  }
  const rows = ((value as unknown) as string).toString().split("\n");
  return rows.length > 1
    ? rows.map((item, key) => {
        return <div key={key}>{item}</div>;
      })
    : value;
};
