import axios from 'axios';
import isEmpty from 'lodash.isempty';
import {
  GET_JOBS_INIT,
  GET_JOBS_SUCCESS,
  GET_JOBS_FAILURE,
  POST_NEW_JOB_INIT,
  POST_NEW_JOB_SUCCESS,
  POST_NEW_JOB_FAILURE,
  APPLY_FOR_JOB_INIT,
  APPLY_FOR_JOB_SUCCESS,
  APPLY_FOR_JOB_FAILURE,
} from './actionType';
import appConfig from '../../config.json';
import { handleNetworkError } from '../../util';
import messages from '../../nls/en.json';

export const getJobsInit = () => {
  return {
    type: GET_JOBS_INIT,
  };
};

export const getJobsSuccess = ({ jobs, totalPages, currentPage }) => {
  return {
    type: GET_JOBS_SUCCESS,
    payload: {
      jobs,
      totalPages,
      currentPage,
    },
  };
};

export const getJobsFailure = (error) => {
  return {
    type: GET_JOBS_FAILURE,
    payload: error,
  };
};

export const postNewJobInit = () => {
  return {
    type: POST_NEW_JOB_INIT,
  };
};

export const postNewJobSuccess = (jobObj) => {
  return {
    type: POST_NEW_JOB_SUCCESS,
    payload: jobObj,
  };
};

export const postNewJobFailure = (error) => {
  return {
    type: POST_NEW_JOB_FAILURE,
    payload: error,
  };
};

export const applyForJobInit = () => {
  return {
    type: APPLY_FOR_JOB_INIT,
  };
};

export const applyForJobSuccess = (jobObj) => {
  return {
    type: APPLY_FOR_JOB_SUCCESS,
    payload: jobObj,
  };
};

export const applyForJobFailure = (error) => {
  return {
    type: APPLY_FOR_JOB_FAILURE,
    payload: error,
  };
};

export const handleFetchJobList = ({currentPage, pageSize, filterData: appliedFilters, clientId}) => {
  return async function (dispatch) {
    dispatch(getJobsInit());
    let filterString = `_page=${currentPage}&_limit=${pageSize}&_sort=createdOn&_order=desc`;
    if (!isEmpty(appliedFilters?.skill)) {
      filterString += `&skills_like=${appliedFilters.skill}`;
    }
    if (!isEmpty(appliedFilters?.minHourlyRate)) {
      filterString += `&hourlyBudget_gte=${appliedFilters.minHourlyRate}`;
    }
    if (!isEmpty(appliedFilters?.maxHourlyRate)) {
      filterString += `&hourlyBudget_lte=${appliedFilters.maxHourlyRate}`;
    }
    if(!isEmpty(clientId)) {
      filterString += `&client.id=${clientId}`;
    }
    axios.get(`${appConfig.BASE_URL}/jobs?${filterString}`)
      .then(response => {
        const totalPages = Math.ceil(response.headers['x-total-count'] / pageSize) || 1;
        return dispatch(getJobsSuccess({
          jobs: response.data,
          totalPages,
          currentPage,
        }));
      })
      .catch((error) => {
        handleNetworkError(error);
      });
  };
};

export const quickApplyToJob = (jobId, payload) => {
  return async function (dispatch) {
    dispatch(applyForJobInit());
    axios.patch(`${appConfig.BASE_URL}/jobs/${jobId}`, payload)
      .then(response => {
        console.log('resp', response);
        if (response && !isEmpty(response.data)) {
          return dispatch(applyForJobSuccess(response.data));
        }
        dispatch(applyForJobFailure(messages.APPLY_JOB_FAILED));
      })
      .catch((error) => {
        handleNetworkError(error);
      });
  };
};
