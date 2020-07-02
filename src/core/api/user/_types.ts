import { UserFormValuesType } from "../../../share/components/dialog/createUserDialog/_types";
import { NodeChildAssociationEntry, SslProperties } from "../models";

export type ChangePasswordRequestType = {
  body: {
    oldPassword: string;
    newPassword: string;
  };
};

export interface CreateUserRequestType {
  body: UserFormValuesType;
}

export type DeactivateUserResponseType = NodeChildAssociationEntry<
  SslProperties
>;

export type EditUserAssociationType = UserFormValuesType & {
  properties: {
    ssl: {
      user_id: string;
      user_orgId: string;
      user_orgName: string;
      user_orgUnit: string;
      user_job: string;
      user_orgAddress: string;
      group: string;
    };
  };
};

export interface DeactivateUserRequestType {
  userId: string;
}
