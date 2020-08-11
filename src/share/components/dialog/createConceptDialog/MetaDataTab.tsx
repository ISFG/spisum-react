import { DialogContentPropsType } from "core/components/dialog/_types";
import MetaFormContainer from "core/components/MetaForm";
import { Concept } from "core/entities/concept/Concept";
import React from "react";
import { ConceptMetaForm } from "./ConceptMetaForm";

export const MetaDataTab = ({
  channel,
  dialogProps,
  onClose
}: DialogContentPropsType) => (
  <MetaFormContainer<Concept>
    channel={channel}
    dialogProps={dialogProps}
    MetaForm={ConceptMetaForm}
    onClose={onClose}
  />
);
