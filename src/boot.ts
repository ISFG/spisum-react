import { getDic } from "./core/features/dependencyInjection";
import * as coreModule from "./core";
import mailRoomModule from "./modules/mailroom";

export const boot = () => {
  const dic = getDic();

  coreModule.register(dic);
  mailRoomModule.register();
}