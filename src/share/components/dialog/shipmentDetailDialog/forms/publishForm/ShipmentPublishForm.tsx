import Datepicker from "core/components/datepicker/Component";
import { DatepickerValueType } from "core/components/datepicker/_types";
import {
  StyledFakeField,
  StyledField,
  StyledFieldWide,
  useStyles
} from "core/components/dialog/Dialog.styles";
import { FormState } from "core/components/reactiveFormik/_types";
import { Form, Formik } from "formik";
import { TextField } from "formik-material-ui";
import moment from "moment";
import React from "react";
import { withTranslation } from "react-i18next";
import { lastPathMember, translationPath } from "share/utils/getPath";
import { lang, t, WithTranslation } from "translation/i18n";
import { MetaFormProps } from "../../../_types";
import {
  ShipmentFormValues,
  shipmentPublishFormValuesProxy
} from "../../_types";
import { BaseBottomForm, BaseUpperForm } from "../baseForm/ShipmentBaseForm";
import { validate } from "./_validations";
const Component = ({
  initialValues,
  formRef,
  readonly
}: MetaFormProps<ShipmentFormValues> & WithTranslation) => {
  const dialogClasses = useStyles();
  const handle = (): void => void 0;

  // it is an ugly anti-pattern to change objects from outside,
  // but we need to do it this way, so the "change" detection mechanism works
  // and it shows (or not) user the "unsaved changes" dialog.
  initialValues.days = initialValues.dateTo
    ? moment(initialValues.dateTo).diff(moment(initialValues.dateFrom), "d")
    : "";

  initialValues.dateTo =
    initialValues.dateTo !== undefined ? initialValues.dateTo : null;

  return (
    <Formik<ShipmentFormValues>
      initialValues={initialValues}
      validate={validate}
      innerRef={formRef || handle}
      onSubmit={handle}
    >
      {({ setFieldValue, values }: FormState<ShipmentFormValues>) => {
        const onDateChange = (value: DatepickerValueType) => {
          if (values.days) {
            setImmediate(() => {
              setFieldValue(
                "dateTo",
                moment(value?.valueOf()).add(values.days, "d").toDate()
              );
            });
          }
        };

        const onDaysChangeHandler = (
          e: React.ChangeEvent<HTMLInputElement>
        ) => {
          const value = e.target.value;
          if (value) {
            setFieldValue(
              "dateTo",
              moment(values.dateFrom?.valueOf()).add(value, "d")
            );
          } else {
            setFieldValue("days", " ");
            setFieldValue("dateTo", null);
          }
        };

        return (
          <Form className={dialogClasses.form}>
            <BaseUpperForm
              initialValues={initialValues}
              readonly={true}
              toDispatchDatePosition={"top"}
            />
            <BaseBottomForm />
            <Datepicker
              data-test-id="create-shipment-publish-dateFrom"
              disablePast={true}
              disabled={readonly}
              name={
                lastPathMember(shipmentPublishFormValuesProxy.dateFrom).path
              }
              label={t(translationPath(lang.general.dateFrom))}
              onDateChange={onDateChange}
              required={true}
            />
            <Datepicker
              data-test-id="create-shipment-publish-dateTo"
              disabled={true}
              name={lastPathMember(shipmentPublishFormValuesProxy.dateTo).path}
              label={t(translationPath(lang.general.dateTo))}
            />
            <StyledField
              component={TextField}
              data-test-id="create-shipment-publish-days"
              disabled={readonly}
              required={false}
              name={lastPathMember(shipmentPublishFormValuesProxy.days).path}
              type="number"
              min="1"
              label={t(translationPath(lang.general.daysCount))}
              inputProps={{
                onChange: onDaysChangeHandler
              }}
            />
            <StyledFakeField />

            <StyledFieldWide
              component={TextField}
              data-test-id="create-shipment-publish-note"
              disabled={readonly}
              required={false}
              name={lastPathMember(shipmentPublishFormValuesProxy.note).path}
              type="text"
              label={t(translationPath(lang.general.note))}
            />
          </Form>
        );
      }}
    </Formik>
  );
};

export const ShipmentPublishForm = withTranslation()(React.memo(Component));
