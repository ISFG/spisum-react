import { useSyncFormValidityWithDialog } from "core/components/dialog/hooks/useSyncFormValidityWithDialog";
import { DialogContentType } from "core/components/dialog/_types";
import { FormState } from "core/components/reactiveFormik/_types";
import { Formik, FormikHelpers } from "formik";
import React from "react";
import { SettleDocumentForm } from "./SettleDocumentDialogForm";
import { SettleDocumentFormValues } from "./_types";
import { validate } from "./_validations";

export const SettleDocumentContent: DialogContentType["content"] = ({
  channel
}) => {
  const setFormRef = useSyncFormValidityWithDialog(channel);

  const onSubmit = (
    values: SettleDocumentFormValues,
    { setSubmitting }: FormikHelpers<SettleDocumentFormValues>
  ) => {
    setTimeout(() => {
      setSubmitting(false);
    }, 500);
  };

  return (
    <div className="body-midsize" style={{ minHeight: 200 }}>
      <Formik<SettleDocumentFormValues>
        initialValues={{
          customSettleMethod: "",
          settleDate: new Date(),
          settleMethod: "",
          settleReason: ""
        }}
        onSubmit={onSubmit}
        innerRef={setFormRef}
        validate={validate}
      >
        {(props: FormState<SettleDocumentFormValues>) => (
          <SettleDocumentForm {...props} />
        )}
      </Formik>
    </div>
  );
};
