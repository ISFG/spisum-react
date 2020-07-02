import { Field, useFormikContext } from "formik";
import { FieldAttributes } from "formik/dist/Field";
import React from "react";
const MAX_INPUT_LENGTH = 20;

// props type is copied from Formik's types, so the any is inevitable
// tslint:disable-next-line
export const BaseField = (props: FieldAttributes<any>) => {
  const { values } = useFormikContext<Document>();
  const { name, disabled } = props;
  const value = values[name];
  const maxLengthExceeded = value?.toString()?.length > MAX_INPUT_LENGTH;
  const title = maxLengthExceeded && disabled ? value : "";
  return <Field {...props} title={title} />;
};
