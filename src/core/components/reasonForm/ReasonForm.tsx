import {
  StyledFieldWide,
  useStyles
} from "core/components/dialog/Dialog.styles";
import { useSyncFormValidityWithDialog } from "core/components/dialog/hooks/useSyncFormValidityWithDialog";
import { DialogContentPropsType } from "core/components/dialog/_types";
import { Form, Formik, FormikHelpers } from "formik";
import { TextField } from "formik-material-ui";
import React, { useEffect } from "react";
import { lastPathMember } from "share/utils/getPath";
import { ReasonFormValues, reasonFormValuesProxy } from "./_types";
import { validate } from "./_validations";

interface OwnProps {
  reasonLabel: string;
}

export const ReasonForm = ({
  channel,
  reasonLabel
}: DialogContentPropsType & OwnProps) => {
  const classes = useStyles();
  const setFormRef = useSyncFormValidityWithDialog(channel);

  useEffect(() => {
    channel.setIsSaved(true);
  }, [channel]);

  const onSubmit = (
    values: ReasonFormValues,
    { setSubmitting }: FormikHelpers<ReasonFormValues>
  ) => {
    setSubmitting(false);
  };

  return (
    <Formik<ReasonFormValues>
      initialValues={{
        reason: ""
      }}
      onSubmit={onSubmit}
      innerRef={setFormRef}
      validate={validate}
    >
      {() => (
        <Form className={classes.modalSmall}>
          <StyledFieldWide
            component={TextField}
            data-test-id={`${reasonLabel}-input-reason`}
            name={lastPathMember(reasonFormValuesProxy.reason).path}
            required={true}
            type="text"
            label={reasonLabel}
          />
        </Form>
      )}
    </Formik>
  );
};
