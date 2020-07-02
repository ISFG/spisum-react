import { useStyles } from "core/components/dialog/Dialog.styles";
import { useSyncFormValidityWithDialog } from "core/components/dialog/hooks/useSyncFormValidityWithDialog";
import { DialogContentType } from "core/components/dialog/_types";
import { FormState } from "core/components/reactiveFormik/_types";
import { Formik, FormikHelpers } from "formik";
import React from "react";
import { ShreddingDiscardForm } from "./ShreddingDiscardForm";
import { ShreddingDiscardFormValues } from "./_types";
import { validate } from "./_validations";

export const ShreddingDiscardContent: DialogContentType["content"] = ({
  channel
}) => {
  const classes = useStyles();
  const setFormRef = useSyncFormValidityWithDialog(channel);

  const onSubmit = (
    values: ShreddingDiscardFormValues,
    { setSubmitting }: FormikHelpers<ShreddingDiscardFormValues>
  ) => {
    setSubmitting(false);
  };

  return (
    <div className={classes.modalSmall}>
      <Formik<ShreddingDiscardFormValues>
        initialValues={{
          date: null,
          reason: ""
        }}
        onSubmit={onSubmit}
        innerRef={setFormRef}
        validate={validate}
      >
        {(props: FormState<ShreddingDiscardFormValues>) => (
          <ShreddingDiscardForm {...props} />
        )}
      </Formik>
    </div>
  );
};
