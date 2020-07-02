import { Node, SslEmail } from "core/api/models";
import { useStyles } from "core/components/dialog/Dialog.styles";
import { useSyncFormValidityWithDialog } from "core/components/dialog/hooks/useSyncFormValidityWithDialog";
import { DialogContentType } from "core/components/dialog/_types";
import { FormState } from "core/components/reactiveFormik/_types";
import { Formik } from "formik";
import React from "react";
import { translationPath } from "share/utils/getPath";
import { lang, t } from "translation/i18n";
import { IncompleteDocumentForm } from "./IncompleteDocumentForm";
import { IncompleteDocumentFormValues } from "./_types";
import { validate } from "./_validations";

export const IncompleteDocumentContent: DialogContentType["content"] = ({
  channel,
  dialogData
}) => {
  const classes = useStyles();
  const setFormRef = useSyncFormValidityWithDialog(channel);

  const onSubmit = () => {};

  const initialValues: IncompleteDocumentFormValues = {
    body: "",
    recipient:
      (dialogData as Node<SslEmail>).properties?.ssl?.emailSender || "",
    subject: (dialogData as Node<SslEmail>).properties?.ssl?.emailSubject || ""
  };

  return (
    <div className={classes.modalSmall}>
      <p>
        <b>{t(translationPath(lang.dialog.content.incompleteText))}</b>
      </p>
      <Formik<IncompleteDocumentFormValues>
        initialValues={initialValues}
        onSubmit={onSubmit}
        innerRef={setFormRef}
        validate={validate}
      >
        {(props: FormState<IncompleteDocumentFormValues>) => (
          <IncompleteDocumentForm {...props} />
        )}
      </Formik>
    </div>
  );
};
