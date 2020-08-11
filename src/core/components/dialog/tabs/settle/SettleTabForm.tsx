import { SslAnalog } from "core/api/models";
import { DateTimePicker } from "core/components/datetimepicker";
import { StyledField, useStyles } from "core/components/dialog/Dialog.styles";
import { MetaFormProps } from "core/components/MetaForm/_types";
import { FormState } from "core/components/reactiveFormik/_types";
import { sslPropsProxy } from "core/types";
import { SettleMethod } from "enums";
import { Form, Formik } from "formik";
import { TextField } from "formik-material-ui";
import React from "react";
import { withTranslation } from "react-i18next";
import { EnumSelect } from "share/components/form/enumSelect/EnumSelect";
import { lastPathMember, translationPath } from "share/utils/getPath";
import { lang, t, WithTranslation } from "translation/i18n";

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
            <EnumSelect
              enumType={SettleMethod}
              translations={lang.enums.settleMethod}
              disabled={readonly}
              label={t(translationPath(lang.general.settleMethod))}
              name={lastPathMember(sslPropsProxy.settleMethod).path}
            />
            <StyledField
              component={TextField}
              data-test-id="meta-input-settleReason"
              disabled={readonly}
              name={lastPathMember(sslPropsProxy.settleReason).path}
              type="string"
              label={t(translationPath(lang.general.settleReason))}
            />
            <StyledField
              component={TextField}
              data-test-id="meta-input-processor"
              disabled={readonly}
              name={lastPathMember(sslPropsProxy.processor).path}
              type="string"
              label={t(translationPath(lang.general.processor))}
            />
            <DateTimePicker
              data-test-id="meta-input-settleDate"
              disabled={readonly}
              name={lastPathMember(sslPropsProxy.settleDate).path}
              label={t(translationPath(lang.general.settleDateAndTime))}
            />

            <StyledField
              component={TextField}
              data-test-id="meta-input-customSettleMethod"
              disabled={readonly}
              name={lastPathMember(sslPropsProxy.customSettleMethod).path}
              type="string"
              label={t(translationPath(lang.general.customSettleMethod))}
            />
            <StyledField
              component={TextField}
              data-test-id="meta-input-fileMark"
              disabled={readonly}
              name={lastPathMember(sslPropsProxy.fileMark).path}
              type="text"
              label={t(translationPath(lang.general.fileMark))}
            />
            <StyledField
              component={TextField}
              data-test-id="meta-input-filePlan"
              disabled={readonly}
              name={lastPathMember(sslPropsProxy.filePlan).path}
              type="string"
              label={t(translationPath(lang.general.filePlan))}
            />
            <StyledField
              component={TextField}
              data-test-id="meta-input-retentionMode"
              disabled={readonly}
              name={lastPathMember(sslPropsProxy.retentionMode).path}
              type="text"
              label={t(translationPath(lang.general.retentionMode))}
            />
            {values.triggerActionId && (
              <StyledField
                component={TextField}
                data-test-id="meta-input-triggerActionId"
                disabled={readonly}
                name={lastPathMember(sslPropsProxy.triggerActionId).path}
                type="string"
                label={t(translationPath(lang.general.triggerActionId))}
              />
            )}
            {values.triggerActionYear && (
              <StyledField
                component={TextField}
                data-test-id="meta-input-triggerActionYear"
                disabled={readonly}
                name={lastPathMember(sslPropsProxy.triggerActionYear).path}
                type="number"
                label={t(translationPath(lang.general.triggerActionYear))}
              />
            )}
            {values.toRepositoryDate && (
              <DateTimePicker
                data-test-id="meta-input-toRepositoryDate"
                disabled={readonly}
                name={lastPathMember(sslPropsProxy.toRepositoryDate).path}
                label={t(translationPath(lang.general.toRepositoryDate))}
              />
            )}
            {values.toArchiveShreddingDate && (
              <DateTimePicker
                data-test-id="meta-input-toArchiveShreddingDate"
                disabled={readonly}
                name={lastPathMember(sslPropsProxy.toArchiveShreddingDate).path}
                label={t(translationPath(lang.general.toArchiveShreddingDate))}
              />
            )}
          </Form>
        );
      }}
    </Formik>
  );
};

export const SettleTabForm = withTranslation()(React.memo(Component));
