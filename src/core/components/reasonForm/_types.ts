import { createProxy } from "share/utils/getPath";

export type ReasonFormValues = {
  reason: string;
};

export const reasonFormValuesProxy = createProxy<ReasonFormValues>();

export interface ReasonFormRequestType {
  nodeId: string;
  nodeType?: string;
  url: string;
  body: {
    reason: string;
  };
}
