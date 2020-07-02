import { NodeChildAssociation, SslFile } from "core/api/models";
import { GenericDocument } from "core/types";
import { createProxy } from "share/utils/getPath";

export enum FileOption {
  Existing = "existing",
  Create = "create"
}

export type SearchFilesState = {
  isLoading: boolean;
  results: NodeChildAssociation<SslFile>[] | undefined;
};

export type CreateNewDocumentFileFormValues = {
  nodeId?: string;
  selected: FileOption;
};

export type FormProps = {
  document: GenericDocument;
  initialValues: CreateNewDocumentFileFormValues;
  isLoading: boolean;
  onFileSearchChange: (value: string) => void;
  searchResults: NodeChildAssociation<SslFile>[];
};

export const createNewDocumentFileFormValuesProxy = createProxy<
  CreateNewDocumentFileFormValues
>();
