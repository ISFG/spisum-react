import { CmProperties, SslFile } from "../../api/models";

export const pickFileProps = <T extends SslFile & CmProperties>(
  payload: T
): Pick<
  T,
  Exclude<
    keyof T,
    | "settleMethod"
    | "customSettleMethod"
    | "settleReason"
    | "settleDate"
    | "owner"
    | "processor"
    | "closureDate"
    | "triggerActionId"
    | "triggerActionYear"
    | "toRepositoryDate"
    | "toArchiveShreddingDate"
    | "createdAt"
    | "pid"
  >
> => {
  const {
    closureDate,
    createdAt,
    customSettleMethod,
    owner,
    pid,
    processor,
    settleDate,
    settleMethod,
    settleReason,
    toArchiveShreddingDate,
    toRepositoryDate,
    triggerActionId,
    triggerActionYear,
    ...rest
  } = payload;

  return rest;
};
