import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { PAGE_SIZE, ROLES } from '../../../constants';
import { handleFetchJobList } from '../../../reducers/jobs/actionCreator';
import Button from '../../common/button/Button';
import Card from '../../common/card/Card';
import Input from '../../common/input/Input';
import JobItem from './JobItem';
import messages from '../../../nls/en.json';
import isEmpty from 'lodash.isempty';
import { StyledPrimaryLink } from '../../common/styled/StyledComponents';

const StyledFilterWrapper = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-evenly;
`;

const StyledPageSizeSelectWrapper = styled.div`
  display: flex;
  margin-bottom: 20px;
  justify-content: flex-end;
`;

const JobList = () => {

  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [shouldFetchJobs, setShouldFetchJobs] = useState(true);
  const [pageSize, setPageSize] = useState(PAGE_SIZE);
  const { theme, user: { userType, activeUser }, jobs: { allJobs: postedJobs, loading, totalPages } } = useSelector(state => state);
  const isEmployer = () => userType === ROLES.EMPLOYER;

  const initialFilterData = Object.freeze({
    skill: '',
    minHourlyRate: '',
    maxHourlyRate: '',
  });

  const [filterData, updateFilterData] = useState(initialFilterData);

  const handleChange = (e) => {
    updateFilterData({
      ...filterData,
      [e.target.name]: e.target.value.trim(),
    });
  };

  useEffect(() => {
    if (shouldFetchJobs) {
      dispatch(handleFetchJobList({
        currentPage,
        pageSize,
        ...(userType === ROLES.FREELANCER && {
          filterData,
        }),
        ...(userType === ROLES.EMPLOYER && {
          clientId: activeUser.id,
        })
      }));
      setShouldFetchJobs(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shouldFetchJobs]);

  const handleLoadMore = () => {
    setCurrentPage(currentPage + 1);
    setShouldFetchJobs(true);
  };

  const handlePageSizeChange = (e) => {
    setPageSize(e.target.value);
    setCurrentPage(1);
    setShouldFetchJobs(true);
  };

  const applyFilters = () => {
    setCurrentPage(1);
    setShouldFetchJobs(true);
  };

  const renderGreeting = () => {
    const currentTime = new Date().getHours();
    let greetingText = "";

    if (currentTime < 12) {
      greetingText = "Good Morning";
    } else if (currentTime < 18) {
      greetingText = "Good Afternoon";
    } else {
      greetingText = "Good Evening";
    }
    return (
      <div className='greeting-text'>
        {greetingText} <span className='user-name-text'>{activeUser.firstName}</span>
      </div>
    );
  }

  const renderFilters = () => {
    return !isEmployer() ? (
      <Card style={{ marginBottom: 20, padding: '10px 5px' }}>
        <StyledFilterWrapper>
          <div>
            <Input
              type="text"
              label="Skill"
              name="skill"
              placeholder={'Search by Skill'}
              onChange={handleChange}
            />
          </div>
          <div>
            <Input
              type="number"
              label="Hourly Rate (min)"
              name="minHourlyRate"
              placeholder={'Enter Amount'}
              min={0}
              onChange={handleChange}
            />
          </div>
          <div>
            <Input
              type="number"
              label="Hourly Rate (max)"
              name="maxHourlyRate"
              placeholder={'Enter Amount'}
              min={0}
              onChange={handleChange}
            />
          </div>
          <div style={{ paddingBottom: 20 }}>
            <Button
              type="button"
              label={messages.FILTER_JOBS}
              name="searchBtn"
              priority="primary"
              onClick={() => {
                applyFilters();
              }}
            />
          </div>
        </StyledFilterWrapper>
      </Card>
    ) : <></>;
  };

  const renderPageSizeFilter = () => {
    return postedJobs.length ? (
      <StyledPageSizeSelectWrapper>
        <label htmlFor='noOfRecords'>Show&nbsp;</label>
        <select name="noOfRecords" id="noOfRecords" value={pageSize} onChange={handlePageSizeChange}>
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="50">50</option>
          <option value="100">100</option>
        </select>
        <label>&nbsp;jobs</label>
      </StyledPageSizeSelectWrapper>
    ) : <></>
  };

  return (
    <div style={{ width: '80%', margin: '0 auto' }}>
      {renderGreeting()}
      {renderFilters()}
      {renderPageSizeFilter()}
      {
        isEmpty(postedJobs) && isEmployer() ? (
          <Card>
            <div className="card-content">
              <p>You have not posted any job yet. Click on `Post new Job` button to post your first job.</p>
              <div>
                <StyledPrimaryLink theme={theme} to={'/post-job'}>{messages.POST_NEW_JOB}</StyledPrimaryLink>
              </div>
            </div>
          </Card>
        ) : (
          <>
            {
              postedJobs.map((jobInfo, index) => (
                <JobItem key={index} item={jobInfo} />
              ))
            }
          </>
        )
      }
      {
        totalPages && currentPage < totalPages && (
          <Card>
            <Button
              type="button"
              name="loadMore"
              id="loadMore"
              label={messages.LOAD_MORE}
              priority="primary"
              isDisabled={loading}
              onClick={() => {
                handleLoadMore();
              }}
            />
          </Card>
        )
      }
    </div>
  )
};

export default JobList;