import { DialogContentType } from "core/components/dialog/_types";
import { renderComponentPreview } from "../componentPreview";

export const createDocumentDialog = (
  content: DialogContentType
): DialogContentType => ({
  renderPreview: renderComponentPreview,
  ...content
});
