import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import { SslAnalog } from "core/api/models";
import Datepicker from "core/components/datepicker/Component";
import { StyledKeyboardDatePickerFifth } from "core/components/datepicker/Component.styles";
import { DateTimePicker } from "core/components/datetimepicker";
import { StyledDateTimePickerFifth } from "core/components/datetimepicker/Component.styles";
import {
  StyledFieldFifth,
  StyledFieldWide,
  StyledFormControlFifth,
  useStyles
} from "core/components/dialog/Dialog.styles";
import FormControlWithError from "core/components/formControlWithError";
import { MetaFormProps } from "core/components/MetaForm/_types";
import { FormState } from "core/components/reactiveFormik/_types";
import { SenderRadioWrapper } from "core/components/senderForm/Component";
import { cmPropsProxy, sslPropsProxy } from "core/types";
import { DocumentType } from "enums";
import { Field, Form, Formik } from "formik";
import { Select, TextField } from "formik-material-ui";
import React from "react";
import { withTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { RootStateType } from "reducers";
import { lastPathMember, translationPath } from "share/utils/getPath";
import { lang, t, WithTranslation } from "translation/i18n";
import { SslDocumentState } from "../../form/fields/SSLDocumentState";
import { validate } from "./_validations";

const Component = ({
  initialValues,
  formRef,
  readonly
}: MetaFormProps<SslAnalog> & WithTranslation) => {
  const classes = useStyles();
  const handle = (): void => void 0;
  const { shreddingPlans } = useSelector(
    (state: RootStateType) => state.loginReducer.global
  );

  return (
    <Formik<SslAnalog>
      initialValues={initialValues}
      validate={validate}
      innerRef={formRef || handle}
      onSubmit={handle}
    >
      {({ setFieldValue, values }: FormState<SslAnalog>) => {
        let filePlan = shreddingPlans.find(
          (plan) => plan.id === values.filePlan
        );
        let fileMarks = filePlan?.items || [];

        const handlePlanChange = (e: React.ChangeEvent<HTMLInputElement>) => {
          filePlan = shreddingPlans.find((plan) => plan.id === e.target.value);
          fileMarks = filePlan?.items || [];

          if (!e.target.value) {
            setFieldValue(lastPathMember(sslPropsProxy.fileMark).path, "");
          }

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
                <MenuItem value={DocumentType.Hybrid}>
                  {t(translationPath(lang.general.hybrid))}
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
            <StyledFieldFifth
              component={TextField}
              data-test-id="meta-input-fileIdentificator"
              disabled={true}
              name={lastPathMember(sslPropsProxy.fileIdentificator).path}
              type="text"
              label={t(translationPath(lang.general.fileIdentificator))}
            />
            <DateTimePicker
              component={StyledDateTimePickerFifth}
              data-test-id="meta-input-createdAt"
              disabled={true}
              name={lastPathMember(sslPropsProxy.createdAt).path}
              label={t(translationPath(lang.general.createdDateAndTime))}
            />
            <Datepicker
              component={StyledKeyboardDatePickerFifth}
              data-test-id="meta-input-createdDate"
              disabled={true}
              name={lastPathMember(sslPropsProxy.createdDate).path}
              label={t(translationPath(lang.general.dateOfEvidence))}
            />
            <Datepicker
              component={StyledKeyboardDatePickerFifth}
              data-test-id="meta-input-settleTo"
              disablePast={true}
              disabled={readonly}
              name={lastPathMember(sslPropsProxy.settleToDate).path}
              label={t(translationPath(lang.general.settleToDate))}
            />
            <StyledFieldFifth
              component={TextField}
              data-test-id="meta-input-associationCount"
              disabled={true}
              name={lastPathMember(sslPropsProxy.associationCount).path}
              type="number"
              label={t(translationPath(lang.general.documentsCount))}
            />
            <StyledFieldFifth
              component={TextField}
              data-test-id="meta-input-owner"
              disabled={true}
              name={lastPathMember(cmPropsProxy.owner).path}
              type="text"
              label={t(translationPath(lang.general.owner))}
            />

            <SslDocumentState isFile={true} />

            <StyledFieldFifth
              component={TextField}
              data-test-id="meta-input-retentionMode"
              disabled={true}
              name={lastPathMember(sslPropsProxy.retentionMode).path}
              type="string"
              label={t(translationPath(lang.general.retentionMode))}
            />
            <FormControlWithError
              name={lastPathMember(sslPropsProxy.filePlan).path}
              component={StyledFormControlFifth}
            >
              <InputLabel htmlFor="filePlan">
                {t(translationPath(lang.general.filePlan))}
              </InputLabel>
              <Field
                component={Select}
                data-test-id="meta-input-filePlan"
                disabled={readonly}
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
              name={lastPathMember(sslPropsProxy.fileMark).path}
              component={StyledFormControlFifth}
            >
              <InputLabel htmlFor="fileMark">
                {t(translationPath(lang.general.fileMark))}
              </InputLabel>
              <Field
                component={Select}
                data-test-id="meta-input-fileMark"
                disabled={readonly || !values.filePlan}
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
              disabled={readonly}
              name={lastPathMember(sslPropsProxy.senderSSID).path}
              type="string"
              label={t(translationPath(lang.general.senderSSID))}
            />
            <StyledFieldFifth
              component={TextField}
              data-test-id="meta-input-senderIdent"
              disabled={readonly}
              InputLabelProps={{ className: "MuiFormLabel-root--long-text" }}
              name={lastPathMember(sslPropsProxy.senderIdent).path}
              type="text"
              label={t(translationPath(lang.general.senderIdent))}
            />
            <SenderRadioWrapper
              initialValues={initialValues}
              setFieldValue={setFieldValue}
              readonly={[true, true, true]}
            />
            <StyledFieldWide
              component={TextField}
              data-test-id="meta-input-subject"
              disabled={readonly}
              name={lastPathMember(sslPropsProxy.subject).path}
              type="string"
              label={t(translationPath(lang.general.subject))}
            />
          </Form>
        );
      }}
    </Formik>
  );
};

export const FileDetailsMetadataForm = withTranslation()(React.memo(Component));
