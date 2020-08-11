import MomentUtils from "@date-io/moment";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import { DateTimeFormats } from "enums";
import { useField, useFormikContext } from "formik";
import moment from "moment";
import "moment/locale/cs";
import React, { useEffect, useState } from "react";
import { translationPath } from "share/utils/getPath";
import { t } from "translation/i18n";
import lang from "translation/lang";
import { DatepickerValueType } from "../datepicker/_types";
import { StyledKeyboardTimePicker } from "./Component.styles";

moment.locale("cs");

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
  const { setFieldValue, errors, isSubmitting } = useFormikContext();
  const [disabled, setDisabled] = useState<boolean | undefined>(props.disabled);
  const [errorMessage, setErrorMessage] = useState<string | undefined>("");
  const [field] = useField(props);
  const hideIcon = disabled || !showCalendarIcon;
  const onChange = (value: DatepickerValueType) => {
    setFieldValue(field.name, value);
  };

  useEffect(() => {
    setDisabled(props.disabled || isSubmitting);
    setErrorMessage(errors[field.name]);
  }, [errors, field]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <MuiPickersUtilsProvider
      libInstance={moment}
      utils={MomentUtils}
      locale={"cs"}
    >
      <StyledKeyboardTimePicker
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
        okLabel={t(translationPath(lang.dialog.buttons.confirm))}
        cancelLabel={t(translationPath(lang.modal.cancel))}
        keyboardIcon={hideIcon ? <></> : <AccessTimeIcon />}
        {...props}
      />
    </MuiPickersUtilsProvider>
  );
};

export default Component;
