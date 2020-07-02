import MomentUtils from "@date-io/moment";
import { StyledComponent } from "@emotion/styled";
import { Theme } from "@material-ui/core";
import {
  DateTimePickerProps,
  MuiPickersUtilsProvider
} from "@material-ui/pickers";
import { DatepickerValueType } from "core/components/datepicker/_types";
import { useField, useFormikContext } from "formik";
import React, { useEffect, useState } from "react";
import { DateTimeFormats } from "../../../enums";
import { StyledDateTimePicker } from "./Component.styles";
const format: string = DateTimeFormats.FullDateTime;

interface OwnProps {
  className?: string;
  component?: StyledComponent<DateTimePickerProps, {}, Theme>;
  name: string;
  label: string;
  disableFuture?: boolean;
  disablePast?: boolean;
  disabled?: boolean;
  required?: boolean;
  style?: object;
  format?: string;
}

const Component = ({
  component: Com = StyledDateTimePicker,
  ...props
}: OwnProps) => {
  const [errorMessage, setErrorMessage] = useState<string | undefined>("");
  const [disabled, setDisabled] = useState<boolean | undefined>(props.disabled);
  const { setFieldValue, errors, isSubmitting } = useFormikContext();
  const [field] = useField(props);
  const onChange = (value: DatepickerValueType) => {
    setFieldValue(field.name, value);
  };

  useEffect(() => {
    setDisabled(props.disabled || isSubmitting);
    setErrorMessage(errors[field.name]);
  }, [errors, field, isSubmitting]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <MuiPickersUtilsProvider utils={MomentUtils}>
      <Com
        format={props.format || format}
        disabled={disabled}
        onChange={onChange}
        value={field.value}
        helperText={errorMessage}
        error={!!errorMessage}
        required={!!props.required}
        {...props}
      />
    </MuiPickersUtilsProvider>
  );
};

export default Component;
