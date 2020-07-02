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
  DontRegisterDocumentFormValues,
  dontRegisterDocumentFormValuesProxy
} from "./_types";

export const DontRegisterDocumentForm = React.memo(
  ({ values }: FormState<DontRegisterDocumentFormValues>) => {
    const classes = useStyles();

    return (
      <Form className={classes.form}>
        <StyledFieldWide
          component={TextField}
          data-test-id="meta-input-reason"
          name={lastPathMember(dontRegisterDocumentFormValuesProxy.reason).path}
          type="text"
          label={t(translationPath(lang.general.reasonForNotRegister))}
        />
      </Form>
    );
  }
);
