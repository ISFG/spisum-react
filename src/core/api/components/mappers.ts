import { File, FileMetaType } from "../../entities";
import { mapListResponseToEntityList } from "../../mappers/api/listResponse";
import { DocumentUpdateSaveRequestType } from "../document/_types";
import { NodeChildAssociation, SslComponent } from "../models";
import { GetComponentsSuccessType } from "./_types";

export const getComponentsResponseMapper = (
  apiResponse: GetComponentsSuccessType
) =>
  mapListResponseToEntityList<NodeChildAssociation<SslComponent>, File>(
    apiResponse,
    (apiComponent) => ({
      canBeSigned: apiComponent.properties?.ssl?.canBeSigned,
      fileIsInOutputFormat: apiComponent.properties?.ssl?.fileIsInOutputFormat,
      fileIsSigned: apiComponent.properties?.ssl?.fileIsSigned,
      id: apiComponent.id,
      isLocked: apiComponent.isLocked,
      isReadable: apiComponent.properties?.ssl?.fileIsReadable,
      isSealed: apiComponent.properties?.ssl?.isSealed,
      isSign: apiComponent.properties?.ssl?.isSign,
      keepForm: apiComponent.properties?.ssl?.keepForm,
      metaType: apiComponent.properties?.ssl?.componentType as FileMetaType,
      name: apiComponent.properties?.ssl?.fileName,
      path: apiComponent.path?.name,
      size: apiComponent.content?.sizeInBytes,
      usedTime: apiComponent.properties?.ssl?.usedTime
    })
  );

export const getShipmentComponentsResponseMapper = (
  apiResponse: GetComponentsSuccessType
) =>
  mapListResponseToEntityList<NodeChildAssociation<SslComponent>, File>(
    apiResponse,
    (apiComponent) => ({
      id: apiComponent.id,
      isReadable: apiComponent.properties?.ssl?.fileIsReadable,
      metaType: apiComponent.properties?.ssl?.componentType as FileMetaType,
      name: apiComponent.properties?.ssl?.fileName || apiComponent.name,
      path: apiComponent.path?.name,
      size: apiComponent.content?.sizeInBytes
    })
  );
export const updateFileMapper = (
  file: File
): DocumentUpdateSaveRequestType<SslComponent> => {
  return {
    body: {
      properties: {
        componentType: file.metaType,
        fileIsReadable: file.isReadable,
        fileName: file.name
      }
    },
    nodeId: file.id
  } as DocumentUpdateSaveRequestType<SslComponent>;
};
