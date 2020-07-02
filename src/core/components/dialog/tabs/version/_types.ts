import { NodeVersion } from "core/api/models";
import { NodeVersionSuccessResponseType } from "core/api/node/_types";
import { createProxy } from "share/utils/getPath";

export type NodeVersionStateType = NodeVersionSuccessResponseType & {
  isLoading: boolean;
  error: string | null;
};

export const nodeVersionProxy = createProxy<NodeVersion>();
