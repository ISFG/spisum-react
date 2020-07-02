import { DialogContentPropsType } from "core/components/dialog/_types";
import React from "react";
import CommentsTabContainer from "./CommentsTabContainer";
import { useDocumentId } from "../../hooks/useDocumentId";

export const CommentsTab = (props: DialogContentPropsType) => {
  const documentId = useDocumentId(props);

  if (documentId) {
    return <CommentsTabContainer nodeId={documentId} {...props} />;
  }

  return <></>;
};

export default CommentsTabContainer;
