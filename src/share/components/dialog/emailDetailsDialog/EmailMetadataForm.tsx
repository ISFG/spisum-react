import clsx from "clsx";
import { SslEmail } from "core/api/models";
import Datepicker from "core/components/datepicker/Component";
import {
  StyledField,
  StyledFieldWide,
  useStyles
} from "core/components/dialog/Dialog.styles";
import Timepicker from "core/components/timepicker/Component";
import { sslEmailPropsProxy } from "core/types";
import { DateTimeFormats } from "enums";
import { Form, Formik } from "formik";
import { TextField } from "formik-material-ui";
import React from "react";
import { withTranslation } from "react-i18next";
import { lastPathMember, translationPath } from "share/utils/getPath";
import { lang, t, WithTranslation } from "translation/i18n";
import { MetaFormProps } from "../_types";

const ReadonlyEmailMetadataForm = ({
  initialValues,
  formRef
}: MetaFormProps<SslEmail> & WithTranslation) => {
  const classes = useStyles();
  const handle = (): void => void 0;

  const mappedValues = {
    ...initialValues,
    emailDeliveryTime: initialValues.emailDeliveryDate
  };

  return (
    <Formik<SslEmail>
      initialValues={mappedValues}
      innerRef={formRef}
      onSubmit={handle}
    >
      <Form className={classes.form}>
        <div className={clsx(classes.fullWidth, classes.mtGap)}>
          <Datepicker
            className={classes.gapRight}
            data-test-id="meta-input-deliveryDate"
            name={lastPathMember(sslEmailPropsProxy.emailDeliveryDate).path}
            disabled={true}
            label={t(translationPath(lang.general.deliveryDate))}
          />
          <Timepicker
            className={classes.gapRight}
            data-test-id="meta-input-deliveryTime"
            format={DateTimeFormats.HoursMinutesSeconds}
            name="emailDeliveryTime"
            disabled={true}
            label={t(translationPath(lang.general.deliveryTime))}
          />
          <StyledField
            component={TextField}
            data-test-id="meta-input-attachmentsCount"
            name={lastPathMember(sslEmailPropsProxy.emailAttachmentsCount).path}
            type="number"
            disabled={true}
            label={t(translationPath(lang.general.attachmentsCount))}
          />
        </div>
        <StyledFieldWide
          component={TextField}
          data-test-id="meta-input-sender"
          name={lastPathMember(sslEmailPropsProxy.emailSender).path}
          type="text"
          disabled={true}
          label={t(translationPath(lang.general.sender))}
        />
        <StyledFieldWide
          component={TextField}
          data-test-id="meta-input-subject"
          name={lastPathMember(sslEmailPropsProxy.emailSubject).path}
          type="text"
          disabled={true}
          label={t(translationPath(lang.general.subject))}
        />
      </Form>
    </Formik>
  );
};

export const EmailMetadataForm = withTranslation()(
  React.memo(ReadonlyEmailMetadataForm)
);
