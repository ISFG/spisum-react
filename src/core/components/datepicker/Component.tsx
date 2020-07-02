import MomentUtils from "@date-io/moment";
import { StyledComponent } from "@emotion/styled";
import { Theme } from "@material-ui/core";
import { DatePickerProps, MuiPickersUtilsProvider } from "@material-ui/pickers";
import clsx from "clsx";
import { DatepickerValueType } from "core/components/datepicker/_types";
import { useField, useFormikContext } from "formik";
import React, { useEffect, useState } from "react";
import { DateTimeFormats } from "../../../enums";
import { StyledDatePicker, useStyles } from "./Component.styles";

const format: string = DateTimeFormats.Date;

interface OwnProps {
  className?: string;
  component?: StyledComponent<DatePickerProps, {}, Theme>;
  disabled?: boolean;
  disableFuture?: boolean;
  disablePast?: boolean;
  format?: string;
  label: string;
  name: string;
  onDateChange?: (value: DatepickerValueType) => void;
  required?: boolean;
  showCalendarIcon?: boolean;
  style?: object;
}

const Component = ({
  component: Com = StyledDatePicker,
  ...props
}: OwnProps) => {
  const classes = useStyles();
  const [errorMessage, setErrorMessage] = useState<string | undefined>("");
  const [disabled, setDisabled] = useState<boolean | undefined>(props.disabled);
  const { setFieldValue, errors, isSubmitting } = useFormikContext();
  const { onDateChange, showCalendarIcon = true, ...fieldProps } = props;
  const [field] = useField(fieldProps);

  const handleOnChange = (value: DatepickerValueType) => {
    setFieldValue(field.name, value);

    if (onDateChange) {
      onDateChange(value);
    }
  };

  useEffect(() => {
    setDisabled(props.disabled || isSubmitting);
    setErrorMessage(errors[field.name]);
  }, [errors, field, isSubmitting]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <MuiPickersUtilsProvider utils={MomentUtils}>
      <Com
        className={clsx({
          [classes.noDatepickerIcon]: disabled || !showCalendarIcon
        })}
        format={props.format || format}
        disabled={disabled}
        margin="none"
        onChange={handleOnChange}
        value={field.value}
        helperText={errorMessage}
        error={!!errorMessage}
        required={!!props.required}
        {...fieldProps}
      />
    </MuiPickersUtilsProvider>
  );
};

export default Component;
