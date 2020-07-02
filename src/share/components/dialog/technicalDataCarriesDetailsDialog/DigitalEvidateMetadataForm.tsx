import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import clsx from "clsx";
import { SslAnalog } from "core/api/models";
import Datepicker from "core/components/datepicker";
import {
  StyledField,
  StyledFieldWide,
  StyledFormControl,
  useStyles
} from "core/components/dialog/Dialog.styles";
import { MetaFormProps } from "core/components/MetaForm/_types";
import { FormState } from "core/components/reactiveFormik/_types";
import { SenderRadioWrapper } from "core/components/senderForm/Component";
import TimePicker from "core/components/timepicker";
import { sslAnalogPropsProxy } from "core/types";
import { DateTimeFormats, DeliveryMode } from "enums";
import { Field, Form, Formik, FormikHelpers } from "formik";
import { Select, TextField } from "formik-material-ui";
import React from "react";
import { withTranslation } from "react-i18next";
import { lastPathMember, translationPath } from "share/utils/getPath";
import { lang, t, WithTranslation } from "translation/i18n";
import { SSLDeliveryMode } from "../../form/fields/SSLDeliveryMode";
import { validate } from "./_validations";

const Component = ({
  initialValues,
  formRef,
  readonly
}: MetaFormProps<SslAnalog> & WithTranslation) => {
  const classes = useStyles();
  const onSubmit = (
    values: SslAnalog,
    formikHelpers: FormikHelpers<SslAnalog>
  ) => {};

  return (
    <Formik<SslAnalog>
      initialValues={initialValues}
      innerRef={formRef}
      onSubmit={onSubmit}
      validate={validate}
    >
      {({ setFieldValue, values }: FormState<SslAnalog>) => {
        return (
          <Form className={classes.form}>
            <Datepicker
              data-test-id="carries-meta-input-deliveryDate"
              disabled={readonly}
              name={lastPathMember(sslAnalogPropsProxy.deliveryDate).path}
              label={t(translationPath(lang.general.deliveryDate))}
              disableFuture={true}
              required={true}
            />
            <TimePicker
              format={DateTimeFormats.HoursMinutesSeconds}
              data-test-id="carries-meta-input-deliveryTime"
              disabled={readonly}
              name={lastPathMember(sslAnalogPropsProxy.deliveryTime).path}
              label={t(translationPath(lang.general.deliveryTime))}
            />

            <SSLDeliveryMode
              disabledButVisibleModes={[
                DeliveryMode.Email,
                DeliveryMode.Databox
              ]}
              disabled={readonly}
              withEmptyOption={true}
              required={true}
            />

            <StyledField
              component={TextField}
              data-test-id="carries-meta-input-pid"
              disabled={true}
              name={lastPathMember(sslAnalogPropsProxy.pid).path}
              type="text"
              label={t(translationPath(lang.general.identifier))}
              required={true}
            />

            <StyledFormControl>
              <InputLabel htmlFor="form">
                {t(translationPath(lang.general.form))}
              </InputLabel>
              <Field
                component={Select}
                data-test-id="carries-meta-input-form"
                disabled={true}
                name={lastPathMember(sslAnalogPropsProxy.form).path}
                inputProps={{
                  id: "form"
                }}
              >
                <MenuItem value={"digital"}>
                  {t(translationPath(lang.general.digital))}
                </MenuItem>
              </Field>
            </StyledFormControl>
            <StyledField
              component={TextField}
              data-test-id="carries-meta-input-attachmentsCount"
              disabled={readonly}
              min={0}
              name={lastPathMember(sslAnalogPropsProxy.attachmentsCount).path}
              type="number"
              label={t(translationPath(lang.general.attachmentsCount))}
            />
            <StyledField
              component={TextField}
              data-test-id="carries-meta-input-attachmentsType"
              disabled={readonly}
              name={lastPathMember(sslAnalogPropsProxy.attachmentsType).path}
              type="text"
              label={t(translationPath(lang.general.attachmentsType))}
            />
            <Datepicker
              data-test-id="carries-meta-input-settleToDate"
              disabled={readonly}
              name={lastPathMember(sslAnalogPropsProxy.settleToDate).path}
              label={t(translationPath(lang.general.settleToDate))}
              disablePast={true}
            />

            <div className={clsx(classes.fullWidth, classes.mtGap)}>
              <StyledField
                component={TextField}
                className={classes.gapRight}
                data-test-id="carries-meta-input-senderIdent"
                disabled={readonly}
                name={lastPathMember(sslAnalogPropsProxy.senderIdent).path}
                type="text"
                label={t(translationPath(lang.general.senderIdent))}
              />
              <StyledField
                component={TextField}
                data-test-id="carries-meta-input-senderSSID"
                disabled={readonly}
                name={lastPathMember(sslAnalogPropsProxy.senderSSID).path}
                type="text"
                label={t(translationPath(lang.general.senderSSID))}
              />
            </div>

            <StyledFieldWide
              component={TextField}
              data-test-id="carries-meta-input-subject"
              disabled={readonly}
              name={lastPathMember(sslAnalogPropsProxy.subject).path}
              type="text"
              label={t(translationPath(lang.general.subject))}
            />
            <SenderRadioWrapper
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

export const DigitalEvidateMetadataForm = withTranslation()(
  React.memo(Component)
);
