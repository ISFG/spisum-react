import { fetchByCustomUrlAction } from "core/api/search/_actions";
import { EntityList } from "core/entities";
import { createProxy } from "share/utils/getPath";
import { ActionType } from "typesafe-actions";

export type MembersStateType = EntityList<Member> & {
  isLoading: boolean;
  error: string | null;
};

export interface Member {
  id: string;
  displayName: string;
}

export const membersProxy = createProxy<Member>();

export interface MembersRequestType {
  maxItems?: number;
  skipCount?: number;
  sortKeys?: string[] | null;
  sortAsc?: boolean | null;
}

export type MembersActionTypes = ActionType<typeof fetchByCustomUrlAction>;
