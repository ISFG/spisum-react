import { SpisumNodeTypes } from "enums";
import { RootStateType } from "reducers";
import {
  createSafeAction,
  createSafeAsyncAction
} from "share/utils/typesafeActions";
import { ErrorType } from "types";
import {
  EmptyActionCreator,
  PayloadAction,
  PayloadActionCreator
} from "typesafe-actions";
import { NodeSuccessResponseType } from "./api/models";
import {
  NotificationFunctionType,
  NotificationType
} from "./components/notifications/_types";

export const rehydrateAction = createSafeAction("persist/REHYDRATE")<
  RootStateType
>();

type AsyncActionType<T1, T2, T3, TPayload> = {
  action: {
    request: PayloadActionCreator<string, T1> | EmptyActionCreator<string>;
    success: PayloadActionCreator<string, T2>;
    failure: PayloadActionCreator<string, T3>;
  };
  onError?: (error: T3) => void;
  onErrorNotification?: NotificationType | NotificationFunctionType | null;
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

export const fetchDocument = createSafeAsyncAction(
  "@api/FETCH_DOCUMENT_ACTION_REQUEST",
  "@api/FETCH_DOCUMENT_ACTION_SUCESS",
  "@api/FETCH_DOCUMENT_ACTION_FAILURE"
)<
  { id: string; nodeType: SpisumNodeTypes },
  NodeSuccessResponseType,
  ErrorType
>();
