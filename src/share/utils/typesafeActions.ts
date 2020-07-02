import { race, RaceEffect, take, TakeEffect } from "redux-saga/effects";
import {
  createAction,
  createAsyncAction,
  EmptyActionCreator,
  PayloadActionCreator,
  TypeConstant
} from "typesafe-actions";

const keys: string[] = [];

const checkKeys = (key?: string) => {
  if (!key) return;
  if (keys.includes(key)) {
    throw Error(`redundant action, '${key}' is already included in actions`);
  }
  keys.push(key);
};

export function createSafeAsyncAction<
  TType1 extends TypeConstant,
  TType2 extends TypeConstant,
  TType3 extends TypeConstant,
  TType4 extends TypeConstant = never
>(
  requestArg: TType1,
  successArg: TType2,
  failureArg: TType3,
  cancelArg?: TType4
) {
  if (process.env.NODE_ENV === "test") {
    checkKeys(requestArg);
    checkKeys(successArg);
    checkKeys(failureArg);
    checkKeys(cancelArg);
  }
  return createAsyncAction<TType1, TType2, TType3, TType4>(
    requestArg,
    successArg,
    failureArg,
    cancelArg
  );
}

export function createSafeAction<TType extends TypeConstant>(type: TType) {
  if (process.env.NODE_ENV === "test") {
    checkKeys(type);
  }
  return createAction<TType>(type);
}

export function* handleResponse<T1, T2, T3>(action: {
  request: PayloadActionCreator<string, T1> | EmptyActionCreator<string>;
  success: PayloadActionCreator<string, T2>;
  failure: PayloadActionCreator<string, T3>;
}): Generator<
  RaceEffect<TakeEffect>,
  (T2 | T3 | undefined | unknown)[],
  TakeEffect[]
> {
  const [successResponse, errorResponse] = yield race([
    take(action.success),
    take(action.failure)
  ]);

  return [
    successResponse && successResponse.payload,
    errorResponse && errorResponse.payload,
    !!successResponse
  ];
}
