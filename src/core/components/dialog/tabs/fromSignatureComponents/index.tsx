import { DialogContentPropsType } from "core/components/dialog/_types";
import React from "react";
import { useDocumentId } from "../../hooks/useDocumentId";
import ComponentsTabContainer from "./ComponentsTabContainer";

export const ComponentsFromSignatureTab = (props: DialogContentPropsType) => {
  const documentId = useDocumentId(props);

  if (documentId) {
    return <ComponentsTabContainer nodeId={documentId} {...props} />;
  }

  return <></>;
};
