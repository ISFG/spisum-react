import { SpisumNodeTypes } from "enums";
import { isObject } from "lodash";
import { createProxy, lastPathMember } from "share/utils/getPath";
import { traverseNodeType } from "share/utils/utils";
import {
  CmProperties,
  Node,
  SslAnalog,
  SslComponent,
  SslConcept,
  SslDatabox,
  SslDataFolder,
  SslEmail,
  SslFile,
  SslProperties,
  SslShipment
} from "./api/models";

export type GenericDocument = Node<SslProperties>;
export type AnalogDocument = Node<SslAnalog>;
export type EmailDocument = Node<SslEmail>;
export type DataboxDocument = Node<SslDatabox>;
export type TechnicalCarrierDocument = Node<SslProperties>;
export type Component = Node<SslComponent>;
export type Folder = Node<SslDataFolder>;
export type ShipmentDocument = Node<SslShipment>;
export type Concept = Node<SslConcept>;
export type FileDocument = Node<SslFile>;

export type Document =
  | AnalogDocument
  | Component
  | DataboxDocument
  | EmailDocument
  | FileDocument
  | GenericDocument
  | ShipmentDocument
  | TechnicalCarrierDocument
  | Folder
  | Concept;

export const genericDocumentProxy = createProxy<GenericDocument>();
export const analogDocumentProxy = createProxy<AnalogDocument>();
export const emailDocumentProxy = createProxy<EmailDocument>();
export const shipmentDocumentProxy = createProxy<ShipmentDocument>();
export const conceptProxy = createProxy<Concept>();

export const dataBoxDocumentProxy = createProxy<DataboxDocument>();
export const technicalCarrierDocumentProxy = createProxy<
  TechnicalCarrierDocument
>();
export const componentProxy = createProxy<Component>();

export const sslAnalogPropsProxy = createProxy<SslAnalog>();
export const sslConceptProxy = createProxy<SslConcept>();
export const sslPropsProxy = createProxy<SslProperties>();
export const cmPropsProxy = createProxy<CmProperties>();
export const sslEmailPropsProxy = createProxy<SslEmail>();
export const sslDataboxPropsProxy = createProxy<SslDatabox>();
export const sslTechnicalCarrierPropsProxy = createProxy<SslProperties>();
export const sslComponentPropsProxy = createProxy<SslComponent>();
export const sslShipmentPropsProxy = createProxy<SslShipment>();

export const isGenericDocument = (
  document: unknown
): document is GenericDocument =>
  isObject(document) &&
  document.hasOwnProperty(lastPathMember(genericDocumentProxy.id).path) &&
  document.hasOwnProperty(lastPathMember(genericDocumentProxy.nodeType).path);

export const isFile = (document: unknown): document is GenericDocument => {
  return (
    isGenericDocument(document) &&
    traverseNodeType(document.nodeType) === SpisumNodeTypes.File
  );
};
