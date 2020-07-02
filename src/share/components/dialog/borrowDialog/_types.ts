import { GroupMember } from "core/api/models";
import { Group } from "core/entities";
import { createProxy } from "share/utils/getPath";

export type BorrowFormValues = {
  group: Group["id"];
  user: GroupMember["id"];
};

export const BorrowFormValuesProxy = createProxy<BorrowFormValues>();
