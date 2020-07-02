import { createSafeAction } from "share/utils/typesafeActions";
import {
  EmptyActionCreator,
  PayloadAction,
  PayloadActionCreator
} from "typesafe-actions";
import { NotificationType } from "./components/notifications/_types";

type AsyncActionType<T1, T2, T3, TPayload> = {
  action: {
    request: PayloadActionCreator<string, T1> | EmptyActionCreator<string>;
    success: PayloadActionCreator<string, T2>;
    failure: PayloadActionCreator<string, T3>;
  };
  onError?: (error: T3) => void;
  onErrorNotification?: NotificationType | null;
  onSuccess?: (response: T2) => void;
  onSuccessNotification?: NotificationType | null;
  payload?: TPayload;
};

export const callAsyncAction: <T1, T2, T3, TPayload>(
  props: AsyncActionType<T1, T2, T3, TPayload>
) => PayloadAction<
  string,
  AsyncActionType<T1, T2, T3, TPayload>
> = createSafeAction("@action/CALL_ASYNC_ACTION")();
