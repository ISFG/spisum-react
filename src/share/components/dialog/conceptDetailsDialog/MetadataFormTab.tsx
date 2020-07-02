import { SslConcept } from "core/api/models";
import { DialogContentPropsType, DialogDataProps } from "core/components/dialog/_types";
import MetaFormContainer from "core/components/MetaForm";
import React from "react";
import { ConceptMetadataForm } from "./ConceptMetadataForm";
import produce from "immer";

export const MetadataFormTab = ({
  channel,
  dialogData
}: DialogContentPropsType) => {
  return (
    <MetaFormContainer<SslConcept>
      channel={channel}
      dialogData={produce(dialogData as DialogDataProps, draft => {
        draft.formValues = {
          subject: "",
          ...draft.formValues,
        }
      })}
      MetaForm={ConceptMetadataForm}
    />
  );
};
