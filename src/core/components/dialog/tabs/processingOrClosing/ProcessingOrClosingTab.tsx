import { DocumentState } from "enums";
import React from "react";
import { ProcessingOrClosingTabForm } from "./ProcessingOrClosingTabForm";
import { useMetaFormValuesWithShreddingPlans } from "../../hooks/useMetaFormValuesWithShreddingPlans";

export const ProcessingOrClosingTab = () => {
  const initialValues = useMetaFormValuesWithShreddingPlans();

  return (
    <div className="body-fullsize">
      <ProcessingOrClosingTabForm
        readonly={true}
        initialValues={initialValues}
      />
    </div>
  );
};

const allowedStates = [
  DocumentState.Settled,
  DocumentState.Closed,
  DocumentState.ReferedToArchive,
  DocumentState.ReferedToRepository,
  DocumentState.Shredded
];

ProcessingOrClosingTab.filter = (state: string | undefined) => {
  return state ? allowedStates.includes(state as DocumentState) : false;
};
