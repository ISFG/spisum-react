import { useShreddingPlans } from "./useSchreddingPlans";
import { SslProperties } from "../../../api/models";
import { useMetaFormDocument } from "./useMetaFormDocument";

export const useMetaFormValuesWithShreddingPlans = () => {
  const { formValues } = useMetaFormDocument()

  return useShreddingPlans(formValues as SslProperties);
};
