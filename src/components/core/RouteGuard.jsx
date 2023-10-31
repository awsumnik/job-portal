import isEmpty from 'lodash.isempty';
import React from 'react';
import { useSelector } from 'react-redux';
import PageForbidden from './page-forbidden/PageForbidden';

const RouteGuard = ({ rolesAllowed, children }) => {
  const { userType } = useSelector(state => state.user);
  const isAuthorized = isEmpty(rolesAllowed) || rolesAllowed.includes(userType);

  return isAuthorized ? (children) : (
    <PageForbidden />
  );
};

export default RouteGuard;