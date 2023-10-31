import { themeIntitialState } from '../reducers/theme/themeReducer';
import { userInitialState } from '../reducers/user/userReducer';

const initialState = {
  theme: themeIntitialState,
  user: userInitialState,
};

export const loadState = () => {
  const state = localStorage.getItem('job_portal_state');
  if (state === null) {
    return undefined;
  }
  return JSON.parse(state);
};

export const saveState = (state) => {
  const { user, theme } = state;
  const currentState = JSON.stringify({ theme, user });
  localStorage.setItem('job_portal_state', currentState);
};

export const savedState = loadState();

export const loadInititalAppState = () => {
  saveState(initialState)
}