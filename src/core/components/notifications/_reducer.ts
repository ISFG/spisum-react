import { ActionType, createReducer, getType } from "typesafe-actions";
import {
  notificationAction,
  NotificationActionType,
  notificationAction__Clear
} from "./_actions";
import { NotificationStateType } from "./_types";
import produce from "immer";
import { v4 as uuidv4 } from "uuid";

const initialState: NotificationStateType = {
  queue: []
};

export const notificationReducer = createReducer<
  NotificationStateType,
  NotificationActionType
>(initialState, {
  [getType(notificationAction)]: produce(
    (
      state: NotificationStateType,
      action: ActionType<typeof notificationAction>
    ) => {
      state.queue.push({
        ...action.payload,
        id: uuidv4()
      });
    }
  ),
  [getType(notificationAction__Clear)]: produce(
    (
      state: NotificationStateType,
      action: ActionType<typeof notificationAction__Clear>
    ) => {
      state.queue = state.queue.filter(
        (n) => action.payload.indexOf(n.id) === -1
      );
    }
  )
});
