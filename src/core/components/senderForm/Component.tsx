import { FormControlLabel, Radio, RadioGroup } from "@material-ui/core";
import clsx from "clsx";
import { Field, FormikHelpers } from "formik";
import { TextField } from "formik-material-ui";
import React, { useState } from "react";
import { lastPathMember, translationPath } from "share/utils/getPath";
import { lang, t } from "translation/i18n";
import { SslProperties } from "../../api/models";
import { sslPropsProxy } from "../../types";
import { StyledFieldWide, useStyles } from "../dialog/Dialog.styles";
import { RadioTypes, SenderFieldsTypesProxy } from "./_types";

interface SenderFormProps {
  disabledFields?: string[];
  readonly?: boolean;
}

const senderFields = [
  lastPathMember(SenderFieldsTypesProxy.sender_address).path,
  lastPathMember(SenderFieldsTypesProxy.sender_contact).path,
  lastPathMember(SenderFieldsTypesProxy.sender_job).path,
  lastPathMember(SenderFieldsTypesProxy.sender_name).path,
  lastPathMember(SenderFieldsTypesProxy.sender_orgName).path,
  lastPathMember(SenderFieldsTypesProxy.sender_orgUnit).path
];

interface RadioWrapperProps {
  readonly?: boolean[] | boolean;
  disabledFields?: string[];
  initialValues: SslProperties;
  setFieldValue: FormikHelpers<SslProperties>["setFieldValue"];
  hidden?: {
    individual?: boolean;
    legal?: boolean;
    own?: boolean;
  };
}

export const SenderRadioWrapper = ({
  readonly,
  setFieldValue,
  disabledFields,
  initialValues,
  hidden
}: RadioWrapperProps) => {
  const classes = useStyles();
  const [senderState, setSenderState] = useState<string>(
    initialValues?.senderType || RadioTypes.individual
  );
  const [initSenderType] = useState<string>(
    initialValues?.senderType || RadioTypes.individual
  );

  const onRadioFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFieldValue(lastPathMember(sslPropsProxy.senderType).path, value);
    setSenderState(value);

    senderFields.forEach((field) => {
      const fieldValue = initSenderType === value ? initialValues[field] : "";
      setFieldValue(field, fieldValue);
    });
  };

  const [ro_individual, ro_legal, ro_own] = Array.isArray(readonly)
    ? readonly
    : [readonly, readonly, readonly];

  return (
    <>
      <Field
        className={clsx(
          classes.fullWidth,
          classes.mtGap,
          classes.flexDirectionRow
        )}
        component={RadioGroup}
        name={lastPathMember(sslPropsProxy.senderType).path}
        value={senderState || RadioTypes.individual}
        onChange={onRadioFieldChange}
      >
        <h3 style={{ marginRight: 30 }}>
          {t(translationPath(lang.general.sender))}
        </h3>
        {!hidden?.individual && (
          <FormControlLabel
            control={<Radio />}
            disabled={ro_individual}
            label={t(translationPath(lang.general.senderIndividualPerson))}
            value={RadioTypes.individual}
          />
        )}
        {!hidden?.legal && (
          <FormControlLabel
            control={<Radio />}
            disabled={ro_legal}
            label={t(translationPath(lang.general.senderLegalPerson))}
            value={RadioTypes.legal}
          />
        )}
        {!hidden?.own && (
          <FormControlLabel
            control={<Radio />}
            disabled={ro_own}
            label={t(translationPath(lang.general.senderOwn))}
            value={RadioTypes.own}
          />
        )}
      </Field>
      {senderState === RadioTypes.individual ? (
        <IndividualSenderForm
          disabledFields={disabledFields}
          readonly={ro_individual}
        />
      ) : senderState === RadioTypes.legal ? (
        <LegalSenderForm disabledFields={disabledFields} readonly={ro_legal} />
      ) : null}
    </>
  );
};

export const IndividualSenderForm = ({
  disabledFields,
  readonly
}: SenderFormProps) => {
  return (
    <>
      <StyledFieldWide
        component={TextField}
        data-test-id="meta-input-sender_name"
        disabled={
          readonly ||
          disabledFields?.includes(
            lastPathMember(sslPropsProxy.sender_name).path
          )
        }
        name={lastPathMember(sslPropsProxy.sender_name).path}
        type="text"
        label={t(translationPath(lang.general.nameSurname))}
      />
      <StyledFieldWide
        component={TextField}
        data-test-id="meta-input-sender_address"
        disabled={
          readonly ||
          disabledFields?.includes(
            lastPathMember(sslPropsProxy.sender_address).path
          )
        }
        name={lastPathMember(sslPropsProxy.sender_address).path}
        type="text"
        label={t(translationPath(lang.general.address))}
      />
      <StyledFieldWide
        component={TextField}
        data-test-id="meta-input-sender_contact"
        disabled={
          readonly ||
          disabledFields?.includes(
            lastPathMember(sslPropsProxy.sender_contact).path
          )
        }
        name={lastPathMember(sslPropsProxy.sender_contact).path}
        type="text"
        label={t(translationPath(lang.general.contact))}
      />
    </>
  );
};

export const LegalSenderForm = ({
  disabledFields,
  readonly
}: SenderFormProps) => {
  return (
    <>
      <StyledFieldWide
        component={TextField}
        data-test-id="meta-input-org-name"
        disabled={
          readonly ||
          disabledFields?.includes(
            lastPathMember(sslPropsProxy.sender_orgName).path
          )
        }
        name={lastPathMember(sslPropsProxy.sender_orgName).path}
        type="text"
        label={t(translationPath(lang.general.orgName))}
      />
      <StyledFieldWide
        component={TextField}
        data-test-id="meta-input-sender-address"
        disabled={
          readonly ||
          disabledFields?.includes(
            lastPathMember(sslPropsProxy.sender_address).path
          )
        }
        name={lastPathMember(sslPropsProxy.sender_address).path}
        type="text"
        label={t(translationPath(lang.general.orgAddress))}
      />
      <StyledFieldWide
        component={TextField}
        data-test-id="meta-input-sender-sender-org-unit"
        disabled={
          readonly ||
          disabledFields?.includes(
            lastPathMember(sslPropsProxy.sender_orgUnit).path
          )
        }
        name={lastPathMember(sslPropsProxy.sender_orgUnit).path}
        type="text"
        label={t(translationPath(lang.general.orgUnit))}
      />
      <StyledFieldWide
        component={TextField}
        data-test-id="meta-input-sender-name"
        disabled={
          readonly ||
          disabledFields?.includes(
            lastPathMember(sslPropsProxy.sender_name).path
          )
        }
        name={lastPathMember(sslPropsProxy.sender_name).path}
        type="text"
        label={t(translationPath(lang.general.nameSurname))}
      />
      <StyledFieldWide
        component={TextField}
        data-test-id="meta-input-sender-job"
        disabled={
          readonly ||
          disabledFields?.includes(
            lastPathMember(sslPropsProxy.sender_job).path
          )
        }
        name={lastPathMember(sslPropsProxy.sender_job).path}
        type="text"
        label={t(translationPath(lang.general.senderJob))}
      />
      <StyledFieldWide
        component={TextField}
        data-test-id="meta-input-sender-contact"
        disabled={
          readonly ||
          disabledFields?.includes(
            lastPathMember(sslPropsProxy.sender_contact).path
          )
        }
        name={lastPathMember(sslPropsProxy.sender_contact).path}
        type="text"
        label={t(translationPath(lang.general.contact))}
      />
    </>
  );
};
