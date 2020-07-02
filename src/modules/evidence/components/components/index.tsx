import { DialogContentPropsType } from "core/components/dialog/_types";
import React from "react";
import EvidenceComponentsTabContainer from "./EvidenceComponentsTabContainer";
import { useDocumentId } from "../../../../core/components/dialog/hooks/useDocumentId";

export const EvidenceComponentsTab = (props: DialogContentPropsType) => {
  const documentId = useDocumentId(props);

  if (documentId) {
    return <EvidenceComponentsTabContainer nodeId={documentId} {...props} />;
  }

  return <></>;
};

export const ReadOnlyComponentsTab = (props: DialogContentPropsType) => {
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
