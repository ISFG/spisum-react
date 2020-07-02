import { Node, SslComponent } from "core/api/models";
import { ControlsBarType } from "core/components/dataTable/_types";
import { EntityList, File } from "core/entities";
import { ErrorType } from "types";

export type ComponentNodeType = Node<SslComponent>;

export type ComponentsTabStateType = Readonly<{
  components: EntityList<File>;
  isLoading: boolean;
  error: ErrorType | null;
}>;

export type ReadonlyControlsType = (handlers: {
  handleShowPreview: (selected: File[]) => void;
}) => ControlsBarType<File>;

export type SelectedComponentsFnType = (components: File[]) => void;

export type ControlsType = (handlers: {
  handleDeleteComponent: SelectedComponentsFnType;
  handleDownloadComponent: SelectedComponentsFnType;
  handleIsComponentDeletable: (component: File) => boolean;
  handleUploadComponent: (files: globalThis.File[]) => void;
  handleShowPreview: SelectedComponentsFnType;
  handleSwapComponentContent: (
    components: File[],
    files: globalThis.File[]
  ) => void;
  handleRenameComponent: SelectedComponentsFnType;
}) => ControlsBarType<File>;
