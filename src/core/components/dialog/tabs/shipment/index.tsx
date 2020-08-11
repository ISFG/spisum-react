import { DialogTabContentPropsType } from "core/components/dialog/_types";
import React from "react";
import { useDocumentId } from "../../hooks/useDocumentId";
import ShipmentTabContainer from "./ShipmentTabContainer";

export const ShipmentTab = (props: DialogTabContentPropsType) => {
  const documentId = useDocumentId(props);

  if (documentId) {
    return <ShipmentTabContainer nodeId={documentId} {...props} />;
  }

  return <></>;
};

export default ShipmentTabContainer;
