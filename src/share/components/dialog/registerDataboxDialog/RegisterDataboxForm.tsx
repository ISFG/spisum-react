import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import clsx from "clsx";
import { SslAnalog, SslDatabox } from "core/api/models";
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
import { sslDataboxPropsProxy, sslPropsProxy } from "core/types";
import { DateTimeFormats, DeliveryMode, DocumentType } from "enums";
import { Field, Form, Formik, FormikHelpers } from "formik";
import { Select, TextField } from "formik-material-ui";
import React from "react";
import { withTranslation } from "react-i18next";
import { lastPathMember, translationPath } from "share/utils/getPath";
import { lang, t, WithTranslation } from "translation/i18n";
import { SslDeliveryMode } from "../../form/fields/SSLDeliveryMode";
import { MetaFormProps } from "../_types";
import { validate } from "./_validations";

const Component = ({
  initialValues,
  formRef,
  readonly
}: MetaFormProps<SslDatabox> & WithTranslation) => {
  const classes = useStyles();
  const onSubmit = (
    values: SslDatabox,
    formikHelpers: FormikHelpers<SslDatabox>
  ) => {};
  return (
    <Formik<SslDatabox>
      initialValues={initialValues}
      innerRef={formRef}
      onSubmit={onSubmit}
      validate={validate}
    >
      {({ setFieldValue }: FormState<SslAnalog>) => {
        return (
          <Form className={classes.form}>
            <Datepicker
              disabled={true}
              disableFuture={true}
              required={true}
              data-test-id="meta-input-deliveryDate"
              name={lastPathMember(sslDataboxPropsProxy.deliveryDate).path}
              label={t(translationPath(lang.documentMetaForm.deliveryDate))}
            />
            <Timepicker
              disabled={true}
              required={true}
              format={DateTimeFormats.HoursMinutesSeconds}
              data-test-id="meta-input-deliveryTime"
              name="deliveryTime"
              label={t(translationPath(lang.general.deliveryTime))}
            />

            <SslDeliveryMode
              allowedModes={[DeliveryMode.Databox]}
              disabled={true}
              required={true}
            />

            <StyledField
              component={TextField}
              disabled={true}
              required={true}
              data-test-id="meta-input-pid"
              name={lastPathMember(sslDataboxPropsProxy.pid).path}
              type="text"
              label={t(translationPath(lang.documentMetaForm.pid))}
            />

            <StyledFormControl>
              <InputLabel
                required={true}
                htmlFor={lastPathMember(sslDataboxPropsProxy.form).path}
              >
                {t(translationPath(lang.documentMetaForm.form))}
              </InputLabel>
              <Field
                disabled={true}
                required={true}
                component={Select}
                data-test-id="meta-input-form"
                name={lastPathMember(sslDataboxPropsProxy.form).path}
                inputProps={{
                  id: lastPathMember(sslDataboxPropsProxy.form).path
                }}
              >
                <MenuItem value={DocumentType.Digital}>
                  {t(translationPath(lang.general.digital))}
                </MenuItem>
              </Field>
            </StyledFormControl>
            <StyledField
              component={TextField}
              data-test-id="meta-input-attachmentsCount"
              name={lastPathMember(sslDataboxPropsProxy.attachmentsCount).path}
              min={0}
              type="number"
              label={t(translationPath(lang.general.attachmentsCount))}
            />
            <StyledField
              component={TextField}
              data-test-id="meta-input-attachmentsType"
              name={lastPathMember(sslDataboxPropsProxy.attachmentsType).path}
              type="text"
              label={t(translationPath(lang.general.attachmentsType))}
            />
            <Datepicker
              data-test-id="meta-input-settleToDate"
              name={lastPathMember(sslDataboxPropsProxy.settleToDate).path}
              label={t(translationPath(lang.general.settleToDate))}
              disablePast={true}
            />

            <div className={clsx(classes.fullWidth, classes.mtGap)}>
              <StyledField
                component={TextField}
                className={clsx(classes.gapRight, classes.longLabel)}
                data-test-id="carries-meta-input-senderIdent"
                disabled={readonly}
                name={lastPathMember(sslDataboxPropsProxy.senderIdent).path}
                type="text"
                label={t(translationPath(lang.general.senderIdent))}
              />
              <StyledField
                component={TextField}
                className={classes.longLabel}
                data-test-id="carries-meta-input-senderSSID"
                disabled={readonly}
                name={lastPathMember(sslDataboxPropsProxy.senderSSID).path}
                type="text"
                label={t(translationPath(lang.general.senderSSID))}
              />
            </div>
            <StyledFieldWide
              component={TextField}
              data-test-id="meta-input-subject"
              name={lastPathMember(sslDataboxPropsProxy.subject).path}
              type="text"
              label={t(translationPath(lang.general.subject))}
            />
            <SenderRadioWrapper
              disabledFields={[
                lastPathMember(sslPropsProxy.sender_contact).path
              ]}
              initialValues={initialValues}
              setFieldValue={setFieldValue}
              readonly={readonly}
              hidden={{ own: !readonly }}
            />
          </Form>
        );
      }}
    </Formik>
  );
};

export const RegisterDataboxForm = withTranslation()(React.memo(Component));
