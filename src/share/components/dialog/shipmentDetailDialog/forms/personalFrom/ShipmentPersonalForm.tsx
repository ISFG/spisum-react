import {
  StyledFieldWide,
  useStyles
} from "core/components/dialog/Dialog.styles";
import { FormState } from "core/components/reactiveFormik/_types";
import { Form, Formik } from "formik";
import { TextField } from "formik-material-ui";
import React from "react";
import { withTranslation } from "react-i18next";
import { lastPathMember, translationPath } from "share/utils/getPath";
import { lang, t, WithTranslation } from "translation/i18n";
import {
  ShipmentFormValues,
  shipmentPersonalFormValuesProxy
} from "../../_types";
import { validate } from "./_validations";
import { MetaFormProps } from "../../../_types";
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
            <BaseUpperForm initialValues={initialValues} readonly={true} />
            <StyledFieldWide
              component={TextField}
              data-test-id="detail-shipment-personally-address1"
              disabled={readonly}
              required={true}
              name={
                lastPathMember(shipmentPersonalFormValuesProxy.address1).path
              }
              type="text"
              label={t(translationPath(lang.general.addressee))}
            />
            <StyledFieldWide
              component={TextField}
              data-test-id="detail-shipment-personally-address2"
              disabled={readonly}
              name={
                lastPathMember(shipmentPersonalFormValuesProxy.address2).path
              }
              type="text"
            />
            <StyledFieldWide
              component={TextField}
              data-test-id="detail-shipment-personally-address3"
              disabled={readonly}
              name={
                lastPathMember(shipmentPersonalFormValuesProxy.address3).path
              }
              type="text"
            />
            <StyledFieldWide
              component={TextField}
              data-test-id="detail-shipment-personally-address4"
              disabled={readonly}
              name={
                lastPathMember(shipmentPersonalFormValuesProxy.address4).path
              }
              type="text"
            />
            <StyledFieldWide
              component={TextField}
              data-test-id="detail-shipment-personally-address-street"
              disabled={readonly}
              required={true}
              name={
                lastPathMember(shipmentPersonalFormValuesProxy.addressStreet)
                  .path
              }
              type="text"
              label={t(translationPath(lang.general.streetAndStreetNumber))}
            />
            <StyledFieldWide
              component={TextField}
              data-test-id="detail-shipment-personally-address-city"
              disabled={readonly}
              required={true}
              name={
                lastPathMember(shipmentPersonalFormValuesProxy.addressCity).path
              }
              type="text"
              label={t(translationPath(lang.general.municipality))}
            />
            <StyledFieldWide
              component={TextField}
              data-test-id="detail-shipment-personally-address-zip"
              disabled={readonly}
              required={true}
              name={
                lastPathMember(shipmentPersonalFormValuesProxy.addressZip).path
              }
              type="text"
              label={t(translationPath(lang.general.zipCode))}
            />
            <StyledFieldWide
              component={TextField}
              data-test-id="detail-shipment-personally-address-state"
              disabled={readonly}
              name={
                lastPathMember(shipmentPersonalFormValuesProxy.addressState)
                  .path
              }
              type="text"
              label={t(translationPath(lang.general.addressState))}
            />
            <BaseBottomForm />
          </Form>
        );
      }}
    </Formik>
  );
};

export const ShipmentPersonalForm = withTranslation()(React.memo(Component));
