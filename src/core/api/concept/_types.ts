import { Node, SslConcept } from "../models";

export type ConceptCreateSuccessResponseType = {
  entry: Node<SslConcept>;
  additionalProperties?: object;
};

export type UpdateConceptApiType = {
  properties: object;
};

export interface ConceptRecoverRequestType {
  body: {
    reason: string;
    ids: string[];
  };
}

export type ConceptRevertVersionRequestType = {
  nodeId: string;
  versionId: string;
};

export type ConceptCancelRequestType = {
  nodeId: string;
  body?: {
    reason: string;
  };
};
