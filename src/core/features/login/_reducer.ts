import { merge } from "lodash";
import { getType } from "typesafe-actions";
import { logoutAction, LogoutActionType } from "../logout/_actions";
import {
  allGroupsAction,
  codeListsAction,
  codeListsShreaddingPlanAction,
  loginAction,
  LoginActionType,
  loginAction__ClearError,
  loginKeepAction,
  loginSetSessionTokenAction,
  loginUpdateExpireInAction,
  pathsInfoAction,
  setActiveGroupAction,
  userGroupAction,
  userInfoAction
} from "./_actions";
import { LoginStateType, SessionStatus } from "./_types";

export const initialState: LoginStateType = {
  error: null,
  expireIn: null,
  global: {
    codeLists: [],
    expire: 1800 * 1000,
    groups: {
      dispatch: [],
      main: [],
      repository: []
    },
    maxItems: 50,
    paths: null,
    shreddingPlans: []
  },
  keepPending: false,
  logoutPending: false,
  pending: false,
  session: {
    domain: "",
    groups: [],
    isAdmin: false,
    myGroups: [],
    remember: null,
    signer: true,
    status: SessionStatus.UNAUTHORIZED,
    token: undefined,
    user: undefined
  }
};

export default (
  state: LoginStateType = initialState,
  action: LoginActionType | LogoutActionType
): LoginStateType => {
  switch (action.type) {
    case getType(allGroupsAction.request):
      return {
        ...state
      };

    case getType(allGroupsAction.success):
      return {
        ...state,
        global: {
          ...state.global,
          groups: action.payload
        }
      };

    case getType(allGroupsAction.failure):
      return {
        ...initialState,
        error: action.payload
      };

    case getType(codeListsAction.request):
      return {
        ...state
      };

    case getType(codeListsAction.success):
      return {
        ...state,
        global: {
          ...state.global,
          codeLists: action.payload
        }
      };

    case getType(codeListsShreaddingPlanAction.success):
      return {
        ...state,
        global: {
          ...state.global,
          shreddingPlans: action.payload
        }
      };

    case getType(codeListsAction.failure):
      return {
        ...initialState,
        error: action.payload
      };

    case getType(loginAction.request):
      return {
        ...state,
        error: null,
        pending: true,
        session: {
          ...initialState.session,
          remember: (state.session && state.session.remember) || null
        }
      };

    case getType(loginAction.success):
      const expire = action.payload.expire
        ? action.payload.expire * 60 * 1000
        : state.global.expire;
      return {
        ...state,
        error: null,
        expireIn: new Date().getTime() + expire,
        global: {
          ...state.global,
          expire
        },
        pending: false,
        session: {
          ...state.session,
          remember: action.payload.remember,
          signer: action.payload.signer,
          status: SessionStatus.AUTHORIZED
        }
      };

    case getType(loginAction.failure):
      return {
        ...state,
        error: action.payload,
        pending: false,
        session: {
          ...initialState.session,
          remember: (state.session && state.session.remember) || null
        }
      };

    case getType(loginAction__ClearError):
      return {
        ...state,
        error: null
      };

    case getType(loginKeepAction.request):
      return { ...state, keepPending: true };

    case getType(loginKeepAction.success):
    case getType(loginKeepAction.failure):
      return { ...state, keepPending: false };

    case getType(loginSetSessionTokenAction):
      return {
        ...state,
        session: {
          ...state.session,
          domain: action.payload.domain,
          isAdmin: action.payload.isAdmin,
          token: action.payload.token
        }
      };

    case getType(loginUpdateExpireInAction):
      return {
        ...state,
        expireIn: new Date().getTime() + state.global.expire
      };

    case getType(logoutAction.request):
      return { ...state, logoutPending: true };

    case getType(logoutAction.success):
      return merge(initialState, {
        logoutPending: false,
        session: {
          remember: state.session.remember
        }
      });

    case getType(logoutAction.failure):
      return { ...state, logoutPending: false };

    case getType(pathsInfoAction.request):
      return {
        ...state
      };

    case getType(pathsInfoAction.success):
      return {
        ...state,
        global: {
          ...state.global,
          paths: action.payload
        }
      };

    case getType(pathsInfoAction.failure):
      return {
        ...initialState,
        error: action.payload
      };

    case getType(setActiveGroupAction):
      return {
        ...state,
        session: {
          ...state.session,
          activeGroup: action.payload
        }
      };

    case getType(userInfoAction.request):
      return {
        ...state
      };

    case getType(userInfoAction.success):
      return {
        ...state,
        session: {
          ...state.session,
          activeGroup: action.payload.entry?.properties?.ssl?.group,
          user: action.payload.entry
        }
      };

    case getType(userInfoAction.failure):
      return {
        ...initialState,
        error: action.payload
      };

    case getType(userGroupAction.request):
      return {
        ...state
      };

    case getType(userGroupAction.success):
      return {
        ...state,
        session: {
          ...state.session,
          groups: action.payload.groups,
          myGroups: action.payload.myGroups
        }
      };

    case getType(userGroupAction.failure):
      return {
        ...initialState,
        error: action.payload
      };

    default:
      return state;
  }
};
