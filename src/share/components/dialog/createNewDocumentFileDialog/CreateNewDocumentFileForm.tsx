import {
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField
} from "@material-ui/core";
import { Autocomplete, RenderInputParams } from "@material-ui/lab";
import { useStyles } from "core/components/dialog/Dialog.styles";
import { Form, useField, useFormikContext } from "formik";
import React, { useState } from "react";
import { withTranslation } from "react-i18next";
import { lastPathMember, translationPath } from "share/utils/getPath";
import { lang, t, WithTranslation } from "translation/i18n";
import { useLocalStyles } from "./FileRadioGroup.styles";
import {
  CreateNewDocumentFileFormValues,
  createNewDocumentFileFormValuesProxy,
  FileOption,
  FormProps
} from "./_types";

interface OptionType {
  value: string;
  label: string;
}

const Component = ({
  document,
  initialValues,
  isLoading,
  onFileSearchChange,
  searchResults
}: FormProps & WithTranslation) => {
  const classes = useStyles();
  const styles = useLocalStyles();

  const [formState, setFormState] = useState<CreateNewDocumentFileFormValues>({
    selected: initialValues.selected
  });
  const [
    autocompleteValue,
    setAutocompleteValue
  ] = useState<OptionType | null>();
  const [inputValue, setInputValue] = useState<string>("");

  const radioGroupName = lastPathMember(
    createNewDocumentFileFormValuesProxy.selected
  ).path;
  const inputFieldName = lastPathMember(
    createNewDocumentFileFormValuesProxy.nodeId
  ).path;

  const { setFieldValue } = useFormikContext();
  const [radioField] = useField(radioGroupName);
  const [inputField] = useField(inputFieldName);

  const onRadioFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormState({ selected: e.target.value as FileOption });
    setFieldValue(radioField.name, e.target.value);
  };

  const onAutoCompleteValueChange = (
    e: React.ChangeEvent<{}>,
    option: OptionType | null
  ) => {
    setAutocompleteValue(option);
    setFieldValue(inputField.name, option?.value);
  };

  const onInputValueChange = (e: React.ChangeEvent<{}>, value: string) => {
    onFileSearchChange(value);
    setInputValue(value);
  };

  const renderAutocompleteInput = (inputProps: RenderInputParams) => {
    return (
      <TextField
        {...inputProps}
        data-test-id="meta-file-search"
        disabled={formState.selected === FileOption.Create}
        name={"search"}
        placeholder={t(translationPath(lang.general.inputTitleOrLabelOrId))}
        required={formState.selected === FileOption.Existing}
      />
    );
  };

  const options: OptionType[] = searchResults.map((item) => ({
    label: `${item.properties?.ssl?.pid || "-"}, ${
      item.properties?.ssl?.fileIdentificator || "-"
    }, ${item.properties?.ssl?.subject || "-"}`,
    value: item.id
  }));

  const getOptionLabel = (option: OptionType) => option.label;

  const isNewFileOptionDisabled = () => {
    const { sender_contact, sender_orgName, sender_name } =
      document.properties?.ssl || {};

    return (
      [sender_contact, sender_orgName, sender_name].filter((field) => !!field)
        .length === 0
    );
  };

  return (
    <Form className={classes.modalSmall}>
      <RadioGroup
        className={styles.radioGroupWrapper}
        name={radioGroupName}
        onChange={onRadioFieldChange}
        value={formState.selected}
      >
        <FormControlLabel
          control={<Radio />}
          disabled={false}
          label={t(translationPath(lang.general.existingFile))}
          value={FileOption.Existing}
        />
        <Autocomplete
          inputValue={inputValue}
          loading={isLoading}
          onChange={onAutoCompleteValueChange}
          onInputChange={onInputValueChange}
          options={options}
          getOptionLabel={getOptionLabel}
          renderInput={renderAutocompleteInput}
          value={autocompleteValue}
        />

        <FormControlLabel
          control={<Radio />}
          disabled={isNewFileOptionDisabled()}
          label={t(translationPath(lang.general.newFile))}
          value={FileOption.Create}
        />
      </RadioGroup>
    </Form>
  );
};

export const CreateNewDocumentFileForm = withTranslation()(
  React.memo(Component)
);
