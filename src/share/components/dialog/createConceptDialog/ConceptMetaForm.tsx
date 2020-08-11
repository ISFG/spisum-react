import {
  StyledField,
  StyledFieldWide,
  useStyles
} from "core/components/dialog/Dialog.styles";
import { Concept, conceptProxy } from "core/entities/concept/Concept";
import { Form, Formik } from "formik";
import { TextField } from "formik-material-ui";
import React from "react";
import { lastPathMember, translationPath } from "share/utils/getPath";
import { lang, t } from "translation/i18n";
import { MetaFormProps } from "../_types";
import { validate } from "./_validations";

export const ConceptMetaForm = React.memo(
  ({ initialValues, formRef, readonly }: MetaFormProps<Concept>) => {
    const classes = useStyles();
    const handle = (): void => void 0;

    return (
      <Formik<Concept>
        initialValues={initialValues}
        validate={validate}
        innerRef={formRef || handle}
        onSubmit={handle}
      >
        <Form className={classes.form}>
          <StyledField
            component={TextField}
            data-test-id="concept-input-pid"
            disabled={true}
            name={lastPathMember(conceptProxy.pid).path}
            type="text"
            required={true}
            label={t(translationPath(lang.general.identifier))}
          />
          <StyledFieldWide
            component={TextField}
            data-test-id="concept-input-subject"
            disabled={readonly}
            name={lastPathMember(conceptProxy.subject).path}
            required={false}
            type="text"
            label={t(translationPath(lang.documentMetaForm.subject))}
          />
        </Form>
      </Formik>
    );
  }
);
