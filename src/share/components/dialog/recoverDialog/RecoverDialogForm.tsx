import {
  StyledFieldWide,
  useStyles
} from "core/components/dialog/Dialog.styles";
import { FormState } from "core/components/reactiveFormik/_types";
import { Form } from "formik";
import { TextField } from "formik-material-ui";
import React from "react";
import { lastPathMember, translationPath } from "share/utils/getPath";
import { lang, t } from "translation/i18n";
import {
  RecoverDialogFormValues,
  recoverDialogFormValuesProxy
} from "./_types";

export const RecoverDialogForm = React.memo(
  ({ values }: FormState<RecoverDialogFormValues>) => {
    const classes = useStyles();

    return (
      <Form className={classes.form}>
        <StyledFieldWide
          component={TextField}
          data-test-id="meta-input-reason"
          name={lastPathMember(recoverDialogFormValuesProxy.reason).path}
          type="text"
          label={t(translationPath(lang.general.reasonForRecover))}
        />
      </Form>
    );
  }
);
