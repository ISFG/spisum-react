import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { useStyles } from "core/components/dialog/Dialog.styles";
import { FormState } from "core/components/reactiveFormik/_types";
import { Form, useFormikContext } from "formik";
import React from "react";
import { lastPathMember, translationPath } from "share/utils/getPath";
import { lang, t } from "translation/i18n";
import {
  FromSignatureFormValues,
  fromSignatureFormValuesProxy
} from "./_types";

export const FromSignatureForm = React.memo(
  ({ values }: FormState<FromSignatureFormValues>) => {
    const { setFieldValue } = useFormikContext();

    const classes = useStyles();
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setFieldValue(
        lastPathMember(fromSignatureFormValuesProxy.visual).path,
        event.target.checked
      );
    };

    return (
      <Form className={classes.form}>
        <FormControlLabel
          className={classes.visualCheckbox}
          control={
            <Checkbox
              checked={values.visual}
              onChange={handleChange}
              name={lastPathMember(fromSignatureFormValuesProxy.visual).path}
            />
          }
          label={t(
            translationPath(lang.general.electronicSignatureVisualisation)
          )}
        />
      </Form>
    );
  }
);
