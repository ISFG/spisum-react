import MomentUtils from "@date-io/moment";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import clsx from "clsx";
import { DateTimeFormats } from "enums";
import { useField, useFormikContext } from "formik";
import React, { useEffect, useState } from "react";
import { useStyles } from "../datepicker/Component.styles";
import { DatepickerValueType } from "../datepicker/_types";
import { StyledKeyboardTimePicker } from "./Component.styles";

interface OwnProps {
  className?: string;
  disabled?: boolean;
  label: string;
  name: string;
  required?: boolean;
  value?: string;
  style?: object;
  format?: string;
  showCalendarIcon?: boolean;
}

const Component = ({ showCalendarIcon = true, ...props }: OwnProps) => {
  const classes = useStyles();
  const { setFieldValue, errors, isSubmitting } = useFormikContext();
  const [disabled, setDisabled] = useState<boolean | undefined>(props.disabled);
  const [errorMessage, setErrorMessage] = useState<string | undefined>("");
  const [field] = useField(props);
  const onChange = (value: DatepickerValueType) => {
    setFieldValue(field.name, value);
  };

  useEffect(() => {
    setDisabled(props.disabled || isSubmitting);
    setErrorMessage(errors[field.name]);
  }, [errors, field]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <MuiPickersUtilsProvider utils={MomentUtils}>
      <StyledKeyboardTimePicker
        className={clsx({
          [classes.noDatepickerIcon]: disabled || !showCalendarIcon
        })}
        ampm={false}
        disabled={disabled}
        disableToolbar={true}
        error={!!errorMessage}
        format={props.format || DateTimeFormats.HoursMinutes}
        helperText={errorMessage}
        margin="none"
        onChange={onChange}
        required={!!props.required}
        value={field.value}
        {...props}
      />
    </MuiPickersUtilsProvider>
  );
};

export default Component;
