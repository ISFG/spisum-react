import { GroupMember } from "core/api/models";
import { createProxy } from "share/utils/getPath";

export const groupMemberProxy = createProxy<GroupMember>();
