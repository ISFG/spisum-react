import {
  ErrorContainer,
  ErrorIcon,
  ErrorMessage
} from "core/features/login/Component.form.styles";
import React from "react";
import { translationPath } from "share/utils/getPath";
import { lang, t } from "translation/i18n";

interface OwnProps {
  Component?: any;
  clearErrorState?: VoidFunction;
  message?: string;
  reloadTab?: VoidFunction;
  handleClose?: VoidFunction;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends React.Component<OwnProps> {
  state: State = {
    hasError: false
  };

  message: string = t(translationPath(lang.errorBoundary.defaultMessage));

  constructor(props: OwnProps) {
    super(props);
    this.state = { hasError: false };
    this.message = props.message || this.message;
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // logErrorToMyService(error, errorInfo);
  }

  clearErrorState(ctx: React.Component<OwnProps>) {
    return () => {
      ctx.setState({ hasError: false });
    };
  }

  render() {
    const clearErrorState = this.clearErrorState(this);
    const { Component, ...props } = this.props;
    if (this.state.hasError) {
      if (Component) {
        return <Component {...props} clearErrorState={clearErrorState} />;
      }

      return (
        <ErrorContainer>
          <ErrorMessage>
            <ErrorIcon />
            <span>{this.message}</span>
          </ErrorMessage>
        </ErrorContainer>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
