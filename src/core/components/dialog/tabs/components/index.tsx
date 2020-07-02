import { DialogContentPropsType } from "core/components/dialog/_types";
import React from "react";
import { useDocumentId } from "../../hooks/useDocumentId";
import ComponentsTabContainer from "./ComponentsTabContainer";

export const ComponentsTab = (props: DialogContentPropsType) => {
  const documentId = useDocumentId(props);

  if (documentId) {
    return (
      <ComponentsTabContainer
        nodeId={documentId}
        {...props}
      />
    );
  }

  return <></>;
};

export const ReadOnlyComponentsTab = (props: DialogContentPropsType) => {
  const documentId = useDocumentId(props);

  if (documentId) {
    return (
      <ComponentsTabContainer
        {...props}
        nodeId={documentId}
        isReadOnly={true}
      />
    );
  }

  return <></>;
};
