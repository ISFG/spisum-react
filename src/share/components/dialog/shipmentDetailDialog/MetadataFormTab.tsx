import { DialogContentPropsType } from "core/components/dialog/_types";
import MetaFormContainer from "core/components/MetaForm";
import { ShipmentDocument } from "core/types";
import { SpisumNodeTypes } from "enums";
import React from "react";
import { ShipmentDataboxForm } from "./forms/databoxForm/ShipmentDataboxForm";
import { ShipmentEmailForm } from "./forms/emailForm/ShipmentEmailForm";
import { ShipmentPersonalForm } from "./forms/personalFrom/ShipmentPersonalForm";
import { ShipmentPostForm } from "./forms/postForm/ShipmentPostForm";
import { ShipmentPublishForm } from "./forms/publishForm/ShipmentPublishForm";
import { ShipmentFormValues } from "./_types";

export const shipmentDetailFormList = {
  [SpisumNodeTypes.ShipmentDatabox]: ShipmentDataboxForm,
  [SpisumNodeTypes.ShipmentEmail]: ShipmentEmailForm,
  [SpisumNodeTypes.ShipmentPost]: ShipmentPostForm,
  [SpisumNodeTypes.ShipmentPersonally]: ShipmentPersonalForm,
  [SpisumNodeTypes.ShipmentPublish]: ShipmentPublishForm
};

const MetaDataTab = ({
  channel,
  dialogProps,
  onClose
}: DialogContentPropsType) => {
  const form =
    shipmentDetailFormList[(dialogProps.data as ShipmentDocument)?.nodeType];

  return (
    <MetaFormContainer<ShipmentFormValues>
      channel={channel}
      dialogProps={dialogProps}
      MetaForm={form}
      onClose={onClose}
    />
  );
};

export default MetaDataTab;
