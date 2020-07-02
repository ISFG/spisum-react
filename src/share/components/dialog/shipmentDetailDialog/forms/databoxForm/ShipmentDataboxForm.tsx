import { DateTimePicker } from "core/components/datetimepicker";
import {
  StyledField,
  StyledFieldWide,
  useStyles
} from "core/components/dialog/Dialog.styles";
import { FormState } from "core/components/reactiveFormik/_types";
import { shipmentDocumentProxy } from "core/types";
import { Form, Formik } from "formik";
import { CheckboxWithLabel, TextField } from "formik-material-ui";
import React from "react";
import { withTranslation } from "react-i18next";
import { lastPathMember, translationPath } from "share/utils/getPath";
import { lang, t, WithTranslation } from "translation/i18n";
import { MetaFormProps } from "../../../_types";
import { ShipmentFormValues } from "../../_types";
import { BaseUpperForm } from "../baseForm/ShipmentBaseForm";
import { validate } from "./_validations";

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
            <BaseUpperForm initialValues={initialValues} readonly={readonly}  />
            <StyledFieldWide
              component={TextField}
              data-test-id="detail-shipment-databox-toHands"
              disabled={readonly}
              name={
                lastPathMember(shipmentDocumentProxy.properties?.ssl?.toHands)
                  .path
              }
              type="text"
              label={t(translationPath(lang.shipmentForm.toHands))}
            />

            <div className={dialogClasses.fullWidth}>
              <StyledField
                className={dialogClasses.gapRight}
                component={TextField}
                data-test-id="detail-shipment-databox-recipient"
                disabled={readonly}
                name={
                  lastPathMember(
                    shipmentDocumentProxy.properties?.ssl?.recipient
                  ).path
                }
                type="text"
                label={t(translationPath(lang.shipmentForm.recipientDataboxID))}
              />
              <StyledField
                className={dialogClasses.gapRight}
                component={TextField}
                data-test-id="detail-shipment-databox-sender"
                disabled={true}
                InputLabelProps={{ className: "MuiFormLabel-root--long-text" }}
                name={
                  lastPathMember(shipmentDocumentProxy.properties?.ssl?.fake)
                    .path
                }
                type="text"
                label={t(translationPath(lang.shipmentForm.senderDataboxID))}
              />
            </div>
            <div className={dialogClasses.fullWidth}>
              <StyledField
                component={TextField}
                data-test-id="detail-shipment-databox-legalTitleLaw"
                className={dialogClasses.gapRight}
                disabled={readonly}
                name={
                  lastPathMember(
                    shipmentDocumentProxy.properties?.ssl?.legalTitleLaw
                  ).path
                }
                type="text"
                label={t(translationPath(lang.shipmentForm.legalTitleLaw))}
              />
              <StyledField
                component={TextField}
                data-test-id="detail-shipment-databox-legalTitleYear"
                disabled={readonly}
                className={dialogClasses.gapRight}
                name={
                  lastPathMember(
                    shipmentDocumentProxy.properties?.ssl?.legalTitleYear
                  ).path
                }
                type="string"
                label={t(translationPath(lang.shipmentForm.legalTitleYear))}
              />
              <StyledField
                component={TextField}
                data-test-id="detail-shipment-databox-legalTitleSect"
                disabled={readonly}
                className={dialogClasses.gapRight}
                name={
                  lastPathMember(
                    shipmentDocumentProxy.properties?.ssl?.legalTitleSect
                  ).path
                }
                type="text"
                label={t(translationPath(lang.shipmentForm.legalTitleSect))}
              />
              <StyledField
                component={TextField}
                data-test-id="detail-shipment-databox-legalTitlePar"
                disabled={readonly}
                InputLabelProps={{ className: "MuiFormLabel-root--long-text" }}
                name={
                  lastPathMember(
                    shipmentDocumentProxy.properties?.ssl?.legalTitlePar
                  ).path
                }
                type="text"
                label={t(translationPath(lang.shipmentForm.legalTitlePar))}
              />
            </div>

            <div className={dialogClasses.fullWidth}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row"
                }}
              >
                <StyledField
                  className={dialogClasses.gapRight}
                  component={TextField}
                  data-test-id="detail-shipment-databox-legalTitlePoint"
                  InputLabelProps={{
                    className: "MuiFormLabel-root--long-text"
                  }}
                  disabled={readonly}
                  name={
                    lastPathMember(
                      shipmentDocumentProxy.properties?.ssl?.legalTitlePoint
                    ).path
                  }
                  type="text"
                  label={t(translationPath(lang.shipmentForm.legalTitlePoint))}
                />
                <StyledField
                  component={CheckboxWithLabel}
                  data-test-id="detail-shipment-databox-allowSubstDelivery"
                  disabled={readonly}
                  name={
                    lastPathMember(
                      shipmentDocumentProxy.properties?.ssl?.allowSubstDelivery
                    ).path
                  }
                  type="checkbox"
                  Label={{
                    className: dialogClasses.styledCheckboxGapRight,
                    label: t(
                      translationPath(lang.general.forbidFictionDelivery)
                    )
                  }}
                />
                <StyledField
                  component={CheckboxWithLabel}
                  data-test-id="detail-shipment-databox-personalDelivery"
                  disabled={readonly}
                  className={dialogClasses.mlGap}
                  name={
                    lastPathMember(
                      shipmentDocumentProxy.properties?.ssl?.personalDelivery
                    ).path
                  }
                  type="checkbox"
                  Label={{
                    className: dialogClasses.styledCheckboxGapRight,
                    label: t(translationPath(lang.general.toOwnHands))
                  }}
                />
              </div>
            </div>
            <div className={dialogClasses.fullWidth}>
              <StyledField
                component={TextField}
                data-test-id="detail-shipment-databox-ssid"
                disabled={true}
                className={dialogClasses.gapRight}
                name={
                  lastPathMember(shipmentDocumentProxy.properties?.ssl?.ssid)
                    .path
                }
                type="text"
                label={t(translationPath(lang.shipmentForm.ssid))}
              />
              <StyledField
                component={TextField}
                data-test-id="detail-shipment-databox-fileIdentificator"
                disabled={true}
                className={dialogClasses.gapRight}
                name={
                  lastPathMember(
                    shipmentDocumentProxy.properties?.ssl?.fileIdentificator
                  ).path
                }
                type="string"
                label={t(translationPath(lang.shipmentForm.fileIdentificator))}
              />
              <StyledField
                component={TextField}
                data-test-id="detail-shipment-databox-senderSSID"
                disabled={true}
                className={dialogClasses.gapRight}
                name={
                  lastPathMember(
                    shipmentDocumentProxy.properties?.ssl?.senderSSID
                  ).path
                }
                type="text"
                label={t(translationPath(lang.shipmentForm.senderSSID))}
              />
              <StyledField
                component={TextField}
                data-test-id="detail-shipment-databox-senderIdent"
                disabled={true}
                name={
                  lastPathMember(
                    shipmentDocumentProxy.properties?.ssl?.senderIdent
                  ).path
                }
                type="text"
                label={t(translationPath(lang.shipmentForm.senderIdent))}
              />
            </div>
            <div className={dialogClasses.fullWidth}>
              <StyledField
                className={dialogClasses.gapRight}
                component={TextField}
                data-test-id="detail-shipment-databox-state"
                disabled={true}
                name={
                  lastPathMember(shipmentDocumentProxy.properties?.ssl?.state)
                    .path
                }
                type="text"
                label={t(translationPath(lang.shipmentForm.state))}
              />
              <StyledField
                component={TextField}
                data-test-id="detail-shipment-databox-dmID"
                disabled={true}
                className={dialogClasses.gapRight}
                name={
                  lastPathMember(shipmentDocumentProxy.properties?.ssl?.sender)
                    .path
                }
                type="text"
                label={t(translationPath(lang.shipmentForm.dmID))}
              />
              {!!initialValues.toDispatchDate ? (
                <DateTimePicker
                  data-test-id="detail-shipment-base-toDispatchDate"
                  disabled={true}
                  name={
                    lastPathMember(
                      shipmentDocumentProxy.properties?.ssl?.toDispatchDate
                    ).path
                  }
                  label={t(translationPath(lang.shipmentForm.toDispatchDate))}
                />
              ) : null}
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

export const ShipmentDataboxForm = withTranslation()(React.memo(Component));
