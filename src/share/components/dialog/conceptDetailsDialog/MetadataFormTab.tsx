import { SslConcept } from "core/api/models";
import { DialogContentPropsType } from "core/components/dialog/_types";
import MetaFormContainer from "core/components/MetaForm";
import React from "react";
import { ConceptMetadataForm } from "./ConceptMetadataForm";

export const MetadataFormTab = ({
  channel,
  dialogProps
}: DialogContentPropsType) => {
  return (
    <MetaFormContainer<SslConcept>
      channel={channel}
      dialogProps={dialogProps}
      MetaForm={ConceptMetadataForm}
    />
  );
};
