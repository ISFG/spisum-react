import { useDocumentId } from "core/components/dialog/hooks/useDocumentId";
import { DialogTabContentPropsType } from "core/components/dialog/_types";
import React from "react";
import EvidenceComponentsTabContainer from "./EvidenceComponentsTabContainer";

export const EvidenceComponentsTab = (props: DialogTabContentPropsType) => {
  const documentId = useDocumentId(props);

  if (documentId) {
    return <EvidenceComponentsTabContainer nodeId={documentId} {...props} />;
  }

  return <></>;
};

export const ReadOnlyComponentsTab = (props: DialogTabContentPropsType) => {
  const documentId = useDocumentId(props);

  if (documentId) {
    return (
      <EvidenceComponentsTabContainer
        nodeId={documentId}
        {...props}
        isReadOnly={true}
      />
    );
  }

  return <></>;
};
