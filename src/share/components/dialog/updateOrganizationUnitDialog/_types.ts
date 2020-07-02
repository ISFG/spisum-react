import { createProxy } from "share/utils/getPath";

export type UpdateOrganizationUnitFormValues = {
  name: string;
};

export const UpdateOrganizationUnitFormValuesProxy = createProxy<
  UpdateOrganizationUnitFormValues
>();
