import { createProxy } from "share/utils/getPath";

export type User = {
  id: string;
  displayName: string;
};

export const userProxy = createProxy<User>();
