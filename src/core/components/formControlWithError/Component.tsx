import FormHelperText from "@material-ui/core/FormHelperText";
import { useField, useFormikContext } from "formik";
import React, { useEffect, useState } from "react";
// will be some global format ?
import { StyledFormControl } from "../dialog/Dialog.styles";
import { FormControlComponent } from "./_types";

interface OwnProps {
  component?: FormControlComponent;
  name: string;
  children: JSX.Element[] | JSX.Element;
  className?: string;
}

const Component = ({
  children,
  component: Com = StyledFormControl,
  ...props
}: OwnProps) => {
  const { errors, touched } = useFormikContext();
  const [field] = useField(props);
  const [errorMessage, setErrorMessage] = useState<string | undefined>("");

  useEffect(() => {
    // Need to test if touched, to show error only on formfield change or form submit
    if (!touched[field.name]) return;
    setErrorMessage(errors[field.name]);
  }, [errors, field]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Com error={!!errorMessage} className={props.className}>
      {children}
      {errorMessage && <FormHelperText>{errorMessage}</FormHelperText>}
    </Com>
  );
};

export default Component;
