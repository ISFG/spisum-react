import { DocumentState, SpisumNodeTypes } from "../../../enums";
import { DialogDataProps } from "../../components/dialog/_types";
import { GenericDocument } from "../../types";

export const getDocumentSaveButtonsActions = (
  dialogProps: DialogDataProps
): { showPrimaryAction: boolean; showSecondaryAction: boolean } => {
  const initiatorIsFileNodeType =
    dialogProps?.initiator === SpisumNodeTypes.File;
  if (!initiatorIsFileNodeType) {
    return { showPrimaryAction: true, showSecondaryAction: true };
  }
  const documentState = (dialogProps?.data as GenericDocument)?.properties?.ssl
    ?.state;
  const documentIsSettled = documentState === DocumentState.Settled;
  const documentIsReferredToRepository =
    documentState === DocumentState.ReferedToRepository;
  const showPrimaryAction =
    !documentIsSettled && !documentIsReferredToRepository;
  const showSecondaryAction =
    showPrimaryAction && documentState !== DocumentState.NotSettled;

  return { showPrimaryAction, showSecondaryAction };
};
