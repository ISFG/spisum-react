import { Formik } from "formik";
import React from "react";
import * as Yup from "yup";
import { useStyles } from "core/components/dialog/Dialog.styles";
import { useSyncFormValidityWithDialog } from "core/components/dialog/hooks/useSyncFormValidityWithDialog";
import { DialogContentType } from "core/components/dialog/_types";
import { FormState } from "core/components/reactiveFormik/_types";
import { translationPath } from "share/utils/getPath";
import { lang, t } from "translation/i18n";
import { DocumentHandoverFormValues } from "./_types";
import { DocumentHandoverForm } from "./DocumentHandoverForm";

const documentHandoverFormSchema = Yup.object().shape({
  nextGroup: Yup.string()
    .trim()
    .required(t(translationPath(lang._validations.required)))
});

export const DocumentHandoverContent: DialogContentType["content"] = ({
  channel
}) => {
  const classes = useStyles();
  const setFormRef = useSyncFormValidityWithDialog(channel);

  const onSubmit = () => {};

  return (
    <div className={classes.modalSmall}>
      <Formik<DocumentHandoverFormValues>
        initialValues={{
          nextGroup: "",
          nextOwner: ""
        }}
        onSubmit={onSubmit}
        innerRef={setFormRef}
        validationSchema={documentHandoverFormSchema}
      >
        {(props: FormState<DocumentHandoverFormValues>) => (
          <DocumentHandoverForm {...props} />
        )}
      </Formik>
    </div>
  );
};
