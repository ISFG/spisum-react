import { useStyles } from "core/components/dialog/Dialog.styles";
import { useSyncFormValidityWithDialog } from "core/components/dialog/hooks/useSyncFormValidityWithDialog";
import { DialogContentType } from "core/components/dialog/_types";
import { FormState } from "core/components/reactiveFormik/_types";
import { Formik, FormikHelpers } from "formik";
import React from "react";
import { ChangePasswordForm } from "./ChangePasswordForm";
import { ChangePasswordFormValues } from "./_types";
import { changePasswordValidationSchema } from "./_validations";

export const ChangePasswordDialog: DialogContentType["content"] = ({
  channel
}) => {
  const classes = useStyles();
  const setFormRef = useSyncFormValidityWithDialog(channel);

  const onSubmit = (
    values: ChangePasswordFormValues,
    { setSubmitting }: FormikHelpers<ChangePasswordFormValues>
  ) => {
    setSubmitting(false);
  };

  return (
    <div className={classes.modalSmall}>
      <Formik<ChangePasswordFormValues>
        initialValues={{
          newPassword: "",
          newPassword2: "",
          oldPassword: ""
        }}
        onSubmit={onSubmit}
        innerRef={setFormRef}
        validationSchema={changePasswordValidationSchema}
      >
        {(props: FormState<ChangePasswordFormValues>) => (
          <ChangePasswordForm {...props} />
        )}
      </Formik>
    </div>
  );
};
