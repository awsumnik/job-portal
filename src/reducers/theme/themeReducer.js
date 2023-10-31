import { TOGGLE_THEME } from './actionType';
import { THEME } from '../../constants';

export const themeIntitialState = THEME.LIGHT;

const themeReducer = (state = themeIntitialState, action) => {
  switch (action.type) {
    case TOGGLE_THEME:
      const newTheme = state === THEME.LIGHT ? THEME.DARK : THEME.LIGHT;
      return state = newTheme;
    default:
      return state;
  }
};

export default themeReducer;
