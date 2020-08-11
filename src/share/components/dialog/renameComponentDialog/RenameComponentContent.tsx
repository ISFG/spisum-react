import { useStyles } from "core/components/dialog/Dialog.styles";
import { useSyncFormValidityWithDialog } from "core/components/dialog/hooks/useSyncFormValidityWithDialog";
import { DialogContentType } from "core/components/dialog/_types";
import { FormState } from "core/components/reactiveFormik/_types";
import { File } from "core/entities";
import { Formik } from "formik";
import React from "react";
import { translationPath } from "share/utils/getPath";
import { lang, t } from "translation/i18n";
import * as Yup from "yup";
import { RenameComponentForm } from "./RenameComponentForm";
import { RenameComponentFormValues } from "./_types";
import { getNameWithoutExtension } from "./_utils";

const renameComponentFormSchema = Yup.object().shape({
  name: Yup.string()
    .trim()
    .min(0, t(translationPath(lang.dialog.errors.minLen), { len: 0 }))
    .max(50, t(translationPath(lang.dialog.errors.maxLen), { len: 50 }))
    .required(t(translationPath(lang._validations.required)))
});

export const RenameComponentContent: DialogContentType["content"] = ({
  channel,
  dialogProps
}) => {
  const classes = useStyles();
  const setFormRef = useSyncFormValidityWithDialog(channel);

  const onSubmit = () => {};

  return (
    <div className={classes.modalSmall}>
      <Formik<RenameComponentFormValues>
        initialValues={{
          name: getNameWithoutExtension(dialogProps.data as File)
        }}
        onSubmit={onSubmit}
        innerRef={setFormRef}
        validationSchema={renameComponentFormSchema}
      >
        {(props: FormState<RenameComponentFormValues>) => (
          <RenameComponentForm {...props} />
        )}
      </Formik>
    </div>
  );
};
