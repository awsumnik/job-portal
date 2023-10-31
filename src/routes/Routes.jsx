import React, { Suspense } from 'react';
import styled from 'styled-components';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from '../components/auth/login/Login';
import Register from '../components/auth/register/Register';
import Header from '../components/core/header/Header';
import Loader from '../components/core/loader/Loader';
import JobList from '../components/presentation/job-list/JobList';
import PostNewJob from '../components/presentation/post-new-job/PostNewJob';
import LandingPage from '../components/presentation/landing-page/LandingPage';
import MyProfile from '../components/presentation/profile/MyProfile';
import PublicProfile from '../components/presentation/profile/PublicProfile';
import PageNotFound from '../components/core/page-not-found/PageNotFound';
import RouteGuard from '../components/core/RouteGuard';
import { ROLES } from '../constants';

const ContentWrapper = styled.div`
  display: flex;
  width: 100%;
  padding: 0 80px;
`;

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Header />
      <ContentWrapper>
        <Suspense fallback={Loader}>
          <Routes>
            <Route
              exact
              path="/"
              element={<LandingPage />}
            />
            <Route
              path="/find-work"
              element={<RouteGuard rolesAllowed={[ROLES.FREELANCER]}><JobList /></RouteGuard>}
            />
            <Route
              path="/my-jobs"
              element={<RouteGuard rolesAllowed={[ROLES.EMPLOYER]}><JobList /></RouteGuard>}
            />
            <Route
              path="/post-job"
              element={<RouteGuard rolesAllowed={[ROLES.EMPLOYER]}><PostNewJob /></RouteGuard>}
            />
            <Route
              path="/sign-in"
              element={<Login />}
            />
            <Route
              path="/sign-up"
              element={<Register />}
            />
            <Route
              path="/my-profile"
              element={<RouteGuard rolesAllowed={[ROLES.EMPLOYER, ROLES.FREELANCER]}><MyProfile /></RouteGuard>}
            />
            <Route
              path="/profile/:userId"
              element={<RouteGuard rolesAllowed={[ROLES.EMPLOYER, ROLES.FREELANCER]}><PublicProfile /></RouteGuard>}
            />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </Suspense>
      </ContentWrapper>
    </BrowserRouter>
  )
}

export default AppRoutes;