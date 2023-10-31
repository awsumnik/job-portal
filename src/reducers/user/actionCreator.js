import axios from 'axios';
import isEmpty from 'lodash.isempty';
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
import appConfig from '../../config.json';
import messages from '../../nls/en.json';
import { getCurrentDateTime, handleNetworkError } from '../../util';

export const loginInit = () => {
  return {
    type: LOGIN_INIT,
  }
};

export const loginSuccess = (data) => {
  return {
    type: LOGIN_SUCCESS,
    payload: data
  }
};

export const loginFailure = (error) => {
  return {
    type: LOGIN_FAILURE,
    payload: error
  }
};

export const logoutUser = () => {
  return {
    type: LOGOUT_USER,
  }
};

export const registerInit = () => {
  return {
    type: REGISTER_INIT,
  }
};

export const registerSuccess = (data) => {
  return {
    type: REGISTER_SUCCESS,
    payload: data
  }
};

export const registerFailure = (error) => {
  return {
    type: REGISTER_FAILURE,
    payload: error
  }
};

export const fetchGithubProjectsInit = () => {
  return {
    type: FETCH_GITHUB_PROJECTS_INIT,
  };
};

export const fetchGithubProjectsSuccess = (response) => {
  return {
    type: FETCH_GITHUB_PROJECTS_SUCCESS,
    payload: response,
  };
};

export const fetchGithubProjectsFailure = (error) => {
  return {
    type: FETCH_GITHUB_PROJECTS_FAILURE,
    payload: error,
  };
};

export const updateUserProfileInit = (userData) => {
  return {
    type: UPDATE_USER_PROFILE_INIT,
    payload: userData,
  };
};

export const updateUserProfileSuccess = (userData) => {
  return {
    type: UPDATE_USER_PROFILE_SUCCESS,
    payload: userData,
  };
};

export const updateUserProfileFailure = (error) => {
  return {
    type: UPDATE_USER_PROFILE_FAILURE,
    payload: error,
  };
};

export const getUserByIdInit = () => {
  return {
    type: GET_USER_BY_ID_INIT,
  }
};

export const getUserByIdSuccess = (data) => {
  return {
    type: GET_USER_BY_ID_SUCCESS,
    payload: data
  }
};

export const getUserByIdFailure = () => {
  return {
    type: GET_USER_BY_ID_FAILURE,
  }
};

export const updateUserDetails = (userId, userData) => {
  return async function (dispatch) {
    axios.patch(`${appConfig.BASE_URL}/users/${userId}`, userData)
      .then(response => {
        if (response && !isEmpty(response.data)) {
          dispatch(updateUserProfileSuccess(response.data));
          dispatch(fetchGithubProjectsSuccess(userData));
        }
      })
      .catch((error) => {
        console.error(messages.SERVER_DOWN, error);
      });
  };
};

export const fetchGithubProjects = (userId, githubHandle) => {
  return async function (dispatch) {
    dispatch(fetchGithubProjectsInit());
    axios.get(`https://api.github.com/users/${githubHandle}/repos`)
      .then(response => {
        const projects = response.data.map(project => {
          return {
            name: project.name,
            url: project.html_url,
          }
        });
        const payload = { githubHandle, projects };
        dispatch(updateUserDetails(userId, payload))
      })
      .catch((error) => {
        dispatch(fetchGithubProjectsFailure('Error fetching projects. Try later !'));
        handleNetworkError(error);
      });
  };
};

export const handleLoginAction = ({ email, password }) => {
  return async function (dispatch) {
    dispatch(loginInit());
    axios.get(`${appConfig.BASE_URL}/users?email=${email}`)
      .then(response => {
        if (response && !isEmpty(response.data)) {
          const [userData] = response.data;
          if (btoa(password) === userData.password) {
            const { password, ...rest } = userData;
            return dispatch(loginSuccess(rest));
          }
          return dispatch(loginFailure(messages.INVALID_CREDS));
        }
        return dispatch(loginFailure(messages.USER_NOT_EXIST));
      })
      .catch((error) => {
        console.error(messages.SERVER_DOWN, error);
      });
  };
};

export const handleRegisterAction = (inputData) => {
  return async function (dispatch) {
    dispatch(registerInit());
    axios.get(`${appConfig.BASE_URL}/users?email=${inputData.email}`)
      .then(response => {
        if (response && !isEmpty(response.data)) {
          return dispatch(registerFailure('Email is already registered. Try with another email!'))
        }
        axios.post(`${appConfig.BASE_URL}/users`, {
          ...inputData,
          createdOn: getCurrentDateTime(),
        })
          .then(response => {
            console.log(response)
            if (response && !isEmpty(response.data)) {
              const { password, ...rest } = response.data;
              return dispatch(registerSuccess(rest));
            }
            return dispatch(registerFailure(messages.REGISTER_FAILED));
          })
          .catch((error) => {
            console.error(messages.SERVER_DOWN, error);
          });
      })
      .catch((error) => {
        console.error(messages.SERVER_DOWN, error);
      });
  };
};

export const getUserDetailsById = (userId) => {
  return async function (dispatch) {
    dispatch(getUserByIdInit());
    axios.get(`${appConfig.BASE_URL}/users/${userId}`)
      .then(response => {
        if (response && !isEmpty(response.data)) {
          const { password, ...rest } = response.data;
          return dispatch(getUserByIdSuccess(rest));
        }
        return dispatch(getUserByIdFailure());
      })
      .catch((error) => {
        console.error(messages.SERVER_DOWN, error);
      });
  };
};
