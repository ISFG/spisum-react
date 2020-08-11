import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import { SslAnalog } from "core/api/models";
import Datepicker from "core/components/datepicker/Component";
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
import { sslPropsProxy } from "core/types";
import { DateTimeFormats, DeliveryMode, DocumentType } from "enums";
import { Field, Form, Formik } from "formik";
import { Select, TextField } from "formik-material-ui";
import React from "react";
import { withTranslation } from "react-i18next";
import { SslDeliveryMode } from "share/components/form/fields/SSLDeliveryMode";
import { lastPathMember, translationPath } from "share/utils/getPath";
import { lang, t, WithTranslation } from "translation/i18n";
import { validate } from "./_validations";

const Component = ({
  initialValues,
  formRef,
  readonly
}: MetaFormProps<SslAnalog> & WithTranslation) => {
  const classes = useStyles();
  const handle = (): void => void 0;

  return (
    <Formik<SslAnalog>
      initialValues={initialValues}
      validate={validate}
      innerRef={formRef || handle}
      onSubmit={handle}
    >
      {({ setFieldValue, values }: FormState<SslAnalog>) => {
        return (
          <Form className={classes.form}>
            <Datepicker
              data-test-id="meta-input-deliveryDate"
              disabled={readonly}
              disableFuture={true}
              name={lastPathMember(sslPropsProxy.deliveryDate).path}
              label={t(translationPath(lang.general.deliveryDate))}
              required={true}
            />
            <TimePicker
              format={DateTimeFormats.HoursMinutesSeconds}
              data-test-id="carries-meta-input-deliveryTime"
              disabled={readonly}
              name={lastPathMember(sslPropsProxy.deliveryTime).path}
              label={t(translationPath(lang.general.deliveryTime))}
            />
            <SslDeliveryMode
              allowedModes={[
                DeliveryMode.Currier,
                DeliveryMode.Personally,
                DeliveryMode.Post
              ]}
              disabled={readonly}
              required={true}
            />
            <StyledField
              component={TextField}
              data-test-id="meta-input-pid"
              disabled={true}
              name={lastPathMember(sslPropsProxy.pid).path}
              type="text"
              label={t(translationPath(lang.general.pid))}
            />

            <StyledFormControl>
              <InputLabel htmlFor="form">
                {t(translationPath(lang.general.form))}
              </InputLabel>
              <Field
                component={Select}
                data-test-id="meta-input-form"
                disabled={true}
                name={lastPathMember(sslPropsProxy.form).path}
                inputProps={{
                  id: lastPathMember(sslPropsProxy.form).path
                }}
              >
                <MenuItem value={DocumentType.Analog}>
                  {t(translationPath(lang.general.analog))}
                </MenuItem>
                <MenuItem value={DocumentType.Digital}>
                  {t(translationPath(lang.general.digital))}
                </MenuItem>
              </Field>
            </StyledFormControl>
            <StyledField
              component={TextField}
              data-test-id="meta-input-attachmentsCount"
              disabled={readonly}
              name={lastPathMember(sslPropsProxy.attachmentsCount).path}
              type="number"
              label={t(translationPath(lang.general.attachmentsCount))}
            />
            <StyledField
              component={TextField}
              data-test-id="meta-input-attachmentsType"
              disabled={readonly}
              name={lastPathMember(sslPropsProxy.attachmentsType).path}
              type="string"
              label={t(translationPath(lang.general.attachmentsType))}
            />
            <StyledField
              component={TextField}
              data-test-id="meta-input-listCount"
              disabled={readonly}
              name={lastPathMember(sslPropsProxy.listCount).path}
              type="number"
              label={t(translationPath(lang.general.listCount))}
            />

            <StyledField
              component={TextField}
              data-test-id="meta-input-listCountAttachments"
              disabled={readonly}
              name={lastPathMember(sslPropsProxy.listCountAttachments).path}
              type="number"
              label={t(translationPath(lang.general.listCountAttachments))}
            />
            <Datepicker
              data-test-id="meta-input-settleTo"
              disabled={readonly}
              disablePast={true}
              name={lastPathMember(sslPropsProxy.settleToDate).path}
              label={t(translationPath(lang.general.settleToDate))}
            />
            <StyledField
              component={TextField}
              data-test-id="meta-input-senderIdent"
              disabled={readonly}
              name={lastPathMember(sslPropsProxy.senderIdent).path}
              type="text"
              label={t(translationPath(lang.general.senderIdent))}
            />
            <StyledField
              component={TextField}
              data-test-id="meta-input-senderSSID"
              disabled={readonly}
              name={lastPathMember(sslPropsProxy.senderSSID).path}
              type="text"
              label={t(translationPath(lang.general.senderSSID))}
            />

            <StyledFieldWide
              component={TextField}
              data-test-id="meta-input-subject"
              disabled={readonly}
              name={lastPathMember(sslPropsProxy.subject).path}
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

export const AnalogEvidateMetadataForm = withTranslation()(
  React.memo(Component)
);
