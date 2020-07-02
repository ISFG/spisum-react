import React from "react";
import Dialog from "../dialog";
import Notifications from "../notifications";
import { GlobalContainer } from "./GlobalLayout.styles";

interface OwnProps {
  children: React.ReactNode;
}

export const GlobalLayout = ({ children }: OwnProps) => {
  return (
    <GlobalContainer>
      <Dialog />
      <Notifications />
      {children}
    </GlobalContainer>
  );
};
