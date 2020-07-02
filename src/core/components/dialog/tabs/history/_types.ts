import { NodeHistorySuccessResponseType } from "core/api/node/_types";
import { createProxy } from "share/utils/getPath";
import { NodeHistory } from "../../../../api/models";

export type NodeHistoryStateType = NodeHistorySuccessResponseType & {
  isLoading: boolean;
  error: string | null;
};

export const nodeHistoryProxy = createProxy<NodeHistory>();
