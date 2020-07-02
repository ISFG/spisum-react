import { createProxy } from "../../../utils/getPath";

export interface PromoteConceptToDocumentFormValues {
  author: string;
  attachmentsCount: number | string;
  settleTo: Date | null | string;
  subject: string;
}

export const PromoteConceptToDocumentFormValuesProxy = createProxy<
  PromoteConceptToDocumentFormValues
>();

export interface PeopleQueryRequestType {
  maxItems?: number;
  term: string;
}

export interface PromoteConceptToDocumentRequestType {
  nodeId: string;
  body: {
    author: string;
    attachmentsCount: number;
    settleTo: Date;
    subject: string;
  };
}
