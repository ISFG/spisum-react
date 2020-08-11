import { CircularProgress, TextField } from "@material-ui/core";
import {
  AutocompleteChangeDetails,
  AutocompleteChangeReason,
  FilterOptionsState
} from "@material-ui/lab";
import { GroupMember } from "core/api/models";
import { FieldProps, FormikHelpers, useFormikContext } from "formik";
import { fieldToTextField } from "formik-material-ui";
import React, { ChangeEvent, useEffect, useState } from "react";
import { translationPath } from "share/utils/getPath";
import { lang, t } from "translation/i18n";
import { FormValues } from "../MetaForm/_types";
import { useStyles } from "./Component.styles";
import {
  AutocompleteComponentType,
  AutocompleteOptionsType,
  PossibleAutocompleteOptions
} from "./_types";

interface OwnProps {
  autocompleteComponent: AutocompleteComponentType;
  label: string;
  loading?: boolean;
  disabled?: boolean;
  disableOnLoad?: boolean;
  options: AutocompleteOptionsType;
  getOptionLabel: (values: PossibleAutocompleteOptions) => string;
  form: FormikHelpers<FormValues>;
  optionValueProperty?: string;
  filterOptions?: (
    opts: AutocompleteOptionsType,
    state: FilterOptionsState<PossibleAutocompleteOptions>
  ) => AutocompleteOptionsType;
  required?: boolean;
  onInputChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const FormikAutocomplete = ({
  autocompleteComponent: Autocomplete,
  filterOptions,
  optionValueProperty,
  ...props
}: OwnProps & FieldProps) => {
  const classes = useStyles();
  const {
    label,
    disabled,
    disableOnLoad,
    options,
    getOptionLabel,
    loading,
    form,
    required,
    onInputChange
  } = props;
  const { setTouched, setFieldValue } = form;
  const { error, helperText, ...field } = fieldToTextField(props);
  const { isSubmitting } = useFormikContext();
  const [resetHelper, setResetHelper] = useState<number>(0);

  useEffect(() => {
    if (loading && disableOnLoad) {
      setFieldValue(field.name as string, "");
      setResetHelper(resetHelper + 1);
    }
  }, [loading, disableOnLoad]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleOnBlur = () => {
    setTouched({ [field.name as string]: true });
  };

  const handleOnChange = (
    e: ChangeEvent<{}>,
    value: GroupMember | null,
    reason: AutocompleteChangeReason,
    details?: AutocompleteChangeDetails<GroupMember> | undefined
  ) => {
    if (!value) {
      setFieldValue(field.name as string, "");
      return;
    }
    const fieldValue = optionValueProperty ? value[optionValueProperty] : value;
    setFieldValue(field.name as string, fieldValue);
  };

  const renderInput = (inputProps: object) => {
    return (
      <div className={classes.autocompleteFieldWrapper}>
        {loading && <CircularProgress className={classes.loader} size={15} />}
        <TextField
          {...inputProps}
          required={required}
          error={error}
          helperText={helperText}
          label={label}
          onChange={onInputChange}
        />
      </div>
    );
  };

  const filterOptionsVoid = (opts: AutocompleteOptionsType) => opts;

  return (
    <Autocomplete
      key={resetHelper}
      disabled={disabled || isSubmitting || (loading && disableOnLoad)}
      filterOptions={filterOptions || filterOptionsVoid}
      getOptionLabel={getOptionLabel}
      loadingText={t(translationPath(lang.general.loading))}
      noOptionsText={t(translationPath(lang.general.noOptionsText))}
      onBlur={handleOnBlur}
      onChange={handleOnChange}
      openOnFocus={true}
      options={options}
      renderInput={renderInput}
    />
  );
};

export default FormikAutocomplete;
