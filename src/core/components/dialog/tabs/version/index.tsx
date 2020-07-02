import VersionTabContainer from "core/components/dialog/tabs/version/VersionTabContainer";
import { DialogContentPropsType } from "core/components/dialog/_types";
import React from "react";
import { useDocumentId } from "../../hooks/useDocumentId";

export const VersionTab = (props: DialogContentPropsType) => {
  const documentId = useDocumentId(props);

  if (documentId) {
    return <VersionTabContainer nodeId={documentId} {...props} />;
  }

  return <></>;
};

export default VersionTabContainer;
