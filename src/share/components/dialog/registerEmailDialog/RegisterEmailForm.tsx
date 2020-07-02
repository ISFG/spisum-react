import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import clsx from "clsx";
import { SslAnalog, SslEmail } from "core/api/models";
import Datepicker from "core/components/datepicker/Component";
import {
  StyledField,
  StyledFieldWide,
  StyledFormControl,
  useStyles
} from "core/components/dialog/Dialog.styles";
import { FormState } from "core/components/reactiveFormik/_types";
import { SenderRadioWrapper } from "core/components/senderForm/Component";
import Timepicker from "core/components/timepicker/Component";
import { sslEmailPropsProxy } from "core/types";
import { DateTimeFormats, DeliveryMode, DocumentType } from "enums";
import { Field, Form, Formik, FormikHelpers } from "formik";
import { Select, TextField } from "formik-material-ui";
import React from "react";
import { withTranslation } from "react-i18next";
import { lastPathMember, translationPath } from "share/utils/getPath";
import { lang, t, WithTranslation } from "translation/i18n";
import { SSLDeliveryMode } from "../../form/fields/SSLDeliveryMode";
import { MetaFormProps } from "../_types";
import { validate } from "./_validations";

const Component = ({
  initialValues,
  formRef,
  readonly
}: MetaFormProps<SslEmail> & WithTranslation) => {
  const classes = useStyles();
  const onSubmit = (
    values: SslEmail,
    formikHelpers: FormikHelpers<SslEmail>
  ) => {};

  return (
    <Formik<SslEmail>
      initialValues={initialValues}
      innerRef={formRef}
      onSubmit={onSubmit}
      validate={validate}
    >
      {({ setFieldValue }: FormState<SslAnalog>) => {
        return (
          <Form className={classes.form}>
            <div className={clsx(classes.fullWidth)}>
              <Datepicker
                className={classes.gapRight}
                disabled={true}
                disableFuture={true}
                required={true}
                data-test-id="meta-input-deliveryDate"
                name={lastPathMember(sslEmailPropsProxy.deliveryDate).path}
                label={t(translationPath(lang.documentMetaForm.deliveryDate))}
              />
              <Timepicker
                className={classes.gapRight}
                disabled={true}
                required={true}
                format={DateTimeFormats.HoursMinutesSeconds}
                data-test-id="meta-input-deliveryTime"
                name="deliveryTime"
                label={t(translationPath(lang.general.deliveryTime))}
              />

              <SSLDeliveryMode
                className={classes.gapRight}
                enabledModes={[DeliveryMode.Email]}
                disabled={true}
                required={true}
              />

              <StyledField
                component={TextField}
                disabled={true}
                required={true}
                data-test-id="meta-input-pid"
                name={lastPathMember(sslEmailPropsProxy.pid).path}
                type="text"
                label={t(translationPath(lang.documentMetaForm.pid))}
              />
            </div>

            <div className={clsx(classes.fullWidth)}>
              <StyledFormControl className={classes.gapRight}>
                <InputLabel
                  htmlFor={lastPathMember(sslEmailPropsProxy.form).path}
                >
                  {t(translationPath(lang.documentMetaForm.form))}
                </InputLabel>
                <Field
                  disabled={true}
                  required={true}
                  component={Select}
                  data-test-id="meta-input-form"
                  name={lastPathMember(sslEmailPropsProxy.form).path}
                  inputProps={{
                    id: lastPathMember(sslEmailPropsProxy.form).path
                  }}
                >
                  <MenuItem value={DocumentType.Digital}>
                    {t(translationPath(lang.general.digital))}
                  </MenuItem>
                </Field>
              </StyledFormControl>
              <StyledField
                className={classes.gapRight}
                component={TextField}
                data-test-id="meta-input-attachmentsCount"
                name={lastPathMember(sslEmailPropsProxy.attachmentsCount).path}
                min={0}
                type="number"
                label={t(translationPath(lang.general.attachmentsCount))}
              />
              <StyledField
                className={classes.gapRight}
                component={TextField}
                data-test-id="meta-input-attachmentsType"
                name={lastPathMember(sslEmailPropsProxy.attachmentsType).path}
                type="text"
                label={t(translationPath(lang.general.attachmentsType))}
              />
              <Datepicker
                data-test-id="meta-input-settleToDate"
                name={lastPathMember(sslEmailPropsProxy.settleToDate).path}
                label={t(translationPath(lang.general.settleToDate))}
                disablePast={true}
              />
            </div>

            <div className={clsx(classes.fullWidth, classes.mtGap)}>
              <StyledField
                component={TextField}
                className={classes.gapRight}
                data-test-id="carries-meta-input-senderIdent"
                disabled={readonly}
                name={lastPathMember(sslEmailPropsProxy.senderIdent).path}
                type="text"
                label={t(translationPath(lang.general.senderIdent))}
              />
              <StyledField
                component={TextField}
                data-test-id="carries-meta-input-senderSSID"
                disabled={readonly}
                name={lastPathMember(sslEmailPropsProxy.senderSSID).path}
                type="text"
                label={t(translationPath(lang.general.senderSSID))}
              />
            </div>
            <StyledFieldWide
              component={TextField}
              data-test-id="meta-input-subject"
              name={lastPathMember(sslEmailPropsProxy.subject).path}
              type="text"
              label={t(translationPath(lang.general.subject))}
            />
            <SenderRadioWrapper
              initialValues={initialValues}
              setFieldValue={setFieldValue}
              readonly={readonly}
              hidden={{ own: !readonly }}
            />
            <StyledFieldWide
              component={TextField}
              data-test-id="meta-input-senderRegistrationNumber"
              name={
                lastPathMember(sslEmailPropsProxy.senderRegistrationNumber).path
              }
              type="text"
              label={t(translationPath(lang.general.senderRegistrationNumber))}
            />
          </Form>
        );
      }}
    </Formik>
  );
};

export const RegisterEmailForm = withTranslation()(React.memo(Component));
