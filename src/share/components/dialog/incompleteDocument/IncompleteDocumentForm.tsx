import { InputLabel } from "@material-ui/core";
import clsx from "clsx";
import CkEditor from "core/components/ckEditor/Component";
import {
  StyledFieldWide,
  useStyles
} from "core/components/dialog/Dialog.styles";
import { ComponentUpload } from "core/components/dialog/tabs/components/ComponentUpload";
import { FileList } from "core/components/fileList";
import { FormState } from "core/components/reactiveFormik/_types";
import { Field, Form, useField, useFormikContext } from "formik";
import { TextField } from "formik-material-ui";
import React from "react";
import { lastPathMember, translationPath } from "share/utils/getPath";
import { lang, t } from "translation/i18n";
import {
  IncompleteDocumentFormValues,
  IncompleteDocumentFormValuesProxy
} from "./_types";

export const IncompleteDocumentForm = React.memo(
  ({ values }: FormState<IncompleteDocumentFormValues>) => {
    const classes = useStyles();
    const { setFieldValue } = useFormikContext();
    const [fileDataField] = useField(
      lastPathMember(IncompleteDocumentFormValuesProxy.files).path
    );

    const handleUploadComponent = (files: File[]) => {
      let dataFiles = files;
      if (values.files) {
        dataFiles = files.concat(values.files);
      }
      setFieldValue(fileDataField.name, dataFiles);
    };

    const handleRemoveFile = (index: number) => {
      const dataFiles = values.files;
      dataFiles?.splice(index, 1);
      setFieldValue(fileDataField.name, dataFiles);
    };

    return (
      <Form className={classes.form}>
        <div className={clsx(classes.flex, classes.alignBaselineField)}>
          <InputLabel
            className={clsx(classes.mrGap, classes.colorBlack)}
            required={true}
          >
            {t(translationPath(lang.general.recipient))}
          </InputLabel>
          <Field
            className={classes.rootInlineField}
            component={TextField}
            data-test-id="incomplete-document-meta-input-recipient"
            name={
              lastPathMember(IncompleteDocumentFormValuesProxy.recipient).path
            }
            type="input"
            disabled={true}
          />
        </div>
        <StyledFieldWide
          component={TextField}
          data-test-id="incomplete-document-meta-input-subject"
          InputLabelProps={{
            classes: { root: clsx(classes.mediumLabel) },
            shrink: true
          }}
          name={lastPathMember(IncompleteDocumentFormValuesProxy.subject).path}
          type="text"
          required={true}
          label={t(translationPath(lang.general.subject))}
        />
        <CkEditor
          className={clsx(classes.mtGap)}
          name={lastPathMember(IncompleteDocumentFormValuesProxy.body).path}
          label={t(translationPath(lang.general.messageBody))}
          required={true}
        />
        <div className={clsx(classes.mtGap)}>
          <div className={clsx(classes.flex)}>
            <label>{t(translationPath(lang.general.attachments))}</label>
            <div className={clsx(classes.addFileButton)}>
              <ComponentUpload handleUploadComponent={handleUploadComponent} />
            </div>
          </div>
          {values.files ? (
            <div className={clsx(classes.mtGap)}>
              <FileList files={values.files} onRemoveClick={handleRemoveFile} />
            </div>
          ) : null}
        </div>
      </Form>
    );
  }
);
