import { createProxy } from "share/utils/getPath";

export enum RadioTypes {
  individual = "individual",
  legal = "legal",
  own = "own"
}

export interface SenderFieldsTypes {
  sender_address: "sender_address";
  sender_contact: "sender_contact";
  sender_job: "sender_job";
  sender_name: "sender_name";
  sender_orgName: "sender_orgName";
  sender_orgUnit: "sender_orgUnit";
}

export const SenderFieldsTypesProxy = createProxy<SenderFieldsTypes>();
