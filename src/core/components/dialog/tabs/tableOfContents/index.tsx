import {
  DialogContentPropsType,
  DialogDataProps
} from "core/components/dialog/_types";
import React from "react";
import TableOfContentsTabContainer from "./TableOfContentsTabContainer";

export const TableOfContentsTab = (props: DialogContentPropsType) => {
  const documentId = (props.dialogData as DialogDataProps).id;
  if (documentId) {
    return <TableOfContentsTabContainer nodeId={documentId} {...props} />;
  }

  return <></>;
};

export default TableOfContentsTabContainer;
