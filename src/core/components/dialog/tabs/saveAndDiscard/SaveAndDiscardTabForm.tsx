import { SslAnalog } from "core/api/models";
import Datepicker from "core/components/datepicker/Component";
import { DateTimePicker } from "core/components/datetimepicker";
import { StyledDateTimePickerFifth } from "core/components/datetimepicker/Component.styles";
import {
  StyledFakeFieldFifth,
  StyledFieldFifth,
  useStyles
} from "core/components/dialog/Dialog.styles";
import { MetaFormProps } from "core/components/MetaForm/_types";
import { FormState } from "core/components/reactiveFormik/_types";
import { sslPropsProxy } from "core/types";
import { Form, Formik } from "formik";
import { TextField } from "formik-material-ui";
import React from "react";
import { withTranslation } from "react-i18next";
import { lastPathMember, translationPath } from "share/utils/getPath";
import { lang, t, WithTranslation } from "translation/i18n";
import { StyledKeyboardDatePickerFifth } from "../../../datepicker/Component.styles";

const Component = ({
  initialValues,
  formRef,
  readonly
}: MetaFormProps<SslAnalog> & WithTranslation) => {
  const classes = useStyles();
  const handle = (): void => void 0;

  return (
    <Formik<SslAnalog>
      initialValues={initialValues}
      innerRef={formRef || handle}
      onSubmit={handle}
    >
      {({ values }: FormState<SslAnalog>) => {
        return (
          <Form className={classes.form}>
            <DateTimePicker
              className={classes.datepickerLongLabel}
              component={StyledDateTimePickerFifth}
              data-test-id="meta-input-toRepositoryDate"
              disabled={readonly}
              name={lastPathMember(sslPropsProxy.toRepositoryDate).path}
              label={t(translationPath(lang.general.toRepositoryDate))}
              style={{ width: "18%" }}
            />
            <StyledFieldFifth
              component={TextField}
              data-test-id="meta-input-location"
              disabled={readonly}
              name={lastPathMember(sslPropsProxy.location).path}
              type="string"
              label={t(translationPath(lang.general.location))}
            />
            <Datepicker
              component={StyledKeyboardDatePickerFifth}
              data-test-id="meta-input-borrowDate"
              disabled={readonly}
              name={lastPathMember(sslPropsProxy.borrowDate).path}
              label={t(translationPath(lang.general.borrowDate))}
              showCalendarIcon={false}
            />
            <StyledFieldFifth
              component={TextField}
              data-test-id="meta-input-borrower"
              disabled={readonly}
              name={lastPathMember(sslPropsProxy.borrower).path}
              type="string"
              label={t(translationPath(lang.general.borrower))}
            />
            <Datepicker
              component={StyledKeyboardDatePickerFifth}
              data-test-id="meta-input-borrowReturnDate"
              disabled={readonly}
              name={lastPathMember(sslPropsProxy.borrowReturnDate).path}
              label={t(translationPath(lang.general.borrowReturnDate))}
              showCalendarIcon={false}
            />

            <StyledFieldFifth
              component={TextField}
              data-test-id="meta-input-filePlan"
              disabled={readonly}
              name={lastPathMember(sslPropsProxy.filePlan).path}
              type="string"
              label={t(translationPath(lang.general.filePlan))}
            />
            <StyledFieldFifth
              component={TextField}
              data-test-id="meta-input-fileMark"
              disabled={readonly}
              name={lastPathMember(sslPropsProxy.fileMark).path}
              type="text"
              label={t(translationPath(lang.general.fileMark))}
            />
            <StyledFieldFifth
              component={TextField}
              data-test-id="meta-input-retentionMode"
              disabled={readonly}
              name={lastPathMember(sslPropsProxy.retentionMode).path}
              type="text"
              label={t(translationPath(lang.general.retentionMode))}
            />
            <StyledFieldFifth
              component={TextField}
              data-test-id="meta-input-triggerActionId"
              disabled={readonly}
              name={lastPathMember(sslPropsProxy.triggerActionId).path}
              type="string"
              label={t(translationPath(lang.general.triggerActionId))}
            />
            <StyledFieldFifth
              component={TextField}
              data-test-id="meta-input-triggerActionYear"
              disabled={readonly}
              name={lastPathMember(sslPropsProxy.triggerActionYear).path}
              type="number"
              label={t(translationPath(lang.general.triggerActionYear))}
            />

            <StyledFieldFifth
              component={TextField}
              data-test-id="meta-input-shreddingYear"
              disabled={readonly}
              InputLabelProps={{ className: "MuiFormLabel-root--long-text" }}
              name={lastPathMember(sslPropsProxy.shreddingYear).path}
              type="text"
              label={t(translationPath(lang.general.shreddingYear))}
            />
            <Datepicker
              component={StyledKeyboardDatePickerFifth}
              data-test-id="meta-input-shreddingDate"
              disabled={readonly}
              name={lastPathMember(sslPropsProxy.shreddingDate).path}
              label={t(translationPath(lang.general.shreddingDate))}
              showCalendarIcon={false}
            />
            <StyledFieldFifth
              component={TextField}
              data-test-id="meta-input-shreddingResolution"
              disabled={readonly}
              InputLabelProps={{ className: "MuiFormLabel-root--long-text" }}
              name={lastPathMember(sslPropsProxy.shreddingResolution).path}
              type="text"
              label={t(translationPath(lang.general.shreddingResolution))}
            />
            <StyledFieldFifth
              component={TextField}
              data-test-id="meta-input-idDA"
              disabled={readonly}
              InputLabelProps={{ className: "MuiFormLabel-root--long-text" }}
              name={lastPathMember(sslPropsProxy.idDA).path}
              type="text"
              label={t(translationPath(lang.general.idDA))}
            />
            <StyledFakeFieldFifth />
          </Form>
        );
      }}
    </Formik>
  );
};

export const SaveAndDiscardTabForm = withTranslation()(React.memo(Component));
