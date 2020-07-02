import { Node, SslComponent } from "core/api/models";
import { ErrorType } from "types";
import { EntityList, File } from "../../../../entities";
import { ControlsBarType } from "../../../dataTable/_types";

export type ComponentNodeType = Node<SslComponent>;

export type ComponentsTabStateType = Readonly<{
  components: EntityList<File>;
  isLoading: boolean;
  error: ErrorType | null;
}>;

export type ReadonlyControlsType = (handlers: {
  handleCanShowPreview: (component: File) => boolean;
  handleShowPreview: (selected: File[]) => void;
  handleDownloadComponent: SelectedComponentsFnType;
}) => ControlsBarType<File>;

export type SelectedComponentsFnType = (components: File[]) => void;

export type ControlsType = (handlers: {
  handleCanConvertToOutputFormat: (component: File) => boolean;
  handleCanCreateComponent: () => boolean;
  handleCanDeleteComponent: () => boolean;
  handleCanRenameComponent: () => boolean;
  handleCanShowPreview: (component: File) => boolean;
  handleCanUploadNewVersion: (component: File) => boolean;
  handleConvertToOutputFormat: SelectedComponentsFnType;
  handleDeleteComponent: SelectedComponentsFnType;
  handleDownloadComponent: SelectedComponentsFnType;
  handleRenameComponent: SelectedComponentsFnType;
  handleShowPreview: SelectedComponentsFnType;
  handleSwapComponentContent: (
    components: File[],
    files: globalThis.File[]
  ) => void;
  handleUploadComponent: (files: globalThis.File[]) => void;
}) => ControlsBarType<File>;
