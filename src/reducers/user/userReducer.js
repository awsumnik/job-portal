import { ROLES } from '../../constants';
import {
  LOGIN_INIT,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT_USER,
  REGISTER_INIT,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  FETCH_GITHUB_PROJECTS_INIT,
  FETCH_GITHUB_PROJECTS_SUCCESS,
  FETCH_GITHUB_PROJECTS_FAILURE,
  UPDATE_USER_PROFILE_INIT,
  UPDATE_USER_PROFILE_SUCCESS,
  UPDATE_USER_PROFILE_FAILURE,
  GET_USER_BY_ID_INIT,
  GET_USER_BY_ID_SUCCESS,
  GET_USER_BY_ID_FAILURE,
} from './actionType';

export const userInitialState = {
  loading: false,
  error: '',
  projectError: '',
  userType: ROLES.DEFAULT,
  isLoggedIn: false,
  activeUser: {},
  publicUser: {},
};

const userReducer = (state = userInitialState, action) => {
  switch (action.type) {
    case LOGIN_INIT:
      return {
        ...state,
        loading: true,
        error: '',
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        loading: false,
        isLoggedIn: false,
        error: action.payload,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        loading: false,
        error: '',
        userType: action.payload.userType,
        activeUser: action.payload,
      };
    case LOGOUT_USER:
      return {
        ...state,
        isLoggedIn: false,
        userType: ROLES.DEFAULT,
        activeUser: {},
        loading: false,
        error: '',
      };
    case REGISTER_INIT:
      return {
        ...state,
        loading: true,
        error: '',
      };
    case REGISTER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case REGISTER_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        activeUser: action.payload,
        userType: action.payload.userType,
        loading: false,
        error: '',
      };
    case FETCH_GITHUB_PROJECTS_INIT:
      return {
        ...state,
        loading: true,
        projectError: '',
      };
    case FETCH_GITHUB_PROJECTS_SUCCESS:
      const { githubHandle, projects } = action.payload;
      return {
        ...state,
        loading: false,
        activeUser: {...state.activeUser, projects, githubHandle},
        projectError: '',
      };
    case FETCH_GITHUB_PROJECTS_FAILURE:
      return {
        ...state,
        loading: false,
        projectError: action.payload,
        activeUser: {...state.activeUser, projects: []},
      };
    case UPDATE_USER_PROFILE_INIT:
      return {
        ...state,
        loading: true,
        error: '',
      };
    case UPDATE_USER_PROFILE_SUCCESS:
      return {
        ...state,
        activeUser: {...state.activeUser, ...action.payload},
        loading: false,
        error: '',
      };
    case UPDATE_USER_PROFILE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case GET_USER_BY_ID_INIT:
      return {
        ...state,
        loading: true,
        error: '',
      };
    case GET_USER_BY_ID_SUCCESS:
      return {
        ...state,
        loading: false,
        publicUser: action.payload,
      };
    case GET_USER_BY_ID_FAILURE:
      return {
        ...state,
        loading: false,
        error: '',
        publicUser: {},
      };
    default:
      return state;
  }
};

export default userReducer;
