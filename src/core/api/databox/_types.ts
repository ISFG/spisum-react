import { FetchStateType } from "types";

export interface DataboxAccount {
  id: string;
  name: string;
  username: string;
}

export type DataboxStateType = FetchStateType &
  Readonly<{
    databoxAccounts: DataboxAccount[];
  }>;

export type DataboxDonRegisterRequestType = {
  nodeId: string;
  body: {
    reason: string;
  };
};
