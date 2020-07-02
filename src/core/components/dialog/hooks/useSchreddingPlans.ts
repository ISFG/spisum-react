import { SslProperties } from "core/api/models";
import { useSelector } from "react-redux";
import { RootStateType } from "reducers";

export const useShreddingPlans = (properties: SslProperties = {}) => {
  const { shreddingPlans } = useSelector(
    (state: RootStateType) => state.loginReducer.global
  );

  const filePlan = shreddingPlans.find(
    (plan) => plan.id === properties.filePlan
  );
  const fileMarks = filePlan?.items;
  const fileMark = fileMarks?.find(
    (mark) => mark.fileMark === properties.fileMark
  );
  const triggerActionId = fileMark?.triggerActionId;

  return {
    ...properties,
    fileMark: fileMark ? `${fileMark.fileMark} - ${fileMark.subjectGroup}` : "",
    filePlan: filePlan?.name || "",
    triggerActionId: triggerActionId || ""
  };
};

export const useShreddingPlan = (id?: string) => {
  const { shreddingPlans } = useSelector(
    (state: RootStateType) => state.loginReducer.global
  );

  return shreddingPlans.find((plan) => plan.id === id);
};
