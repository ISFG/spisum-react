import InputAdornment from "@material-ui/core/InputAdornment";
import { StyledField } from "core/components/dialog/Dialog.styles";
import { useFormikContext } from "formik";
import { TextField } from "formik-material-ui";
import React, { useEffect } from "react";

export interface OwnProps {
  readonly: boolean;
  name: string;
  label: string;
  className?: string;
}

export const PostPriceField = ({
  readonly,
  label,
  name,
  className = ""
}: OwnProps) => {
  const { setFieldValue, setFieldTouched } = useFormikContext();
  const formatPrice = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value =
      e.target.value !== "" ? Number(e.target.value).toFixed(2) : "";
    setFieldValue(e.target.name, value);
  };

  useEffect(() => {
    setFieldTouched(name, true, true);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <StyledField
      className={className}
      component={TextField}
      data-test-id={`create-shipment-post-${name}`}
      disabled={readonly}
      required={true}
      label={label}
      name={name}
      InputProps={{
        endAdornment: <InputAdornment position="end">Kč</InputAdornment>,
        onBlur: formatPrice
      }}
      type="number"
    />
  );
};
