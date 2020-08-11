import { GenericDocument } from "core/types";
import React from "react";
import { DialogTabContentPropsType } from "../../_types";
import TableOfContentsTabContainer from "./TableOfContentsTabContainer";

export const TableOfContentsTab = (props: DialogTabContentPropsType) => {
  const documentId = (props.dialogProps.data as GenericDocument)?.id;

  if (documentId) {
    return <TableOfContentsTabContainer nodeId={documentId} {...props} />;
  }

  return <></>;
};

export default TableOfContentsTabContainer;
