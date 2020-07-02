import { ErrorType } from "types";
import { EntityList, File } from "../../../../entities";
import { ControlsBarType } from "../../../dataTable/_types";

export type ComponentsTabStateType = Readonly<{
  components: EntityList<File>;
  selected: EntityList<File>;
  isLoading: boolean;
  error: ErrorType | null;
}>;

export type ReadonlyControlsType = (handlers: {
  handleShowPreview: (selected: File[]) => void;
  handleDownloadComponent: SelectedComponentsFnType;
}) => ControlsBarType<File>;

export type SelectedComponentsFnType = (components: File[]) => void;

export type ControlsType = (handlers: {
  handleDeleteComponent: SelectedComponentsFnType;
  handleDownloadComponent: SelectedComponentsFnType;
  handleIsComponentDeletable: (component: File) => boolean;
  handleUploadComponent: (files: globalThis.File[]) => void;
  handleShowPreview: SelectedComponentsFnType;
  handleRenameComponent: SelectedComponentsFnType;
}) => ControlsBarType<File>;
