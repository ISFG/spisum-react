import clsx from "clsx";
import { SslConcept } from "core/api/models";
import Datepicker from "core/components/datepicker/Component";
import {
  StyledField,
  StyledFieldWide,
  useStyles
} from "core/components/dialog/Dialog.styles";
import { conceptProxy } from "core/types";
import { Form, Formik } from "formik";
import { TextField } from "formik-material-ui";
import React from "react";
import { withTranslation } from "react-i18next";
import { lastPathMember, translationPath } from "share/utils/getPath";
import { lang, t, WithTranslation } from "translation/i18n";
import { MetaFormProps } from "../_types";
import { validate } from "./_validations";

const ConceptForm = ({
  initialValues,
  formRef
}: MetaFormProps<SslConcept> & WithTranslation) => {
  const classes = useStyles();
  const handle = (): void => void 0;

  return (
    <Formik<SslConcept>
      initialValues={initialValues}
      innerRef={formRef}
      validate={validate}
      onSubmit={handle}
    >
      <Form className={classes.form}>
        <div className={clsx(classes.fullWidth, classes.mtGap)}>
          <StyledField
            component={TextField}
            className={classes.gapRight}
            data-test-id="meta-input-pid"
            name={lastPathMember(conceptProxy.properties?.ssl?.pid).path}
            type="string"
            disabled={true}
            required={true}
            label={t(translationPath(lang.general.identifier))}
          />
          <Datepicker
            className={classes.gapRight}
            data-test-id="meta-input-createdDate"
            name={lastPathMember(conceptProxy.createdAt).path}
            disabled={true}
            required={true}
            label={t(translationPath(lang.general.dateOfCreation))}
          />
          <StyledField
            component={TextField}
            data-test-id="meta-input-owner"
            name={"owner"}
            type="text"
            disabled={true}
            required={true}
            label={t(translationPath(lang.general.owner))}
          />
        </div>
        <StyledFieldWide
          component={TextField}
          data-test-id="meta-input-subject"
          name={lastPathMember(conceptProxy.properties?.ssl?.subject).path}
          required={false}
          type="text"
          label={t(translationPath(lang.general.subject))}
        />
      </Form>
    </Formik>
  );
};

export const ConceptMetadataForm = withTranslation()(React.memo(ConceptForm));
