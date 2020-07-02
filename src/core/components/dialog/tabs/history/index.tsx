import HistoryTabContainer from "core/components/dialog/tabs/history/HistoryTabContainer";
import { DialogContentPropsType } from "core/components/dialog/_types";
import React from "react";
import { useDocumentId } from "../../hooks/useDocumentId";

export const HistoryTab = (props: DialogContentPropsType) => {
  const documentId = useDocumentId(props);

  if (documentId) {
    return <HistoryTabContainer nodeId={documentId} {...props} />;
  }

  return <></>;
};

export default HistoryTabContainer;
