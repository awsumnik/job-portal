import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import Card from '../../common/card/Card';
import userAvatar from '../../../assets/user-avatar.svg';
import { THEME_CONFIG } from '../../../constants';
import { StyledBadge } from '../../common/styled/StyledComponents';
import messages from '../../../nls/en.json';
import { getUserDetailsById } from '../../../reducers/user/actionCreator';

const ProfileWrapper = styled.div`
  width: 100%;
  margin: 40px auto 0 auto;
  max-width: 800px;
`;

const ProfileHeaderWrapper = styled.div`
  display: flex;
  padding-bottom: 20px;
  border-bottom: 2px solid ${props => THEME_CONFIG[props.theme].borderColor };
`;

const ProfileBodyWrapper = styled.div`
  display: flex;
  flex-direction: row;
  margin: 20px;
  flex: 1 1;
`;

const StyledImage = styled.img`
  height: 64px;
  width: auto;
`;

const StyledTitle = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin-left: 20px;
`;

const StyledBodyLeftWrapper = styled.div`
  width: 33%;
  border-right: 2px solid ${props => THEME_CONFIG[props.theme].borderColor };
`;

const StyledBodyRightWrapper = styled.div`
  width: 66%;
  margin-left: 20px;

  > div:not(:first-child) {
    border-top: 2px solid #d4d4d4;
    padding-top: 20px;
    padding-bottom: 20px;

    div {
      display: flex;
      flex-flow: wrap;
      row-gap: 10px;
    }
  }
`;

const StyledBackButtonDiv = styled.div`
  color: ${props => THEME_CONFIG[props.theme].primaryColor };
  font-weight: bold;
  margin-bottom: 20px;
  > span {
    cursor: pointer;
  }
`;

const PublicProfile = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userId } = useParams();
  const { theme, user: { activeUser, publicUser }} = useSelector(state => state);
  

  useEffect(() => {
    if(userId !== 'me') {
      dispatch(getUserDetailsById(userId));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  const userData = userId === 'me' ? activeUser : publicUser;

  const openProjectGithubLink = (link) => {
    window.open(link, '_blank');
  }

  return (
    <ProfileWrapper>
      <StyledBackButtonDiv theme={theme} onClick={() => navigate(-1)}>
        <span>&laquo; Back</span>
      </StyledBackButtonDiv>
      <Card>
        <ProfileHeaderWrapper theme={theme}>
          <div className='display-flex'>
            <StyledImage src={userAvatar} alt='user' />
          </div>
          <StyledTitle>
            <strong>{`${userData?.firstName} ${userData?.lastName}`.trim()}</strong>
            <div>&nbsp;</div>
          </StyledTitle>
        </ProfileHeaderWrapper>
        <ProfileBodyWrapper>
          <StyledBodyLeftWrapper theme={theme}>
            <div>
              <strong>{messages.HOURS_PER_WEEK}</strong>
              <p>{ userData?.availability ? `${userData?.availability} hrs` : 'N/A'}</p>
            </div>

            <div>
              <strong>{messages.HOURLY_RATE}</strong>
              <p>{ userData?.hourlyRate ? `${userData?.hourlyRate}$` : 'N/A'}</p>
            </div>

            <div>
              <strong>{messages.LANGUAGES}</strong>
              <p>{ userData?.languages ? `${userData?.languages?.join(', ')}` : 'N/A'}</p>
            </div>
          </StyledBodyLeftWrapper>
          <StyledBodyRightWrapper>
            <div>
              <strong>{userData?.heading || 'Profile heading goes here'}</strong>
              <p>
                {userData?.coverLetter || 'Profile cover letter goes here'}
              </p>
            </div>

            <div>
              <strong>{messages.PORTFOLIO}</strong>
              <br/><br/>
              {
                userData?.projects?.length ? (
                  <div>
                    {
                      userData.projects.sort((a, b) => a.name.localeCompare(b.name)).map((project, index) => {
                        return (
                          <StyledBadge theme={theme} key={index} className='cursor-pointer' onClick={() => {
                            openProjectGithubLink(project.url)
                          }}>{project.name}</StyledBadge>
                        )
                      })
                    }
                  </div>
                ) : (
                  <div><StyledBadge theme={theme}>No Project added</StyledBadge></div>
                )
              }
            </div>

            <div>
              <strong>Skills</strong>
              <br/><br/>
              {
                userData?.skills?.length ? (
                  <div>
                    {
                      userData.skills.map((skill, index) => {
                        return (
                          <StyledBadge theme={theme} key={index}>{skill}</StyledBadge>
                        )
                      })
                    }
                  </div>
                ) : (
                  <div><StyledBadge theme={theme}>No Skill added</StyledBadge></div>
                )
              }
            </div>
          </StyledBodyRightWrapper>
        </ProfileBodyWrapper>
      </Card>
    </ProfileWrapper>
  );
};

export default PublicProfile;