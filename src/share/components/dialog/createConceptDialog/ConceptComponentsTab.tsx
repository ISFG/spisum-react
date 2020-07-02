import { DialogContentPropsType } from "core/components/dialog/_types";
import React from "react";
import EvidenceComponentsTabContainer from "modules/evidence/components/components/EvidenceComponentsTabContainer";
import { useDocumentId } from "../../../../core/components/dialog/hooks/useDocumentId";

export const ConceptComponentsTab = (props: DialogContentPropsType) => {
  const documentId = useDocumentId(props);

  if (documentId) {
    return <EvidenceComponentsTabContainer nodeId={documentId} {...props} />;
  }

  return <></>;
};
