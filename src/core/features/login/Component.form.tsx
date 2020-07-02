import { CardHeader } from "@material-ui/core";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import CheckboxChecked from "assets/icons-tsx/CheckboxChecked";
import logoImage from "assets/images/loginlogo.png";
import {
  ErrorContainer,
  ErrorIcon,
  ErrorMessage,
  FullWidthField,
  ImgLogo,
  InteractiveLoginLabel,
  LoginButton,
  LoginButtonLabel,
  LoginCheckingSpinner,
  LoginControls,
  LoginField,
  LoginLabel,
  LoginLogo,
  LoginRememberMe,
  LoginRememberMeContainer,
  LoginRememberMeIcon,
  LoginRememberMeIconChecked,
  VisibilityIconButton,
  VisibilityIconButtonIeFix
} from "core/features/login/Component.form.styles";
import { Field, FieldProps, Form, FormikProps } from "formik";
import { TextField } from "formik-material-ui";
import React from "react";
import { classPath, translationPath } from "share/utils/getPath";
import { t } from "translation/i18n";
import lang from "translation/lang";
import { ErrorType } from "types";
import { LoginFormValuesType, LoginFormValuesTypeProxy } from "./_types";

interface OwnProps {
  error: ErrorType | null;
  pending: boolean;
}

const renderForm = ({ error, pending }: OwnProps) => (
  formProps: FormikProps<LoginFormValuesType>
) => {
  const [values, setValues] = React.useState({
    showPassword: false
  });

  const handleClickShowPassword = () => {
    setValues({
      showPassword: !values.showPassword
    });
  };

  const isPending = formProps.isSubmitting || pending;

  const getErrorMessage = () => {
    if (!error) return;

    switch (error.code) {
      case "401":
      case "403":
      case "AUTH":
        return t(translationPath(lang._common.codes.AUTH));
      default:
        return t(translationPath(lang.login.loginFailed));
    }
  };

  if (formProps.isSubmitting && values.showPassword) {
    handleClickShowPassword();
  }

  return (
    <Form>
      <CardHeader
        title={
          <LoginLogo>
            <ImgLogo
              src={logoImage}
              alt={t(translationPath(lang.login.logoAlt))}
            />
          </LoginLogo>
        }
      />
      <LoginControls>
        <ErrorContainer>
          {error && (
            <ErrorMessage>
              <ErrorIcon />
              <span>{getErrorMessage()}</span>
            </ErrorMessage>
          )}
        </ErrorContainer>
        <div>
          <LoginField>
            <LoginLabel
              htmlFor={classPath(LoginFormValuesTypeProxy.username).path}
            >
              {t(translationPath(lang.login.username))}
            </LoginLabel>

            <FullWidthField
              component={TextField}
              data-test-id="login-input-username"
              disabled={isPending}
              name={classPath(LoginFormValuesTypeProxy.username).path}
              type="text"
            />
          </LoginField>
          <LoginField>
            <LoginLabel htmlFor={t(translationPath(lang.login.password))}>
              {t(translationPath(lang.login.password))}
            </LoginLabel>

            <FullWidthField
              component={TextField}
              data-test-id="login-input-password"
              disabled={isPending}
              InputProps={{
                autoComplete: "",
                endAdornment: (
                  <VisibilityIconButtonIeFix position="end">
                    <VisibilityIconButton
                      aria-label="toggle password visibility"
                      disabled={isPending}
                      onClick={handleClickShowPassword}
                    >
                      {values.showPassword ? <Visibility /> : <VisibilityOff />}
                    </VisibilityIconButton>
                  </VisibilityIconButtonIeFix>
                )
              }}
              name={classPath(LoginFormValuesTypeProxy.password).path}
              type={values.showPassword ? "text" : "password"}
            />
            <LoginButton
              className={isPending ? "login-isChecking" : "isWelcome"}
              data-test-id="button-submit-login"
              disabled={isPending}
              type="submit"
            >
              {(isPending && (
                <InteractiveLoginLabel>
                  <LoginButtonLabel className="login-button-label">
                    {t(translationPath(lang.login.checking))}
                  </LoginButtonLabel>
                  <LoginCheckingSpinner size={25} />
                </InteractiveLoginLabel>
              )) || (
                <LoginButtonLabel className="login-button-label">
                  {t(translationPath(lang.login.signUp))}
                </LoginButtonLabel>
              )}
            </LoginButton>
            <LoginRememberMeContainer
              control={
                <Field
                  component={CheckboxField}
                  data-test-id="button-remember-login"
                  disabled={isPending}
                  name={classPath(LoginFormValuesTypeProxy.remember).path}
                  type="checkbox"
                />
              }
              label={t(translationPath(lang.login.rememberMe))}
            />
          </LoginField>
        </div>
      </LoginControls>
    </Form>
  );
};

const CheckboxField = <T,>(props: FieldProps<T>) => {
  return (
    <LoginRememberMe
      {...props}
      checkedIcon={
        <LoginRememberMeIconChecked className="mat-checkbox-checked">
          <CheckboxChecked />
        </LoginRememberMeIconChecked>
      }
      icon={<LoginRememberMeIcon />}
    />
  );
};

export default renderForm;
