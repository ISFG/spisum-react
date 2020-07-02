import { SessionStatus, SessionType } from "core/features/login/_types";
import { CoreRoutes } from "core/routes";
import React from "react";
import { useStore } from "react-redux";
import { Redirect, Route } from "react-router-dom";
import { RootStateType, RouterReducerType } from "reducers";
import { AnyAction } from "redux";
import { RootRouterType } from "router";

interface OwnProps {
  children: React.ReactNode;
  exact?: boolean;
  path?: RootRouterType;
  redirectTo: RootRouterType;
}

interface StateProps {
  session: SessionType;
}

const renderComponent = ({
  children,
  redirectTo,
  session
}: OwnProps & StateProps) => () => {
  if (session && session.status === SessionStatus.AUTHORIZED) {
    return children;
  }

  return <Redirect to={redirectTo} />;
};

const Component = (props: OwnProps) => {
  const session = useStore<
    RootStateType & RouterReducerType,
    AnyAction
  >().getState().loginReducer.session;
  return <Route {...props}>{renderComponent({ ...props, session })}</Route>;
};

Component.defaultProps = {
  redirectTo: CoreRoutes.LOGIN
};

export default Component;
