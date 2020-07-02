import { DocumentViewType } from "core/components/documentView/_types";
import { createSafeAction } from "share/utils/typesafeActions";

export const openFoundDialog = createSafeAction("@dialog/EVIDENCE_FOUND")<
  DocumentViewType[]
>();
