import {
  StyledFieldQuarter,
  useStyles
} from "core/components/dialog/Dialog.styles";
import { FormState } from "core/components/reactiveFormik/_types";
import { Form } from "formik";
import { TextField } from "formik-material-ui";
import React from "react";
import { lastPathMember, translationPath } from "share/utils/getPath";
import { lang, t } from "translation/i18n";
import {
  UpdateOrganizationUnitFormValues,
  UpdateOrganizationUnitFormValuesProxy
} from "./_types";
import clsx from "clsx";

export const UpdateOrganizationUnitForm = React.memo(
  ({ values, initialValues }: FormState<UpdateOrganizationUnitFormValues>) => {
    const dialogClasses = useStyles();

    return (
      <Form className={clsx(dialogClasses.fullWidth, dialogClasses.form)}>
        <StyledFieldQuarter
          component={TextField}
          data-test-id="update-organization-unit-name"
          name={lastPathMember(UpdateOrganizationUnitFormValuesProxy.name).path}
          inputProps={{
            id: lastPathMember(UpdateOrganizationUnitFormValuesProxy.name).path
          }}
          required={true}
          type="text"
          label={t(translationPath(lang.general.name))}
        />
      </Form>
    );
  }
);
