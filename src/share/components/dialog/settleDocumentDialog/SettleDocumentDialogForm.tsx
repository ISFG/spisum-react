import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import clsx from "clsx";
import Datepicker from "core/components/datepicker/Component";
import {
  StyledFieldWide,
  StyledFormControlThird,
  useStyles
} from "core/components/dialog/Dialog.styles";
import FormControlWithError from "core/components/formControlWithError";
import { FormState } from "core/components/reactiveFormik/_types";
import Timepicker from "core/components/timepicker/Component";
import { sslPropsProxy } from "core/types";
import { CodeList, SettleMethod } from "enums";
import { Field, Form } from "formik";
import { Select, TextField } from "formik-material-ui";
import React from "react";
import { EnumSelect } from "share/components/form/enumSelect/EnumSelect";
import { lastPathMember, translationPath } from "share/utils/getPath";
import { useGetCodeList } from "share/utils/hooks/getCodeList";
import { lang, t } from "translation/i18n";
import { SettleDocumentFormValues } from "./_types";

// NOTE: The form is used also for closeFileDialog

export const SettleDocumentForm = React.memo(
  ({ values, resetForm }: FormState<SettleDocumentFormValues>) => {
    const classes = useStyles();
    const codeListValues = useGetCodeList(CodeList.customSettleMethod);
    const handleChangeSettleMethod = (
      e: React.ChangeEvent<HTMLInputElement>
    ) => {
      resetForm();
    };

    return (
      <Form className={classes.form}>
        <div className={clsx(classes.fullWidth, classes.form)}>
          <EnumSelect
            component={StyledFormControlThird}
            enumType={SettleMethod}
            translations={lang.enums.settleMethod}
            label={t(translationPath(lang.general.settleMethod))}
            name={lastPathMember(sslPropsProxy.settleMethod).path}
            onChange={handleChangeSettleMethod}
          />

          <Datepicker
            disabled={true}
            style={{ width: "30%" }}
            disablePast={true}
            name={lastPathMember(sslPropsProxy.settleDate).path}
            label={t(translationPath(lang.general.settleDate))}
            required={true}
          />
          <Timepicker
            name={lastPathMember(sslPropsProxy.settleTime).path}
            style={{ width: "30%" }}
            disabled={true}
            label={t(translationPath(lang.general.settleTime))}
            required={true}
            value={values.settleDate?.toISOString()}
          />
        </div>

        {values.settleMethod === SettleMethod.Other && (
          <>
            <FormControlWithError
              component={StyledFormControlThird}
              name={lastPathMember(sslPropsProxy.customSettleMethod).path}
            >
              <InputLabel required={values.settleMethod === SettleMethod.Other}>
                {t(translationPath(lang.general.customSettleMethod))}
              </InputLabel>
              <Field
                component={Select}
                required={values.settleMethod === SettleMethod.Other}
                name={lastPathMember(sslPropsProxy.customSettleMethod).path}
              >
                {codeListValues?.map((value: string, index: number) => {
                  return (
                    <MenuItem key={index} value={value}>
                      {value}
                    </MenuItem>
                  );
                })}
              </Field>
            </FormControlWithError>

            <StyledFieldWide
              component={TextField}
              name={lastPathMember(sslPropsProxy.settleReason).path}
              type="text"
              label={t(translationPath(lang.general.justification))}
              required={values.settleMethod === SettleMethod.Other}
              value={values.settleReason}
            />
          </>
        )}
      </Form>
    );
  }
);
