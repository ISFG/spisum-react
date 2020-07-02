import { FormControlLabel, Radio, RadioGroup } from "@material-ui/core";
import clsx from "clsx";
import {
  StyledFieldQuarter,
  StyledFieldThird,
  useStyles
} from "core/components/dialog/Dialog.styles";
import { FormState } from "core/components/reactiveFormik/_types";
import { Field, Form, useField, useFormikContext } from "formik";
import { TextField } from "formik-material-ui";
import React, { useState } from "react";
import { lastPathMember, translationPath } from "share/utils/getPath";
import { lang, t } from "translation/i18n";
import {
  CreateOrganizationUnitFormValues,
  CreateOrganizationUnitFormValuesProxy,
  RadioTypes
} from "./_types";

export const CreateOrganizationUnitForm = React.memo(
  ({ values, initialValues }: FormState<CreateOrganizationUnitFormValues>) => {
    const dialogClasses = useStyles();
    const { setFieldValue } = useFormikContext();
    const [formState, setFormState] = useState<
      CreateOrganizationUnitFormValues
    >({
      id: initialValues.id,
      name: initialValues.name,
      type: initialValues.type
    });
    const radioGroupName = lastPathMember(
      CreateOrganizationUnitFormValuesProxy.type
    ).path;
    const [radioField] = useField(radioGroupName);

    const onRadioFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormState({
        id: formState.id,
        name: formState.name,
        type: e.target.value as string
      });
      setFieldValue(radioField.name, e.target.value);
    };
    return (
      <Form className={clsx(dialogClasses.fullWidth, dialogClasses.form)}>
        <StyledFieldQuarter
          component={TextField}
          data-test-id="create-organizationl-unit-name"
          name={lastPathMember(CreateOrganizationUnitFormValuesProxy.name).path}
          required={true}
          type="text"
          label={t(translationPath(lang.general.name))}
        />
        <StyledFieldThird
          component={TextField}
          data-test-id="create-organizationl-unit-id"
          name={lastPathMember(CreateOrganizationUnitFormValuesProxy.id).path}
          required={true}
          type="text"
          label={t(translationPath(lang.general.id))}
        />
        <Field
          className={clsx(dialogClasses.fullWidth, dialogClasses.mtGap)}
          component={RadioGroup}
          name={radioField}
          value={formState.type}
          onChange={onRadioFieldChange}
        >
          <FormControlLabel
            className={dialogClasses.radioAlignLeft}
            control={<Radio />}
            label={t(translationPath(lang.general.unclassified))}
            value={RadioTypes.unclassified}
            labelPlacement="start"
          />

          <FormControlLabel
            className={dialogClasses.radioAlignLeft}
            control={<Radio />}
            label={t(translationPath(lang.general.isDispatchBig))}
            value={RadioTypes.isDispatch}
            labelPlacement="start"
          />

          <FormControlLabel
            className={dialogClasses.radioAlignLeft}
            control={<Radio />}
            label={t(translationPath(lang.general.isRepositoryBig))}
            value={RadioTypes.isRepository}
            labelPlacement="start"
          />
        </Field>
      </Form>
    );
  }
);
