import AutomaticLogoutDialog from "core/features/automaticLogout";
import { AutomaticLogoutSingleton } from "core/features/automaticLogout/singleton";
import React, { useEffect } from "react";
import { useStore } from "react-redux";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { GlobalLayout } from "./GlobalLayout";
import ModalLoading from "./ModalLoading";

interface OwnProps {
  children: React.ReactNode;
}

const SignedLayout = ({
  children,
  history
}: OwnProps & RouteComponentProps) => {
  const store = useStore();
  useEffect(() => {
    // tslint:disable-next-line: no-unused-expression
    new AutomaticLogoutSingleton(store, history);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <GlobalLayout>
      <AutomaticLogoutDialog />
      <ModalLoading />
      {children}
    </GlobalLayout>
  );
};

export default withRouter(SignedLayout);
