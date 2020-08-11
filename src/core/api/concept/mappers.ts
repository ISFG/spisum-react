import { convertProps, convertResponse } from "share/utils/convert";
import { Concept } from "../../entities/concept/Concept";
import { GenericDocument } from "../../types";
import { NodeChildAssociationEntry, SslConcept } from "../models";
import { UpdateConceptApiType } from "./_types";

export const mapDocumentToConcept = (document: GenericDocument): Concept => ({
  id: document.id,
  meta: {
    createdAt: document.createdAt,
    owner: document.properties!.cm!.owner
  },
  pid: document.properties!.ssl!.pid,
  subject: document.properties!.ssl!.subject
});

export const mapResponseToConcept = (
  response: NodeChildAssociationEntry<SslConcept>
): Concept => {
  const transformed = convertResponse(response.entry) as GenericDocument;

  return mapDocumentToConcept(transformed);
};

export const updateMapperRequestMapper = (
  concept: Concept
): UpdateConceptApiType => ({
  properties: convertProps({
    subject: concept.subject
  })
});
