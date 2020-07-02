import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import { SslAnalogWithOwner } from "core/api/models";
import Datepicker from "core/components/datepicker";
import {
  StyledFakeFieldFifth,
  StyledFieldFifth,
  StyledFieldWide,
  StyledFormControlFifth,
  useStyles
} from "core/components/dialog/Dialog.styles";
import FormControlWithError from "core/components/formControlWithError";
import { MetaFormProps } from "core/components/MetaForm/_types";
import { FormState } from "core/components/reactiveFormik/_types";
import { SenderRadioWrapper } from "core/components/senderForm/Component";
import { analogDocumentProxy, sslPropsProxy } from "core/types";
import { DocumentType } from "enums";
import { Field, Form, Formik } from "formik";
import { Select, TextField } from "formik-material-ui";
import React from "react";
import { useSelector } from "react-redux";
import { RootStateType } from "reducers";
import { lastPathMember, translationPath } from "share/utils/getPath";
import { lang, t, WithTranslation, withTranslation } from "translation/i18n";
import {
  StyledDatepickerFifth,
  StyledKeyboardDatePickerFifth
} from "../../../../core/components/datepicker/Component.styles";
import { DateTimePicker } from "../../../../core/components/datetimepicker";
import { StyledDateTimePickerFifth } from "../../../../core/components/datetimepicker/Component.styles";
import { SSLStateField } from "../../form/fields/SSLStateField";
import { validate } from "./_validations";

const Component = ({
  initialValues,
  formRef,
  readonly
}: MetaFormProps<SslAnalogWithOwner> & WithTranslation) => {
  const { shreddingPlans } = useSelector(
    (state: RootStateType) => state.loginReducer.global
  );
  const isReadonly = !!readonly;
  const classes = useStyles();
  const handle = (): void => void 0;

  return (
    <Formik<SslAnalogWithOwner>
      initialValues={initialValues}
      validate={validate}
      innerRef={formRef || handle}
      onSubmit={handle}
    >
      {({ setFieldValue, values }: FormState<SslAnalogWithOwner>) => {
        let filePlan = shreddingPlans.find(
          (plan) => plan.id === values.filePlan
        );
        let fileMarks = filePlan?.items || [];

        const handlePlanChange = (e: React.ChangeEvent<HTMLInputElement>) => {
          filePlan = shreddingPlans.find((plan) => plan.id === e.target.value);
          fileMarks = filePlan?.items || [];
          setRetentionValues(values.fileMark);
        };

        const handleMarkChange = (e: React.ChangeEvent<HTMLInputElement>) => {
          setRetentionValues(e.target.value);
        };

        const setRetentionValues = (value?: string) => {
          const fileMark = fileMarks.find((mark) => mark.fileMark === value);
          const retentionMode = fileMark
            ? `${fileMark.retentionMark}/${fileMark.period}`
            : "";

          setFieldValue(
            lastPathMember(sslPropsProxy.retentionMark).path,
            fileMark?.retentionMark || ""
          );

          setFieldValue(
            lastPathMember(sslPropsProxy.retentionPeriod).path,
            fileMark?.period || null
          );

          setFieldValue(
            lastPathMember(sslPropsProxy.retentionMode).path,
            retentionMode
          );
        };

        return (
          <Form className={classes.form}>
            <StyledFieldFifth
              component={TextField}
              data-test-id="meta-input-pid"
              disabled={true}
              name={lastPathMember(sslPropsProxy.pid).path}
              type="text"
              label={t(translationPath(lang.general.pid))}
            />
            <DateTimePicker
              component={StyledDateTimePickerFifth}
              data-test-id="meta-input-createdAt"
              disabled={true}
              name={lastPathMember(sslPropsProxy.createdAt).path}
              label={t(translationPath(lang.general.dateOfCreation))}
            />
            <StyledFormControlFifth>
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
            </StyledFormControlFifth>
            <StyledFieldFifth
              component={TextField}
              data-test-id="meta-input-ssid"
              disabled={true}
              name={lastPathMember(sslPropsProxy.ssid).path}
              type="text"
              label={t(translationPath(lang.general.ssid))}
            />
            <DateTimePicker
              component={StyledDatepickerFifth}
              data-test-id="meta-input-createdAt"
              disabled={true}
              name={lastPathMember(analogDocumentProxy.createdAt).path}
              label={t(translationPath(lang.general.dateOfCreation))}
            />

            <SSLStateField />

            <StyledFieldFifth
              component={TextField}
              data-test-id="meta-input-attachmentsCount"
              disabled={isReadonly}
              name={lastPathMember(sslPropsProxy.attachmentsCount).path}
              type="number"
              label={t(translationPath(lang.general.attachmentsCount))}
            />
            <StyledFieldFifth
              component={TextField}
              data-test-id="meta-input-attachmentsType"
              disabled={isReadonly}
              name={lastPathMember(sslPropsProxy.attachmentsType).path}
              type="string"
              label={t(translationPath(lang.general.attachmentsType))}
            />
            <StyledFieldFifth
              component={TextField}
              data-test-id="meta-input-listCountAttachments"
              disabled={isReadonly}
              name={lastPathMember(sslPropsProxy.listCountAttachments).path}
              type="number"
              label={t(translationPath(lang.general.listCountAttachments))}
            />
            <StyledFieldFifth
              component={TextField}
              data-test-id="meta-input-senderIdent"
              disabled={isReadonly}
              name={lastPathMember(sslPropsProxy.senderIdent).path}
              type="text"
              InputLabelProps={{ className: "MuiFormLabel-root--long-text" }}
              label={t(translationPath(lang.general.senderIdent))}
            />
            <Datepicker
              component={StyledKeyboardDatePickerFifth}
              data-test-id="meta-input-settleTo"
              disabled={isReadonly}
              disablePast={true}
              name={lastPathMember(sslPropsProxy.settleToDate).path}
              label={t(translationPath(lang.general.settleToDate))}
            />
            <FormControlWithError
              component={StyledFormControlFifth}
              name={lastPathMember(sslPropsProxy.filePlan).path}
            >
              <InputLabel htmlFor="filePlan" required={true}>
                {t(translationPath(lang.general.filePlan))}
              </InputLabel>
              <Field
                component={Select}
                data-test-id="meta-input-filePlan"
                disabled={isReadonly}
                name={lastPathMember(sslPropsProxy.filePlan).path}
                inputProps={{
                  id: "filePlan",
                  onChange: handlePlanChange
                }}
              >
                <MenuItem className={classes.emptyMenuItem} value="" />
                {shreddingPlans.map((plan) => {
                  return (
                    <MenuItem value={plan.id} key={plan.id}>
                      {plan.name}
                    </MenuItem>
                  );
                })}
              </Field>
            </FormControlWithError>
            <FormControlWithError
              component={StyledFormControlFifth}
              name={lastPathMember(sslPropsProxy.fileMark).path}
            >
              <InputLabel htmlFor="fileMark" required={true}>
                {t(translationPath(lang.general.fileMark))}
              </InputLabel>
              <Field
                component={Select}
                data-test-id="meta-input-fileMark"
                disabled={isReadonly}
                name={lastPathMember(sslPropsProxy.fileMark).path}
                inputProps={{
                  id: "fileMark",
                  onChange: handleMarkChange
                }}
              >
                <MenuItem className={classes.emptyMenuItem} value="" />
                {fileMarks.map((mark) => {
                  return (
                    <MenuItem
                      disabled={mark.isCaption}
                      value={mark.fileMark}
                      key={mark.fileMark}
                    >
                      {`${mark.fileMark} - ${mark.subjectGroup}`}
                    </MenuItem>
                  );
                })}
              </Field>
            </FormControlWithError>
            <StyledFieldFifth
              component={TextField}
              data-test-id="meta-input-senderSSID"
              disabled={isReadonly}
              InputLabelProps={{ className: "MuiFormLabel-root--long-text" }}
              name={lastPathMember(sslPropsProxy.senderSSID).path}
              type="string"
              label={t(translationPath(lang.general.senderSSID))}
            />
            <StyledFieldFifth
              component={TextField}
              data-test-id="meta-input-listCount"
              disabled={isReadonly}
              name={lastPathMember(sslPropsProxy.listCount).path}
              type="number"
              label={t(translationPath(lang.general.listCount))}
            />
            <StyledFieldFifth
              component={TextField}
              data-test-id="meta-input-owner"
              disabled={true}
              name={"owner"}
              type="string"
              label={t(translationPath(lang.general.owner))}
            />

            <StyledFieldFifth
              component={TextField}
              data-test-id="meta-input-retentionMode"
              disabled={true}
              name={lastPathMember(sslPropsProxy.retentionMode).path}
              type="string"
              label={t(translationPath(lang.general.retentionMode))}
            />
            <StyledFakeFieldFifth />
            <StyledFakeFieldFifth />
            <StyledFakeFieldFifth />
            <StyledFakeFieldFifth />

            <StyledFieldWide
              component={TextField}
              data-test-id="meta-input-subject"
              disabled={isReadonly}
              name={lastPathMember(sslPropsProxy.subject).path}
              type="string"
              label={t(translationPath(lang.general.subject))}
            />

            <SenderRadioWrapper
              initialValues={initialValues}
              setFieldValue={setFieldValue}
              readonly={true}
            />
          </Form>
        );
      }}
    </Formik>
  );
};

export const AnalogOwnMetadataForm = withTranslation()(React.memo(Component));
