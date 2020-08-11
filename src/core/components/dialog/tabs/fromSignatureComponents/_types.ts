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
  handleSign: (selected: File[]) => void;
  signer: boolean;
}) => ControlsBarType<File>;

export type SelectedComponentsFnType = (components: File[]) => void;

export type SelectedComponentFnType = (components: File) => void;

export type ControlsType = (handlers: {
  handleSign: SelectedComponentsFnType;
  signer: boolean;
}) => ControlsBarType<File>;
