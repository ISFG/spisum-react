import { GroupMember } from "core/api/models";
import { createProxy } from "share/utils/getPath";
import { FetchStateType } from "types";

export interface AllGroupType {
  dispatch: GroupMember[];
  main: GroupMember[];
  repository: GroupMember[];
}

export interface CodeList {
  name: string;
  title: string;
  values: string[];
}

interface GlobalVariablesType {
  codeLists: CodeList[];
  shreddingPlans: ShreddingPlan[];
  expire: number;
  groups: AllGroupType;
  maxItems: number;
  paths: SslPathsType[] | null;
}

export interface UserGroupType {
  isRoot: boolean;
  displayName: string;
  id: string;
}

export interface LoginRequestType {
  password: string;
  remember: boolean;
  username: string;
}

export interface LoginResponseType {
  expire: number;
  remember: SessionRememberType;
  user: string;
  signer: boolean;
}

export interface LoginSetSessionType {
  domain: string;
  isAdmin: boolean;
  token: string;
}

export interface LoginFormValuesType {
  password: string;
  remember: boolean;
  username: string;
}

export const LoginFormValuesTypeProxy = createProxy<LoginFormValuesType>();

export type LoginStateType = FetchStateType &
  Readonly<{
    expireIn: number | null;
    global: GlobalVariablesType;
    keepPending: boolean;
    logoutPending: boolean;
    session: SessionType;
  }>;

export interface PersonType {
  id: string;
  firstName: string;
  lastName: string;
  displayName: string;
  description: string;
  avatarId: string;
  email: string;
  jobTitle: string;
  location: string;
  mobile: string;
  properties: {
    ssl: {
      group: string;
    };
  };
  telephone: string;
  statusUpdatedAt: Date;
  userStatus: string;
  enabled: true;
  emailNotificationsEnabled: true;
}

export enum SessionStatus {
  UNAUTHORIZED,
  AUTHORIZED
}

export type SessionRememberType = {
  password: string;
  username: string;
} | null;

export interface SessionType {
  domain: string;
  isAdmin?: boolean;
  activeGroup?: string;
  groups: UserGroupType[];
  myGroups: UserGroupType[];
  remember: SessionRememberType;
  status: SessionStatus;
  token?: string;
  user?: PersonType;
  signer: boolean;
}

export interface SslPathsType {
  childs: SslPathsType[];
  name: string;
  path: string;
  permissions: string[];
}

export interface UserInfoResponseType {
  entry: PersonType;
}

export interface ShreddingPlanItem {
  isCaption?: boolean;
  fileMark: string;
  parentFileMark?: string;
  period?: number;
  retentionMark?: string;
  subjectGroup: string;
  triggerActionId?: string;
}

export interface ShreddingPlan {
  id: string;
  items: ShreddingPlanItem[];
  name: string;
}
