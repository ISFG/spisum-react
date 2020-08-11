import HistoryTabContainer from "core/components/dialog/tabs/historyShipment/HistoryTabContainer";
import React from "react";
import { SslProperties } from "../../../../api/models";
import { useMetaFormDocument } from "../../hooks/useMetaFormDocument";
import { DialogTabContentPropsType } from "../../_types";

export const HistoryShipmentTab = (props: DialogTabContentPropsType) => {
  const { documentId, formValues } = useMetaFormDocument();

  const pid = (formValues as SslProperties)?.pid;
  if (documentId && pid) {
    return <HistoryTabContainer nodeId={documentId} pid={pid} {...props} />;
  }

  return <></>;
};

export default HistoryTabContainer;
