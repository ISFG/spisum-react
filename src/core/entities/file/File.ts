import { ContentInfo, Node, PathInfo, SslComponent } from "core/api/models";
import { isObject } from "lodash";
import { createProxy, lastPathMember } from "share/utils/getPath";

export type File = {
  canBeSigned?: SslComponent["canBeSigned"];
  id: Node["id"];
  isReadable?: SslComponent["fileIsReadable"];
  name?: SslComponent["fileName"];
  size?: ContentInfo["sizeInBytes"];
  metaType?: FileMetaType;
  path?: PathInfo["name"];
  content?: string | Blob;
  fileIsInOutputFormat?: SslComponent["fileIsInOutputFormat"];
  fileIsSigned?: SslComponent["fileIsSigned"];
  isLocked?: Node["isLocked"];
  isSign?: SslComponent["isSign"];
  isSealed?: SslComponent["isSealed"];
  keepForm?: SslComponent["keepForm"];
  usedTime?: SslComponent["usedTime"];
  nodeType?: string;
  documentId?: string;
};

export enum FileMetaType {
  deliveryNote = "dorucenka",
  enclosure = "enclosure",
  main = "main",
  meta = "meta",
  signature = "signature",
  signatureVerificationProtocol = "protokol_overeni_podpisu"
}

export const fileProxy = createProxy<File>();

export const isFile = (file: unknown): file is File =>
  isObject(file) && file.hasOwnProperty(lastPathMember(fileProxy.id).path);
