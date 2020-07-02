import { SubmitToRepositoryDialog } from "enums";

export interface EvidenceSubmitToRepositoryRequestType {
  body: {
    group: string;
    ids: string[];
  };
  entityType: SubmitToRepositoryDialog;
}
