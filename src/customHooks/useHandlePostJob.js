import axios from 'axios';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { postNewJobFailure, postNewJobInit, postNewJobSuccess } from '../reducers/jobs/actionCreator';
import appConfig from '../config.json';
import { handleNetworkError } from '../util';

const useHandlePostJob = () => {
  const [isJobPosted, setIsJobPosted] = useState(false);
  const dispatch = useDispatch();

  const handlePostJob = (payload) => {
    dispatch(postNewJobInit());
    axios.post(`${appConfig.BASE_URL}/jobs/`, payload)
      .then(response => {
        setIsJobPosted(true);
        dispatch(postNewJobSuccess());
      })
      .catch((error) => {
        dispatch(postNewJobFailure(`Error posting job. Please retry!`));
        handleNetworkError(error);
      });
    };
  return [isJobPosted, handlePostJob];
};

export default useHandlePostJob;