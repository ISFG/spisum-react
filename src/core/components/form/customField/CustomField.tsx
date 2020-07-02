import { Field, FieldConfig, FieldProps } from "formik";
import React from "react";
import { AsComType } from "./_types";

interface OnwProps<Value, ComProps>
  extends Omit<FieldConfig<Value>, "component"> {
  component: React.ComponentType<AsComType<Value, ComProps>>;
  comProps?: ComProps;
}

export const CustomField = <Value, ComProps>({
  component,
  comProps,
  ...props
}: OnwProps<Value, ComProps>) => {
  const Com = component;

  const handleChange = (p: FieldProps<Value>) => (value: Value) =>
    p.field.onChange({
      target: {
        name: props.name,
        value
      }
    });

  const render = (p: FieldProps<Value>) => (
    <Com
      {...comProps}
      error={!!p.form.errors[props.name]}
      value={p.field.value}
      onChange={handleChange(p)}
    />
  );

  return <Field {...props} component={render} />;
};
