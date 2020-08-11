import React from "react";
import { useDocumentId } from "../../hooks/useDocumentId";
import { DialogTabContentPropsType } from "../../_types";
import CommentsTabContainer from "./CommentsTabContainer";

export const CommentsTab = (props: DialogTabContentPropsType) => {
  const documentId = useDocumentId(props);

  if (documentId) {
    return <CommentsTabContainer nodeId={documentId} {...props} />;
  }

  return <></>;
};

export default CommentsTabContainer;
