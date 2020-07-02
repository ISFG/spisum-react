import { DocumentState } from "enums";
import React from "react";
import { SaveAndDiscardTabForm } from "./SaveAndDiscardTabForm";
import { useMetaFormValuesWithShreddingPlans } from "../../hooks/useMetaFormValuesWithShreddingPlans";

export const SaveAndDiscardTab = () => {
  const initialValues = useMetaFormValuesWithShreddingPlans();

  return (
    <div className="body-fullsize">
      <SaveAndDiscardTabForm readonly={true} initialValues={initialValues} />
    </div>
  );
};

const allowedStates = [
  DocumentState.ReferedToArchive,
  DocumentState.ReferedToRepository,
  DocumentState.Shredded
];

SaveAndDiscardTab.filter = (state: string | undefined) => {
  return state ? allowedStates.includes(state as DocumentState) : false;
};
