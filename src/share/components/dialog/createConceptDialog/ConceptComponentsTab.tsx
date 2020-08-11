import { useDocumentId } from "core/components/dialog/hooks/useDocumentId";
import { DialogTabContentPropsType } from "core/components/dialog/_types";
import EvidenceComponentsTabContainer from "modules/evidence/components/components/EvidenceComponentsTabContainer";
import React from "react";

export const ConceptComponentsTab = (props: DialogTabContentPropsType) => {
  const documentId = useDocumentId(props);

  if (documentId) {
    return <EvidenceComponentsTabContainer nodeId={documentId} {...props} />;
  }

  return <></>;
};
