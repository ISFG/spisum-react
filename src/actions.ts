import { DocumentActionTypes } from "core/api/document/_actions";
import { DocumentViewActionType } from "core/components/documentView/_actions";
import { LayoutActionType } from "core/components/layout/_actions";
import { AutomaticLogoutDialogActionType } from "core/features/automaticLogout/_actions";
import { DialogActionType } from "./core/components/dialog/_actions";
import { MetaFormActionType } from "./core/components/MetaForm/_actions";
import { NotificationActionType } from "./core/components/notifications/_actions";
import { LoginActionType } from "./core/features/login/_actions";
import { LogoutActionType } from "./core/features/logout/_actions";
// import { MailRoomActionsType } from "./modules/mailRoom/actions";

export type RootActionsType =
  | AutomaticLogoutDialogActionType
  | DialogActionType
  | DocumentViewActionType
  | LayoutActionType
  | LoginActionType
  | LogoutActionType
  | MetaFormActionType
  | NotificationActionType
  | DocumentActionTypes; // | MailRoomActionsType
