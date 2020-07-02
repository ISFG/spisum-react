import { createSafeAsyncAction } from "share/utils/typesafeActions";
import { ActionType } from "typesafe-actions";
import { ErrorResponseType } from "../models";
import {
  DeleteOrganizationUnitAction,
  GroupsListType,
  UpdateOrganizationUnitAction
} from "./_types";
import { CreateOrganizationUnitFormValues } from "../../../share/components/dialog/createOrganizationUnitDialog/_types";

export const getGroupsAction = createSafeAsyncAction(
  "@groups/GET_GROUPS_REQUEST",
  "@groups/GET_GROUPS_SUCCESS",
  "@groups/GET_GROUPS_FAILURE"
)<string, GroupsListType, ErrorResponseType>();

export const createOrganizationUnitAction = createSafeAsyncAction(
  "@groups/CREATE_ORGANIZATION_UNIT_REQUEST",
  "@groups/CREATE_ORGANIZATION_UNIT_SUCCESS",
  "@groups/CREATE_ORGANIZATION_UNIT_FAILURE"
)<CreateOrganizationUnitFormValues, {}, ErrorResponseType>();
export const updateOrganizationUnitAction = createSafeAsyncAction(
  "@groups/UPDATE_ORGANIZATION_UNIT_REQUEST",
  "@groups/UPDATE_ORGANIZATION_UNIT_SUCCESS",
  "@groups/UPDATE_ORGANIZATION_UNIT_FAILURE"
)<UpdateOrganizationUnitAction, {}, ErrorResponseType>();

export const deleteOrganizationUnitAction = createSafeAsyncAction(
  "@groups/DELETE_ORGANIZATION_UNIT_REQUEST",
  "@groups/DELETE_ORGANIZATION_UNIT_SUCCESS",
  "@groups/DELETE_ORGANIZATION_UNIT_FAILURE"
)<DeleteOrganizationUnitAction, {}, ErrorResponseType>();

export type GroupsActionType = ActionType<typeof getGroupsAction>;
