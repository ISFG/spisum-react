import { SessionType, UserGroupType } from "core/features/login/_types";
import { SpisumGroups } from "enums";

export const isUserInLeadership = (session: SessionType) => {
  if (!session || !session.user) {
    return false;
  }
  const leaderShipGroups = [
    `${session.activeGroup}_Coordinator`,
    SpisumGroups.Admin
  ];
  return (
    session.myGroups.find((x) => leaderShipGroups.indexOf(x.id) !== -1) !== null
  );
};

export const userHasSignPermissions = (session: SessionType) => {
  if (!session || !session.user) {
    return false;
  }

  return session.myGroups.some((x: UserGroupType) => {
    return x.id === `${session.activeGroup}_Sign`;
  });
};
