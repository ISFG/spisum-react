import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import { useStyles } from "core/components/dialog/Dialog.styles";
import FormControlWithError from "core/components/formControlWithError";
import { FormControlComponent } from "core/components/formControlWithError/_types";
import { Field } from "formik";
import { Select } from "formik-material-ui";
import { camelCase } from "lodash";
import React from "react";
import { translationPath } from "share/utils/getPath";
import { t } from "translation/i18n";
import { EnumType, Translations } from "./_types";
interface OwnProps {
  className?: string;
  component?: FormControlComponent;
  disabled?: boolean;
  enumType: EnumType;
  allowedItems?: string[];
  disabledItems?: string[];
  firstEmpty?: boolean;
  label?: string;
  name: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  translations: Translations;
}

export const EnumSelect = ({
  className,
  component,
  disabled,
  enumType,
  allowedItems,
  disabledItems,
  firstEmpty,
  label,
  name,
  onChange,
  required,
  translations
}: OwnProps) => {
  const classes = useStyles();

  const enumEntries = Object.entries(enumType);
  const entries = Array.isArray(allowedItems)
    ? enumEntries.filter(([key, value]) => allowedItems.includes(value))
    : enumEntries;

  const isDisabled = Array.isArray(disabledItems)
    ? (value: string) => disabledItems.includes(value)
    : () => false;

  return (
    <FormControlWithError
      className={className}
      component={component}
      name={name}
    >
      <InputLabel required={required} htmlFor={name}>
        {label}
      </InputLabel>
      <Field
        component={Select}
        disabled={disabled}
        name={name}
        inputProps={{
          id: name,
          onChange
        }}
      >
        {firstEmpty && <MenuItem className={classes.emptyMenuItem} value="" />}
        {entries.map(([key, value]) => {
          return (
            <MenuItem key={key} value={value} disabled={isDisabled(value)}>
              {t(translationPath(translations[camelCase(key)]))}
            </MenuItem>
          );
        })}
      </Field>
    </FormControlWithError>
  );
};
