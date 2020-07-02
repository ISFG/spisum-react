import {
  StyledFieldWide,
  useStyles
} from "core/components/dialog/Dialog.styles";
import { FormState } from "core/components/reactiveFormik/_types";
import { shipmentDocumentProxy } from "core/types";
import { Form, Formik } from "formik";
import { TextField } from "formik-material-ui";
import React from "react";
import { withTranslation } from "react-i18next";
import { lastPathMember, translationPath } from "share/utils/getPath";
import { lang, t, WithTranslation } from "translation/i18n";
import { validate } from "./_validations";
import { MetaFormProps } from "../../../_types";
import { ShipmentFormValues } from "../../_types";
import { BaseBottomForm, BaseUpperForm } from "../baseForm/ShipmentBaseForm";

const Component = ({
  initialValues,
  formRef,
  readonly
}: MetaFormProps<ShipmentFormValues> & WithTranslation) => {
  const dialogClasses = useStyles();
  const handle = (): void => void 0;

  return (
    <Formik<ShipmentFormValues>
      initialValues={initialValues}
      validate={validate}
      innerRef={formRef || handle}
      onSubmit={handle}
    >
      {({ setFieldValue }: FormState<ShipmentFormValues>) => {
        return (
          <Form className={dialogClasses.form}>
            <BaseUpperForm
              initialValues={initialValues}
              toDispatchDatePosition={"bottom"}
              onlyThreeColumns={true}
              readonly={readonly}
            />
            <BaseBottomForm />
            <StyledFieldWide
              component={TextField}
              data-test-id="detail-shipment-email-recipient"
              disabled={readonly}
              required={true}
              name={
                lastPathMember(shipmentDocumentProxy.properties?.ssl?.recipient)
                  .path
              }
              type="text"
              label={t(translationPath(lang.general.emailAddressee))}
            />
            <StyledFieldWide
              component={TextField}
              data-test-id="detail-shipment-email-sender"
              disabled={true}
              name={
                lastPathMember(shipmentDocumentProxy.properties?.ssl?.sender)
                  .path
              }
              type="text"
              label={t(translationPath(lang.general.emailOfTheSender))}
            />
          </Form>
        );
      }}
    </Formik>
  );
};

export const ShipmentEmailForm = withTranslation()(React.memo(Component));
