import { DialogContentPropsType } from "core/components/dialog/_types";
import React from "react";
import ShipmentComponentsTabContainer from "./ShipmentComponentsTabContainer";
import { useDocumentId } from "../../hooks/useDocumentId";

export const ComponentsShipmentTab = (props: DialogContentPropsType) => {
  const documentId = useDocumentId(props);

  if (documentId) {
    return <ShipmentComponentsTabContainer nodeId={documentId} {...props} />;
  }

  return <></>;
};

export const ReadOnlyComponentsTab = (props: DialogContentPropsType) => {
  const documentId = useDocumentId(props);

  if (documentId) {
    return (
      <ShipmentComponentsTabContainer
        nodeId={documentId}
        {...props}
        isReadOnly={true}
      />
    );
  }

  return <></>;
};
