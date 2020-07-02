import { User } from "../../../modules/administration/features/users/_types";
import {
  createSafeAction,
  createSafeAsyncAction
} from "../../../share/utils/typesafeActions";
import { ErrorType } from "../../../types";
import {
  ChangePasswordRequestType,
  CreateUserRequestType,
  DeactivateUserRequestType,
  DeactivateUserResponseType
} from "./_types";

export const changePasswordAction = createSafeAsyncAction(
  "@user/CHANGE_PASSWORD_ACTION_REQUEST",
  "@user/CHANGE_PASSWORD_ACTION_SUCESS",
  "@user/CHANGE_PASSWORD_ACTION_FAILURE"
)<ChangePasswordRequestType, void, ErrorType>();

export const createUserAction = createSafeAsyncAction(
  "@user/CREATE_USER_ACTION_REQUEST",
  "@user/CREATE_USER_ACTION_SUCESS",
  "@user/CREATE_USER_ACTION_FAILURE"
)<CreateUserRequestType, void, ErrorType>();

export const deactivateUserAction = createSafeAsyncAction(
  "@user/DEACTIVATE_USER_ACTION_REQUEST",
  "@user/DEACTIVATE_USER_ACTION_SUCESS",
  "@user/DEACTIVATE_USER_ACTION_FAILURE"
)<DeactivateUserRequestType, DeactivateUserResponseType, ErrorType>();

export const updateUserAction = createSafeAsyncAction(
  "@user/UPDATE_USER_ACTION_REQUEST",
  "@user/UPDATE_USER_ACTION_SUCESS",
  "@user/UPDATE_USER_ACTION_FAILURE"
)<CreateUserRequestType, void, ErrorType>();

export const openCreateUserDialogAction = createSafeAction(
  "@user/OPEN_CREATE_USER_DIALOG"
)<void>();

export const openEditUserDialogAction = createSafeAction(
  "@user/OPEN_EDIT_USER_DIALOG"
)<User>();
