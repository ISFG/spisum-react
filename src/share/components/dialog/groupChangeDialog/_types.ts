import { createProxy } from "../../../utils/getPath";

export interface GroupChangeFormValuesType {
  activeGroup: string;
}

export interface ActiveGroupType {
  displayName: string;
  id: string;
  isRoot: boolean;
}

export const groupChangeFormValuesProxy = createProxy<
  GroupChangeFormValuesType
>();
