import HistoryTabContainer from "core/components/dialog/tabs/historyShipment/HistoryTabContainer";
import { DialogContentPropsType } from "core/components/dialog/_types";
import React from "react";
import { SslProperties } from "../../../../api/models";
import { useMetaFormDocument } from "../../hooks/useMetaFormDocument";

export const HistoryShipmentTab = (props: DialogContentPropsType) => {
  const { documentId, formValues } = useMetaFormDocument();

  const pid = (formValues as SslProperties)?.pid;
  if (documentId && pid) {
    return <HistoryTabContainer nodeId={documentId} pid={pid} {...props} />;
  }

  return <></>;
};

export default HistoryTabContainer;
