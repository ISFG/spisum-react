import { FetchStateType } from "types";

export interface EmailAccount {
  name: string;
  username: string;
}

export type EmailStateType = FetchStateType &
  Readonly<{
    emailAccounts: EmailAccount[];
  }>;

export type EmailDonRegisterRequestType = {
  nodeId: string;
  body: {
    reason: string;
  };
};

export type EmailIncompleteRequestType = {
  nodeId: string;
  subject: string;
  body: string;
  files?: File[];
};
