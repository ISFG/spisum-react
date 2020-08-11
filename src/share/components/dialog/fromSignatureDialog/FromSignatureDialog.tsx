import { useStyles } from "core/components/dialog/Dialog.styles";
import { useSyncFormValidityWithDialog } from "core/components/dialog/hooks/useSyncFormValidityWithDialog";
import { ComponentsFromSignatureTab } from "core/components/dialog/tabs/fromSignatureComponents";
import {
  DialogContentPropsType,
  DialogContentType
} from "core/components/dialog/_types";
import { FormState } from "core/components/reactiveFormik/_types";
import { Formik } from "formik";
import React from "react";
import { FromSignatureForm } from "./FromSignatureForm";
import { FromSignatureFormValues } from "./_types";

export const FromSignatureDialog: DialogContentType["content"] = (
  props: DialogContentPropsType
) => {
  const setFormRef = useSyncFormValidityWithDialog(props.channel);
  const classes = useStyles();
  const onSubmit = () => {};

  return (
    <div className={classes.fromSignatureContainer}>
      <ComponentsFromSignatureTab {...props} />
      <Formik<FromSignatureFormValues>
        initialValues={{
          visual: false
        }}
        onSubmit={onSubmit}
        innerRef={setFormRef}
      >
        {(formProps: FormState<FromSignatureFormValues>) => {
          props.dialogProps.signerVisual = formProps.values.visual;

          return <FromSignatureForm {...formProps} />;
        }}
      </Formik>
    </div>
  );
};
