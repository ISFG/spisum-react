import { DocumentState } from "enums";
import React from "react";
import { SettleTabForm } from "./SettleTabForm";
import { useMetaFormValuesWithShreddingPlans } from "../../hooks/useMetaFormValuesWithShreddingPlans";

export const SettleTab = () => {
  const initialValues = useMetaFormValuesWithShreddingPlans();

  return (
    <div className="body-fullsize">
      <SettleTabForm readonly={true} initialValues={initialValues} />
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

SettleTab.filter = (state: string | undefined) => {
  return state ? allowedStates.includes(state as DocumentState) : false;
};
