import { SpisumNodeTypes } from "enums";

export const getNodeTypeSuffix = (nodeType: string | undefined): string => {
  if (
    nodeType === SpisumNodeTypes.Email ||
    nodeType === SpisumNodeTypes.Databox ||
    nodeType === SpisumNodeTypes.TakeDocumentForProcessing ||
    nodeType === SpisumNodeTypes.TakeDocumentProcessed
  ) {
    return "document";
  }
  if (
    nodeType === SpisumNodeTypes.TakeFileOpen ||
    nodeType === SpisumNodeTypes.TakeFileClosed
  ) {
    return "file";
  }
  if (nodeType === SpisumNodeTypes.TakeConcept) {
    return "concept";
  }
  const nodeTypeSuffix = nodeType?.replace("ssl:", "").replace("RM", "");
  return nodeTypeSuffix || "document";
};
