import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import {
  StyledFormControlHalf,
  useStyles
} from "core/components/dialog/Dialog.styles";
import { useShreddingPlan } from "core/components/dialog/hooks/useSchreddingPlans";
import { useSyncFormValidityWithDialog } from "core/components/dialog/hooks/useSyncFormValidityWithDialog";
import { TabAndDialogChannelType } from "core/components/dialog/_types";
import FormControlWithError from "core/components/formControlWithError";
import { sslPropsProxy } from "core/types";
import { Field, Form, Formik, FormikHelpers, FormikState } from "formik";
import { Select } from "formik-material-ui";
import React from "react";
import { lastPathMember, translationPath } from "share/utils/getPath";
import { lang, t } from "../../../../translation/i18n";
import { ChangeFileMarkFormValues } from "./_types";
import { validate } from "./_validations";

interface OwnProps {
  originalFileMark?: string;
  shreddingPlanId?: string;
  channel: TabAndDialogChannelType;
}

export const ChangeFileMarkForm = ({
  channel,
  shreddingPlanId,
  originalFileMark = ""
}: OwnProps) => {
  const classes = useStyles();
  const setFormRef = useSyncFormValidityWithDialog(channel);
  const shreddingPlan = useShreddingPlan(shreddingPlanId);

  const onSubmit = (
    values: ChangeFileMarkFormValues,
    { setSubmitting }: FormikHelpers<ChangeFileMarkFormValues>
  ) => {
    setSubmitting(false);
  };

  return (
    <Formik<ChangeFileMarkFormValues>
      initialValues={{
        fileMark: originalFileMark
      }}
      onSubmit={onSubmit}
      innerRef={setFormRef}
      validate={validate}
    >
      {({ values }: FormikState<ChangeFileMarkFormValues>) => {
        const fileMark = shreddingPlan?.items.find(
          (item) => item.fileMark === values.fileMark
        );

        const retentionMode = fileMark
          ? `${fileMark.retentionMark}/${fileMark.period}`
          : "";

        return (
          <Form className={classes.modalSmall}>
            <FormControlWithError
              name={lastPathMember(sslPropsProxy.fileMark).path}
              component={StyledFormControlHalf}
            >
              <InputLabel htmlFor="fileMark">
                {t(translationPath(lang.general.fileMark))}
              </InputLabel>
              <Field
                component={Select}
                data-test-id="meta-input-fileMark"
                name={lastPathMember(sslPropsProxy.fileMark).path}
                inputProps={{
                  id: "fileMark"
                }}
              >
                <MenuItem className={classes.emptyMenuItem} value="" />
                {shreddingPlan?.items.map((mark) => (
                  <MenuItem
                    disabled={mark.isCaption}
                    value={mark.fileMark}
                    key={mark.fileMark}
                  >
                    {`${mark.fileMark} - ${mark.subjectGroup}`}
                  </MenuItem>
                ))}
              </Field>
            </FormControlWithError>
            {retentionMode && (
              <div>
                {t(translationPath(lang.general.retentionMode))}
                {": "}
                <strong>{retentionMode}</strong>
              </div>
            )}
          </Form>
        );
      }}
    </Formik>
  );
};
