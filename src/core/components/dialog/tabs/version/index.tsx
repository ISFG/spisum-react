import VersionTabContainer from "core/components/dialog/tabs/version/VersionTabContainer";
import React from "react";
import { useDocumentId } from "../../hooks/useDocumentId";
import { DialogTabContentPropsType } from "../../_types";

export const VersionTab = (props: DialogTabContentPropsType) => {
  const documentId = useDocumentId(props);

  if (documentId) {
    return <VersionTabContainer nodeId={documentId} {...props} />;
  }

  return <></>;
};

export default VersionTabContainer;
