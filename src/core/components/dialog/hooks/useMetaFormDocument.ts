import { useSelector } from "react-redux";
import { RootStateType } from "../../../../reducers";

export const useMetaFormDocument = () => {
  const { actual } = useSelector(
    (state: RootStateType) => state.metaFormReducer
  );

  return actual;
};
