import { createProxy } from "../../../utils/getPath";

export interface UserFormValuesType {
  availableGroups: GroupType[];
  id: string;
  password: string;
  passwordAgain: string;
  email: string;
  firstName: string;
  groups: string[];
  lastName: string;
  mainGroup: string;
  signGroups: string[];
  userId: string;
  userJob: string;
  userOrgAddress: string;
  userOrgId: string;
  userOrgName: string;
  userOrgUnit: string;
}

export const UserFormValuesProxy = createProxy<
  UserFormValuesType
>();

export interface GroupType {
  displayName: string;
  id: string;
  memberType: string;
}
