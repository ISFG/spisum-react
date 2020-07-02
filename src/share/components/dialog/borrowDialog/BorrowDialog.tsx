import { useStyles } from "core/components/dialog/Dialog.styles";
import { useSyncFormValidityWithDialog } from "core/components/dialog/hooks/useSyncFormValidityWithDialog";
import { DialogContentType } from "core/components/dialog/_types";
import { FormState } from "core/components/reactiveFormik/_types";
import { Formik } from "formik";
import React from "react";
import { BorrowDialogForm } from "./BorrowDialogForm";
import { BorrowFormValues } from "./_types";
import { borrowDialogValidationSchema } from "./_validations";

export const BorrowDialog: DialogContentType["content"] = ({ channel }) => {
  const classes = useStyles();
  const setFormRef = useSyncFormValidityWithDialog(channel);

  const onSubmit = () => {};

  return (
    <div className={classes.modalSmall}>
      <Formik<BorrowFormValues>
        initialValues={{
          group: "",
          user: ""
        }}
        onSubmit={onSubmit}
        innerRef={setFormRef}
        validationSchema={borrowDialogValidationSchema}
      >
        {(props: FormState<BorrowFormValues>) => (
          <BorrowDialogForm {...props} />
        )}
      </Formik>
    </div>
  );
};
