import { DialogTabContentPropsType } from "core/components/dialog/_types";
import React from "react";
import { useDocumentId } from "../../hooks/useDocumentId";
import ShipmentComponentsTabContainer from "./ShipmentComponentsTabContainer";

export const ComponentsShipmentTab = (props: DialogTabContentPropsType) => {
  const documentId = useDocumentId(props);

  if (documentId) {
    return <ShipmentComponentsTabContainer nodeId={documentId} {...props} />;
  }

  return <></>;
};

export const ReadOnlyComponentsTab = (props: DialogTabContentPropsType) => {
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
