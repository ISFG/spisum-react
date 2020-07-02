import { registerDialog } from "core/components/dialog/Component";
import { dialogs } from "share/components/dialog";
import { handoverDocumentDialog } from "share/components/dialog/documentHandoverDialog/content";
import { renameComponentDialog } from "share/components/dialog/renameComponentDialog/content";

const register = () => {
  [...dialogs, handoverDocumentDialog, renameComponentDialog].forEach(
    registerDialog
  );
};

export default {
  register
};
