import { DialogContentPropsType } from "core/components/dialog/_types";
import MetaFormContainer from "core/components/MetaForm";
import React from "react";
import { CreateUserMetadataForm } from "./CreateUserForm";
import { UserFormValuesType } from "./_types";

export const MetaDataTab = ({
  channel,
  dialogProps,
  onClose
}: DialogContentPropsType) => (
  <MetaFormContainer<UserFormValuesType>
    channel={channel}
    dialogProps={dialogProps}
    MetaForm={CreateUserMetadataForm}
  />
);
