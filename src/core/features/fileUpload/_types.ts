export type UploadInfo = {
  endpoint: string;
  file: File;
};

export type UploadProgress = {
  progress: number;
  file: File;
};

export type UploadSuccess = {
  file: File;
};

export type UploadFailure = {
  error: Error;
  file: File;
};

export enum UploadState {
  Running = "running",
  Success = "success",
  Error = "error"
}

export type FileUploadStateType = {
  progress?: number;
  state: UploadState;
};

export type StateType = {
  uploads: {
    [key: string]: FileUploadStateType;
  };
};
