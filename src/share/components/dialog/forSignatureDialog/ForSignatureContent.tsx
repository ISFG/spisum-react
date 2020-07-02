import { useStyles } from "core/components/dialog/Dialog.styles";
import { useSyncFormValidityWithDialog } from "core/components/dialog/hooks/useSyncFormValidityWithDialog";
import { DialogContentType } from "core/components/dialog/_types";
import { FormState } from "core/components/reactiveFormik/_types";
import { Formik } from "formik";
import React from "react";
import { ForSignatureForm } from "./ForSignatureForm";
import { ForSignatureFormValues } from "./_types";
import { validate } from "./_validations";

export const ForSignatureContent: DialogContentType["content"] = ({
  channel
}) => {
  const classes = useStyles();
  const setFormRef = useSyncFormValidityWithDialog(channel);

  const onSubmit = () => {};

  return (
    <div className={classes.modalSmall}>
      <Formik<ForSignatureFormValues>
        initialValues={{
          group: "",
          user: ""
        }}
        onSubmit={onSubmit}
        innerRef={setFormRef}
        validate={validate}
      >
        {(props: FormState<ForSignatureFormValues>) => (
          <ForSignatureForm {...props} />
        )}
      </Formik>
    </div>
  );
};
