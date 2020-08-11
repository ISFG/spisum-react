import { useStyles } from "core/components/dialog/Dialog.styles";
import { useSyncFormValidityWithDialog } from "core/components/dialog/hooks/useSyncFormValidityWithDialog";
import { DialogContentType } from "core/components/dialog/_types";
import { FormState } from "core/components/reactiveFormik/_types";
import { GenericDocument } from "core/types";
import { Formik } from "formik";
import React from "react";
import { PromoteConceptToDocumentForm } from "./PromoteConceptToDocumentForm";
import { PromoteConceptToDocumentFormValues } from "./_types";
import { validate } from "./_validations";

export const PromoteConceptToDocumentContent: DialogContentType["content"] = ({
  channel,
  dialogProps
}) => {
  const classes = useStyles();
  const setFormRef = useSyncFormValidityWithDialog(channel);

  const onSubmit = () => {};

  return (
    <div className={classes.modalBodyFullSize}>
      <div className="body-midsize" style={{ minHeight: 350 }}>
        <Formik<PromoteConceptToDocumentFormValues>
          initialValues={{
            attachmentsCount: "",
            author: "",
            settleTo: null,
            subject:
              (dialogProps.data as GenericDocument)?.properties?.ssl?.subject ||
              ""
          }}
          onSubmit={onSubmit}
          innerRef={setFormRef}
          validate={validate}
        >
          {(props: FormState<PromoteConceptToDocumentFormValues>) => (
            <PromoteConceptToDocumentForm {...props} />
          )}
        </Formik>
      </div>
    </div>
  );
};
