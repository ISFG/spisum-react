import MomentUtils from "@date-io/moment";
import { StyledComponent } from "@emotion/styled";
import EventIcon from "@material-ui/icons/Event";
import {
  DatePickerProps,
  KeyboardDatePickerProps,
  MuiPickersUtilsProvider
} from "@material-ui/pickers";
import { DatepickerValueType } from "core/components/datepicker/_types";
import { useField, useFormikContext } from "formik";
import moment from "moment";
import "moment/locale/cs";
import React, { useEffect, useState } from "react";
import { translationPath } from "share/utils/getPath";
import { ITheme } from "styles";
import { t } from "translation/i18n";
import lang from "translation/lang";
import { DateTimeFormats } from "../../../enums";
import { StyledKeyboardDatePicker } from "./Component.styles";

moment.locale("cs");

const format: string = DateTimeFormats.Date;

interface OwnProps {
  className?: string;
  component?: StyledComponent<
    DatePickerProps | KeyboardDatePickerProps,
    {},
    ITheme
  >;
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
  component: Com = StyledKeyboardDatePicker,
  ...props
}: OwnProps) => {
  const [errorMessage, setErrorMessage] = useState<string | undefined>("");
  const [disabled, setDisabled] = useState<boolean | undefined>(props.disabled);
  const { setFieldValue, errors, isSubmitting } = useFormikContext();
  const { onDateChange, showCalendarIcon = true, ...fieldProps } = props;
  const [field] = useField(fieldProps);
  const hideIcon = disabled || !showCalendarIcon;

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
    <MuiPickersUtilsProvider
      libInstance={moment}
      utils={MomentUtils}
      locale={"cs"}
    >
      <Com
        format={props.format || format}
        disabled={disabled}
        margin="none"
        onChange={handleOnChange}
        value={field.value}
        helperText={errorMessage}
        error={!!errorMessage}
        required={!!props.required}
        okLabel={t(translationPath(lang.dialog.buttons.confirm))}
        cancelLabel={t(translationPath(lang.modal.cancel))}
        keyboardIcon={hideIcon ? <></> : <EventIcon />}
        {...fieldProps}
      />
    </MuiPickersUtilsProvider>
  );
};

export default Component;
