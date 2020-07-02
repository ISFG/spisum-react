import { CircularProgress } from "@material-ui/core";
import React from "react";
import { Wrapper } from "./LoadingIndicator.styles";

export const LoadingIndicator = () => {
  return (
    <Wrapper>
      <CircularProgress />
    </Wrapper>
  );
};
