import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { ROLES } from '../../../constants';
import { quickApplyToJob } from '../../../reducers/jobs/actionCreator';
import Button from '../../common/button/Button';
import Card from '../../common/card/Card';
import { StyledBadge } from '../../common/styled/StyledComponents';
import messages from '../../../nls/en.json';
import jdDocument from '../../../assets/UI-Job-Description.pdf';

const StyledJobTitle = styled.div`
  font-size: 1.2rem;
`;
const JobItem = ({ item }) => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { theme, user: { userType, activeUser } } = useSelector(state => state);
  const isEmployer = userType === ROLES.EMPLOYER;
  const hasAlreadyApplied = item.isApplied && item.appliedBy.some(applicant => applicant.id === activeUser.id);

  const handleApplicantClicked = (applicant) => {
    navigate(`/profile/${applicant.id}`);
  };

  const handleDocumentClicked = () => {
    window.open(`${window.location.origin}${jdDocument}`, '_blank', 'noopener,noreferrer');
  }

  const handleApplyForJob = (jobInfo) => {
    const { id, appliedBy } = jobInfo;
    const payload = {
      isApplied: true,
      appliedBy: [...appliedBy, {
        id: activeUser.id,
        name: `${activeUser.firstName} ${activeUser.lastName}`.trim(),
      }],
    }
    dispatch(quickApplyToJob(id, payload));
  };

  return (
    <>
      <Card>
        <StyledJobTitle>{item.title}</StyledJobTitle>
        <p>{item.description}</p>
        {
          isEmployer && item.isApplied && (
            <>
              <div className='mb10'>
                <strong>{messages.APPLICATIONS_COUNT}</strong>
                <StyledBadge theme={theme}>{item.appliedBy.length}</StyledBadge>
              </div>
              <div className='mb10'><strong>{messages.APPLICANTS}</strong>{
                item.appliedBy.map((applicant, index) => (
                  <StyledBadge theme={theme} key={index} className='cursor-pointer' title={applicant.name} onClick={() => {
                    handleApplicantClicked(applicant);
                  }}>{applicant.name.charAt(0)}</StyledBadge>
                ))
              }</div>
            </>
          )
        }
        <div className='mb10'><strong>{messages.REQUIRED_SKILLS}:</strong> {item.skills.join(', ')}</div>
        <div className='mb10'><strong>{messages.RELATED_TAGS}:</strong> {item.tags.join(', ')}</div>
        <div className='mb10'><strong>{messages.HOURLY_RATE}:</strong> {item.hourlyBudget}$</div>
        <div style={{ display: 'flex' }}>
          {
            item.hasJdDocument && (
              <>
                <Button
                  type="button"
                  name="downloadJdDoc"
                  onClick={handleDocumentClicked}
                  priority="secondary"
                  theme={theme}
                  alignDirection="left"
                  label='Download JD Doc'
                />
                &nbsp;
              </>
            )
          }
          {
            !isEmployer && (
              <Button
                type="button"
                name="toggleThemeBtn"
                onClick={() => handleApplyForJob(item)}
                priority="primary"
                theme={theme}
                alignDirection="left"
                isDisabled={hasAlreadyApplied}
                label={hasAlreadyApplied ? messages.APPLICATION_ALREADY_SENT : messages.APPLY_FOR_JOB}
              />
            )
          }
        </div>
      </Card>
    </>
  )
}

export default JobItem;