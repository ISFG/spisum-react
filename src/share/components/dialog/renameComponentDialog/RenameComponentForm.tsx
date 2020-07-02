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
  RenameComponentFormValues,
  renameComponentFormValuesProxy
} from "./_types";

export const RenameComponentForm = React.memo(
  ({ values }: FormState<RenameComponentFormValues>) => {
    const classes = useStyles();

    return (
      <Form className={classes.form}>
        <StyledFieldWide
          component={TextField}
          data-test-id="rename-component-form-name"
          name={lastPathMember(renameComponentFormValuesProxy.name).path}
          inputProps={{
            id: lastPathMember(renameComponentFormValuesProxy.name).path
          }}
          label={t(translationPath(lang.dialog.renameComponent.name))}
        />
      </Form>
    );
  }
);
