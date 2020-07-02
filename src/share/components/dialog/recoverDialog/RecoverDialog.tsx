import { useStyles } from "core/components/dialog/Dialog.styles";
import { useSyncFormValidityWithDialog } from "core/components/dialog/hooks/useSyncFormValidityWithDialog";
import { DialogContentType } from "core/components/dialog/_types";
import { FormState } from "core/components/reactiveFormik/_types";
import { Formik, FormikHelpers } from "formik";
import React from "react";
import { RecoverDialogForm } from "./RecoverDialogForm";
import { RecoverDialogFormValues } from "./_types";
import { validate } from "./_validations";

export const RecoverDialogContent: DialogContentType["content"] = ({
  channel
}) => {
  const classes = useStyles();
  const setFormRef = useSyncFormValidityWithDialog(channel);

  const onSubmit = (
    values: RecoverDialogFormValues,
    { setSubmitting }: FormikHelpers<RecoverDialogFormValues>
  ) => {
    // setSubmitting(false);
  };

  return (
    <div className={classes.modalSmall}>
      <Formik<RecoverDialogFormValues>
        initialValues={{
          reason: ""
        }}
        onSubmit={onSubmit}
        innerRef={setFormRef}
        validate={validate}
      >
        {(props: FormState<RecoverDialogFormValues>) => (
          <RecoverDialogForm {...props} />
        )}
      </Formik>
    </div>
  );
};
