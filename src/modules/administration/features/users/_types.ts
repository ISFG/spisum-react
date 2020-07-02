import { fetchByCustomUrlAction } from "core/api/search/_actions";
import { ActionType } from "typesafe-actions";
import { EntityList } from "../../../../core/entities";
import { createProxy } from "../../../../share/utils/getPath";

export type UsersStateType = UsersSuccessResponseType & {
  isLoading: boolean;
  error: string | null;
};

export interface User {
  firstName: string;
  displayName: string;
  emailNotificationsEnabled: boolean;
  company: object;
  id: string;
  enabled: boolean;
  email: string;
  properties: {
    ssl: {
      group: string;
    };
  };
}

export const usersProxy = createProxy<User>();

export type UsersSuccessResponseType = EntityList<User>;

export enum DisabledUsers {
  Admin = "admin",
  Guest = "guest",
  Spisum = "spisum"
}

export type UsersActionTypes = ActionType<typeof fetchByCustomUrlAction>;
