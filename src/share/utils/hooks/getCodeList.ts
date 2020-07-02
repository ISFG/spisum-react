import { CodeList } from "enums";
import { useSelector } from "react-redux";
import { RootStateType } from "reducers";

export const useGetCodeList: (name: CodeList) => string[] | undefined = (
  name
) => {
  const codeLists = useSelector(
    (state: RootStateType) => state.loginReducer.global.codeLists
  );

  const found = codeLists.find((list) => list.name === name);

  return found ? found.values : undefined;
};
