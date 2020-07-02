import {
  StyledFieldWide,
  useStyles
} from "core/components/dialog/Dialog.styles";
import { useSyncFormValidityWithDialog } from "core/components/dialog/hooks/useSyncFormValidityWithDialog";
import { DialogContentPropsType } from "core/components/dialog/_types";
import { sslPropsProxy } from "core/types";
import { Form, Formik, FormikHelpers } from "formik";
import { TextField } from "formik-material-ui";
import React, { useEffect } from "react";
import { lastPathMember, translationPath } from "share/utils/getPath";
import { lang, t } from "translation/i18n";
import { ChangeLocationValues } from "./_types";
import { validate } from "./_validations";

export const ChangeLocationDialog = ({ channel }: DialogContentPropsType) => {
  const classes = useStyles();
  const setFormRef = useSyncFormValidityWithDialog(channel);

  useEffect(() => {
    channel.setIsSaved(true);
  }, [channel]);

  const onSubmit = (
    values: ChangeLocationValues,
    { setSubmitting }: FormikHelpers<ChangeLocationValues>
  ) => {
    setSubmitting(false);
  };

  return (
    <Formik<ChangeLocationValues>
      initialValues={{
        location: ""
      }}
      onSubmit={onSubmit}
      innerRef={setFormRef}
      validate={validate}
    >
      {() => (
        <Form className={classes.modalSmall}>
          <StyledFieldWide
            component={TextField}
            name={lastPathMember(sslPropsProxy.location).path}
            required={true}
            type="text"
            label={t(translationPath(lang.general.location))}
          />
        </Form>
      )}
    </Formik>
  );
};
