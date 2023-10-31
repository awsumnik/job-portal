import {
  GET_JOBS_INIT,
  GET_JOBS_SUCCESS,
  GET_JOBS_FAILURE,
  POST_NEW_JOB_INIT,
  POST_NEW_JOB_FAILURE,
  POST_NEW_JOB_SUCCESS,
  APPLY_FOR_JOB_INIT,
  APPLY_FOR_JOB_SUCCESS,
  APPLY_FOR_JOB_FAILURE,
} from './actionType';

export const jobsIntitialState = {
  loading: false,
  totalPages: 1,
  currentPage: 1,
  allJobs: [],
  error: '',
};

const jobsReducer = (state = jobsIntitialState, action) => {
  switch (action.type) {
    case GET_JOBS_INIT:
    case POST_NEW_JOB_INIT:
    case APPLY_FOR_JOB_INIT:
      return {
        ...state,
        loading: true,
        error: '',
      };
    case GET_JOBS_FAILURE:
    case POST_NEW_JOB_FAILURE:
    case APPLY_FOR_JOB_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case POST_NEW_JOB_SUCCESS:
      return {
        ...state,
        loading: false,
        error: '',
      };
    case GET_JOBS_SUCCESS:
      const { jobs, currentPage, totalPages } = action.payload;
      console.log(action.payload);
      return {
        ...state,
        loading: false,
        allJobs: currentPage === 1 ? jobs : [...state.allJobs, ...jobs],
        totalPages: totalPages,
        currentPage,
        error: '',
      };
    case APPLY_FOR_JOB_SUCCESS:
      const updatedJobId = action.payload.id;
      const jobList = [...state.allJobs];
      const updatedJobs = jobList.map(job => {
        if(updatedJobId === job.id) {
          return {
            ...job,
            ...action.payload,
          };
        }
        return job;
      });
      return {
        ...state,
        allJobs: [...updatedJobs],
      }
    default:
      return state;
  }
};

export default jobsReducer;
