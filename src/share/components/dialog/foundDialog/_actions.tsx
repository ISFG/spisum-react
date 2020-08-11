import { GenericDocument } from "core/types";
import { createSafeAction } from "share/utils/typesafeActions";

export const openFoundDialog = createSafeAction("@dialog/EVIDENCE_FOUND")<
  GenericDocument[]
>();
