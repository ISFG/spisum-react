import React from "react";
import { useDocumentId } from "../../hooks/useDocumentId";
import { DialogTabContentPropsType } from "../../_types";
import ComponentsTabContainer from "./ComponentsTabContainer";

export const ComponentsTab = (props: DialogTabContentPropsType) => {
  const documentId = useDocumentId(props);

  if (documentId) {
    return <ComponentsTabContainer nodeId={documentId} {...props} />;
  }

  return <></>;
};

export const ReadOnlyComponentsTab = (props: DialogTabContentPropsType) => {
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
