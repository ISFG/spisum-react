import { createProxy } from "share/utils/getPath";
import { User } from "../user/User";

export type Concept = {
  id: string;
  pid?: string;
  subject?: string;
  meta: {
    createdAt: Date;
    owner?: User;
  };
};

export const conceptProxy = createProxy<Concept>();
