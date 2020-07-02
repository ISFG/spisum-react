import { DialogContentPropsType } from "core/components/dialog/_types";
import React from "react";
import ShipmentTabContainer from "./ShipmentTabContainer";
import { useDocumentId } from "../../hooks/useDocumentId";

export const ShipmentTab = (props: DialogContentPropsType) => {
  const documentId = useDocumentId(props);

  if (documentId) {
    return <ShipmentTabContainer nodeId={documentId} {...props} />;
  }

  return <></>;
};

export default ShipmentTabContainer;
