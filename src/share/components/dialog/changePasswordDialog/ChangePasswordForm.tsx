import {
  StyledFieldWide,
  useStyles
} from "core/components/dialog/Dialog.styles";
import { FormState } from "core/components/reactiveFormik/_types";
import { Form } from "formik";
import { TextField } from "formik-material-ui";
import React from "react";
import { lastPathMember, translationPath } from "share/utils/getPath";
import { t } from "translation/i18n";
import lang from "translation/lang";
import {
  ChangePasswordFormValues,
  ChangePasswordFormValuesProxy
} from "./_types";

export const ChangePasswordForm = React.memo(
  ({ values }: FormState<ChangePasswordFormValues>) => {
    const classes = useStyles();

    return (
      <Form className={classes.form}>
        <StyledFieldWide
          component={TextField}
          data-test-id="meta-input-oldPassoword"
          label={t(translationPath(lang.general.oldPassword))}
          name={lastPathMember(ChangePasswordFormValuesProxy.oldPassword).path}
          required={true}
          type="password"
        />

        <StyledFieldWide
          className={classes.mtGap}
          component={TextField}
          data-test-id="meta-input-newPassword"
          label={t(translationPath(lang.general.newPassword))}
          name={lastPathMember(ChangePasswordFormValuesProxy.newPassword).path}
          required={true}
          type="password"
        />

        <StyledFieldWide
          component={TextField}
          data-test-id="meta-input-newPassword2"
          label={t(translationPath(lang.general.newPassword2))}
          name={lastPathMember(ChangePasswordFormValuesProxy.newPassword2).path}
          required={true}
          type="password"
        />
      </Form>
    );
  }
);
