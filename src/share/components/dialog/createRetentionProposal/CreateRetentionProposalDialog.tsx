import {
  StyledFieldWide,
  useStyles
} from "core/components/dialog/Dialog.styles";
import { useSyncFormValidityWithDialog } from "core/components/dialog/hooks/useSyncFormValidityWithDialog";
import { DialogContentType } from "core/components/dialog/_types";
import { FormState } from "core/components/reactiveFormik/_types";
import { Form, Formik, FormikHelpers } from "formik";
import { TextField } from "formik-material-ui";
import React from "react";
import { lang, t } from "translation/i18n";
import { lastPathMember, translationPath } from "../../../utils/getPath";
import { retentionProposalProxy, RetentionProposalValues } from "./_types";
import { validate } from "./_validations";

export const CreateRetentionProposalContent: DialogContentType["content"] = ({
  channel
}) => {
  const classes = useStyles();
  const setFormRef = useSyncFormValidityWithDialog(channel);
  const onSubmit = (
    values: RetentionProposalValues,
    { setSubmitting }: FormikHelpers<RetentionProposalValues>
  ) => {
    setTimeout(() => {
      setSubmitting(false);
    }, 500);
  };

  return (
    <div className="body-midsize" style={{ minHeight: 100, maxWidth: 500 }}>
      <Formik<RetentionProposalValues>
        initialValues={{
          name: ""
        }}
        onSubmit={onSubmit}
        innerRef={setFormRef}
        validate={validate}
      >
        {(props: FormState<RetentionProposalValues>) => (
          <Form className={classes.form}>
            <StyledFieldWide
              component={TextField}
              data-test-id="meta-input-subject"
              disabled={false}
              required={true}
              name={lastPathMember(retentionProposalProxy.name).path}
              type="string"
              label={t(translationPath(lang.general.nameOfRetentionProposal))}
            />
          </Form>
        )}
      </Formik>
    </div>
  );
};
