import clsx from "clsx";
import { DateTimePicker } from "core/components/datetimepicker";
import {
  StyledFakeField,
  StyledField,
  StyledFieldWide,
  useStyles
} from "core/components/dialog/Dialog.styles";
import { shipmentDocumentProxy } from "core/types";
import { TextField } from "formik-material-ui";
import React from "react";
import { withTranslation } from "react-i18next";
import {
  ComponentUpperFormType,
  shipmentFormValuesProxy
} from "share/components/dialog/shipmentDetailDialog/_types";
import { lastPathMember, translationPath } from "share/utils/getPath";
import { lang, t, WithTranslation } from "translation/i18n";

const ComponentUpperForm = ({
  initialValues,
  readonly,
  toDispatchDatePosition,
  onlyThreeColumns
}: ComponentUpperFormType & WithTranslation) => {
  const dialogClasses = useStyles();
  const classesForLines = clsx(dialogClasses.fullWidth, dialogClasses.form);

  return (
    <>
      <div className={classesForLines}>
        <StyledField
          component={TextField}
          data-test-id="detail-shipment-base-pid"
          disabled={true}
          name={lastPathMember(shipmentDocumentProxy.properties?.ssl?.pid).path}
          type="text"
          label={t(translationPath(lang.general.identifier))}
        />
        <StyledField
          component={TextField}
          data-test-id="detail-shipment-base-nodeTypeName"
          disabled={true}
          name={lastPathMember(shipmentFormValuesProxy.nodeTypeName).path}
          type="text"
          label={t(translationPath(lang.general.sendMode))}
        />
        <StyledField
          component={TextField}
          data-test-id="detail-shipment-base-shRef"
          disabled={true}
          name={
            lastPathMember(shipmentDocumentProxy.properties?.ssl?.shRef).path
          }
          type="text"
          label={t(translationPath(lang.shipmentForm.shRef))}
        />
        {!!toDispatchDatePosition &&
        toDispatchDatePosition === "top" &&
        !!initialValues.toDispatchDate ? (
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
        ) : !onlyThreeColumns ? (
          <StyledFakeField />
        ) : null}
      </div>
      <div className={classesForLines}>
        <DateTimePicker
          data-test-id="detail-shipment-base-createdAt"
          disabled={true}
          name={lastPathMember(shipmentDocumentProxy.createdAt).path}
          label={t(translationPath(lang.shipmentForm.createdAt))}
        />
        {!!initialValues.dispatchDate ? (
          <DateTimePicker
            data-test-id="detail-shipment-base-dispatchDate"
            disabled={true}
            name={
              lastPathMember(
                shipmentDocumentProxy.properties?.ssl?.dispatchDate
              ).path
            }
            label={t(translationPath(lang.shipmentForm.dispatchDate))}
          />
        ) : (
          <StyledFakeField />
        )}
        {!!initialValues.dispatchedDate ? (
          <DateTimePicker
            data-test-id="detail-shipment-base-dispatchedDate"
            disabled={true}
            name={
              lastPathMember(
                shipmentDocumentProxy.properties?.ssl?.dispatchedDate
              ).path
            }
            label={t(translationPath(lang.shipmentForm.dispatchedDate))}
          />
        ) : (
          <StyledFakeField />
        )}
        {!!initialValues.deliveryDate ? (
          <DateTimePicker
            data-test-id="detail-shipment-base-deliveryDate"
            disabled={true}
            name={
              lastPathMember(
                shipmentDocumentProxy.properties?.ssl?.deliveryDate
              ).path
            }
            label={t(translationPath(lang.shipmentForm.deliveryDate))}
          />
        ) : !onlyThreeColumns ? (
          <StyledFakeField />
        ) : null}
      </div>
      {!!toDispatchDatePosition &&
      toDispatchDatePosition === "bottom" &&
      !!initialValues.toDispatchDate ? (
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

      <StyledFieldWide
        component={TextField}
        data-test-id="detail-shipment-base-subject"
        required={!readonly}
        disabled={readonly}
        name={
          lastPathMember(shipmentDocumentProxy.properties?.ssl?.subject).path
        }
        type="text"
        label={t(translationPath(lang.general.subject))}
      />
    </>
  );
};

const ComponentBottomForm = () => {
  const dialogClasses = useStyles();
  return (
    <>
      <div className={clsx(dialogClasses.fullWidth, dialogClasses.form)}>
        <StyledField
          component={TextField}
          data-test-id="detail-shipment-base-ssid"
          disabled={true}
          name={
            lastPathMember(shipmentDocumentProxy.properties?.ssl?.ssid).path
          }
          type="text"
          label={t(translationPath(lang.shipmentForm.ssid))}
        />
        <StyledField
          component={TextField}
          data-test-id="detail-shipment-base-fileIdentificator"
          disabled={true}
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
          data-test-id="detail-shipment-base-senderSSID"
          disabled={true}
          name={
            lastPathMember(shipmentDocumentProxy.properties?.ssl?.senderSSID)
              .path
          }
          type="text"
          label={t(translationPath(lang.shipmentForm.senderSSID))}
        />
        <StyledField
          component={TextField}
          data-test-id="detail-shipment-base-senderIdent"
          disabled={true}
          name={
            lastPathMember(shipmentDocumentProxy.properties?.ssl?.senderIdent)
              .path
          }
          type="text"
          label={t(translationPath(lang.shipmentForm.senderIdent))}
        />
      </div>
    </>
  );
};

export const BaseUpperForm = withTranslation()(ComponentUpperForm);
export const BaseBottomForm = withTranslation()(ComponentBottomForm);
