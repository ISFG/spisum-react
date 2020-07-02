import { ControlsBarType } from "core/components/dataTable/_types";
import { GenericDocument } from "core/types";

export type SelectedFnType = (selected: GenericDocument[]) => void;

export type ControlsType = (handlers: {
  handleOpenDescription: SelectedFnType;
  handleCreateNewDocumentFile: SelectedFnType;
  handleHandoverDocument: SelectedFnType;
  handleForSignatureDocument: SelectedFnType;
  handleSendShipment: SelectedFnType;
  handleOpenSettleDocumentDialog: SelectedFnType;
  handleOpenLostDestroyedDocumentDialog: SelectedFnType;
  handleOpenCancelDialog: SelectedFnType;
  userId?: string;
}) => Promise<ControlsBarType<GenericDocument>>
