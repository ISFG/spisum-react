import { File } from "../../entities";

export enum PreviewState {
  Downloading = "downloading",
  Success = "success",
  Error = "error"
}

export type StateType = {
  files: {
    [key: string]: { file?: File; state: PreviewState };
  };
};
