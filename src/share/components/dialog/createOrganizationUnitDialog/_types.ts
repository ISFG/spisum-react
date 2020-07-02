import { createProxy } from "share/utils/getPath";

export type CreateOrganizationUnitFormValues = {
  id: string;
  name: string;
  type: string;
};
export enum RadioTypes {
  isDispatch = "dispatch",
  isRepository = "repository",
  unclassified = ""
}

export const CreateOrganizationUnitFormValuesProxy = createProxy<
  CreateOrganizationUnitFormValues
>();
