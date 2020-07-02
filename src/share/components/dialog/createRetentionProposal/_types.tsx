import { createProxy } from "../../../utils/getPath";

export interface RetentionProposalValues {
  name: string;
}

export const retentionProposalProxy = createProxy<RetentionProposalValues>();
