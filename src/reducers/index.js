import { combineReducers } from 'redux';
import jobsReducer from './jobs/jobsReducer';
import themeReducer from './theme/themeReducer';
import userReducer from './user/userReducer';


const rootReducer = combineReducers({
  jobs: jobsReducer,
  theme: themeReducer,
  user: userReducer,
});

export default rootReducer;