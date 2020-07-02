import { DateTimePicker } from "core/components/datetimepicker";
import { StyledDateTimePickerHalf } from "core/components/datetimepicker/Component.styles";
import {
  StyledFieldWide,
  useStyles
} from "core/components/dialog/Dialog.styles";
import { FormState } from "core/components/reactiveFormik/_types";
import { Form } from "formik";
import { TextField } from "formik-material-ui";
import React from "react";
import { lastPathMember, translationPath } from "share/utils/getPath";
import { lang, t } from "translation/i18n";
import {
  ShreddingDiscardFormValues,
  shreddingDiscardFormValuesProxy
} from "./_types";

export const ShreddingDiscardForm = React.memo(
  ({ values }: FormState<ShreddingDiscardFormValues>) => {
    const classes = useStyles();

    return (
      <Form className={classes.form}>
        <DateTimePicker
          component={StyledDateTimePickerHalf}
          data-test-id="shredding-discard-date"
          name={lastPathMember(shreddingDiscardFormValuesProxy.date).path}
          label={t(translationPath(lang.general.discardTill))}
          required={true}
        />
        <StyledFieldWide
          component={TextField}
          data-test-id="shredding-discard-reason"
          name={lastPathMember(shreddingDiscardFormValuesProxy.reason).path}
          type="text"
          label={t(translationPath(lang.general.discardReason))}
          required={true}
        />
      </Form>
    );
  }
);
