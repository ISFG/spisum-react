import { useStyles } from "core/components/dialog/Dialog.styles";
import { useSyncFormValidityWithDialog } from "core/components/dialog/hooks/useSyncFormValidityWithDialog";
import { DialogContentType } from "core/components/dialog/_types";
import { FormState } from "core/components/reactiveFormik/_types";
import { Formik } from "formik";
import React from "react";
import { DontRegisterDocumentForm } from "./DontRegisterDocumentForm";
import { DontRegisterDocumentFormValues } from "./_types";
import { validate } from "./_validations";

export const DontRegisterDocumentContent: DialogContentType["content"] = ({
  channel
}) => {
  const classes = useStyles();
  const setFormRef = useSyncFormValidityWithDialog(channel);

  const onSubmit = () => {};

  return (
    <div className={classes.modalSmall}>
      <Formik<DontRegisterDocumentFormValues>
        initialValues={{
          reason: ""
        }}
        onSubmit={onSubmit}
        innerRef={setFormRef}
        validate={validate}
      >
        {(props: FormState<DontRegisterDocumentFormValues>) => (
          <DontRegisterDocumentForm {...props} />
        )}
      </Formik>
    </div>
  );
};
