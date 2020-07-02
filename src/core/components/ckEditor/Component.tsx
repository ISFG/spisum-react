import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import CKEditor, {
  CKEditorOnChangeEventType,
  CKEditorType
} from "@ckeditor/ckeditor5-react";
import { InputLabel } from "@material-ui/core";
import clsx from "clsx";
import { useStyles } from "core/components/dialog/Dialog.styles";
import { useField, useFormikContext } from "formik";
import React, { useEffect, useState } from "react";
import { StyledEditorDiv, StyledWarningHelperText } from "./Component.styles";
import "./Component.styles.scss";

interface OwnProps {
  className?: string;
  name: string;
  label: string;
  required?: boolean;
  disabled?: boolean;
}

const config = {
  toolbar: [
    "heading",
    "|",
    "undo",
    "redo",
    "bold",
    "italic",
    "bulletedList",
    "numberedList",
    "blockQuote"
  ]
};

const Component = (props: OwnProps) => {
  const classes = useStyles();
  const [errorMessage, setErrorMessage] = useState<string | undefined>();
  const [isErrorMessage, setIsErrorMessage] = useState<boolean>(false);
  const [disabled, setDisabled] = useState<boolean>(!!props.disabled);
  const { setFieldValue, errors, isSubmitting, touched } = useFormikContext();
  const { required } = props;
  const [field] = useField(props);

  const onChange = (e: CKEditorOnChangeEventType, editor: CKEditorType) => {
    setFieldValue(field.name, editor.getData());
  };

  useEffect(() => {
    if (!touched[field.name]) return;
    setDisabled(props.disabled || isSubmitting);
    setErrorMessage(errors[field.name]);
    setIsErrorMessage(!!errors[field.name]);
  }, [errors, field, isSubmitting]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <StyledEditorDiv>
      <InputLabel
        className={clsx(classes.colorBlack)}
        required={required}
        error={isErrorMessage}
      >
        {props.label}
      </InputLabel>
      {isErrorMessage ? (
        <StyledWarningHelperText>{errorMessage}</StyledWarningHelperText>
      ) : null}
      <div className={clsx(classes.mtGap)}>
        <CKEditor
          config={config}
          editor={ClassicEditor}
          data={field.value}
          onChange={onChange}
          disabled={disabled}
        />
      </div>
    </StyledEditorDiv>
  );
};

export default Component;
