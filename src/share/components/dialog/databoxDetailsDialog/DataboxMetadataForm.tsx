import clsx from "clsx";
import { SslDatabox } from "core/api/models";
import Datepicker from "core/components/datepicker/Component";
import {
  StyledField,
  StyledFieldWide,
  useStyles
} from "core/components/dialog/Dialog.styles";
import Timepicker from "core/components/timepicker/Component";
import { sslDataboxPropsProxy } from "core/types";
import { DateTimeFormats } from "enums";
import { Form, Formik } from "formik";
import { TextField } from "formik-material-ui";
import React from "react";
import { withTranslation } from "react-i18next";
import { lastPathMember, translationPath } from "share/utils/getPath";
import { lang, t, WithTranslation } from "translation/i18n";
import { MetaFormProps } from "../_types";

const ReadonlyDataboxMetadataForm = ({
  initialValues,
  formRef
}: MetaFormProps<SslDatabox> & WithTranslation) => {
  const classes = useStyles();
  const handle = (): void => void 0;

  const mappedValues = {
    ...initialValues,
    databoxDeliveryTime: initialValues.databoxDeliveryDate
  };

  return (
    <Formik<SslDatabox>
      initialValues={mappedValues}
      innerRef={formRef}
      onSubmit={handle}
    >
      <Form className={classes.form}>
        <div className={clsx(classes.fullWidth, classes.mtGap)}>
          <Datepicker
            className={classes.gapRight}
            data-test-id="meta-input-deliveryDate"
            name={lastPathMember(sslDataboxPropsProxy.databoxDeliveryDate).path}
            disabled={true}
            label={t(translationPath(lang.general.deliveryDate))}
          />
          <Timepicker
            className={classes.gapRight}
            data-test-id="meta-input-deliveryTime"
            format={DateTimeFormats.HoursMinutesSeconds}
            name="databoxDeliveryTime"
            disabled={true}
            label={t(translationPath(lang.general.deliveryTime))}
          />
          <StyledField
            component={TextField}
            data-test-id="meta-input-attachmentsCount"
            name={
              lastPathMember(sslDataboxPropsProxy.databoxAttachmentsCount).path
            }
            type="number"
            disabled={true}
            label={t(translationPath(lang.general.attachmentsCount))}
          />
        </div>
        <StyledFieldWide
          component={TextField}
          data-test-id="meta-input-sender"
          name={lastPathMember(sslDataboxPropsProxy.databoxSender).path}
          type="text"
          disabled={true}
          label={t(translationPath(lang.general.sender))}
        />
        <StyledFieldWide
          component={TextField}
          data-test-id="meta-input-subject"
          name={lastPathMember(sslDataboxPropsProxy.databoxSubject).path}
          type="text"
          disabled={true}
          label={t(translationPath(lang.general.subject))}
        />
      </Form>
    </Formik>
  );
};

export const DataboxMetadataForm = withTranslation()(
  React.memo(ReadonlyDataboxMetadataForm)
);
