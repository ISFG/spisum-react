import React from "react";
import { ErrorBoundary } from "../errorBoundary";
import { DocumentViewError } from "../errorBoundary/errorTypes/DocumentViewError";
import Component, { OwnProps } from "./Component";
import { DocumentViewType } from "./_types";

export default <T extends DocumentViewType>(props: OwnProps<T>) => {
  return (
    <ErrorBoundary Component={DocumentViewError}>
      <Component<T> {...props} />
    </ErrorBoundary>
  );
};
