import { createProxy } from "share/utils/getPath";

export type Group = {
  id: string;
  displayName: string;
};

export const groupProxy = createProxy<Group>();
