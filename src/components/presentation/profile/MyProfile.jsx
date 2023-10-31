import React from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import Button from '../../common/button/Button';
import Card from '../../common/card/Card';
import Input from '../../common/input/Input';
import Textarea from '../../common/textarea/Textarea';
import { StyledBadge, StyledTopWrapper } from '../../common/styled/StyledComponents';
import { fetchGithubProjects, updateUserDetails } from '../../../reducers/user/actionCreator';
import { ROLES } from '../../../constants';
import { getParsedObjectValue } from '../../../util';
import isEmpty from 'lodash.isempty';

const StyledProjectWrapper = styled.div`
  display: flex;
  flex-flow: wrap;
  row-gap: 5px;
`;

const MyProfile = () => {

  const dispatch = useDispatch();
  const { theme, user: {
    userType, activeUser, loading, projectError,
  } } = useSelector(state => state);

  const initialFormData = Object.freeze({
    githubHandle: activeUser?.githubHandle || '',
    firstName: activeUser?.firstName || '',
    lastName: activeUser?.lastName || '',
    email: activeUser?.email || '',
    heading: activeUser?.heading || '',
    skills: activeUser?.skills?.join(', ') || '',
    availability: activeUser?.availability || '',
    hourlyRate: activeUser?.hourlyRate || '',
    coverLetter: activeUser?.coverLetter || '',
    languages: activeUser?.languages?.join(', '),
  });

  const [formData, updateFormData] = React.useState(initialFormData);

  const handleChange = (e) => {
    updateFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleProfileUpdate = (event) => {
    event.preventDefault();
    const { firstName, lastName, heading, skills, availability, hourlyRate, coverLetter, languages } = formData;
    dispatch(updateUserDetails(activeUser.id, {
      firstName,
      lastName,
      heading,
      coverLetter,
      languages: getParsedObjectValue(languages),
      ...(userType === ROLES.FREELANCER && {
        skills: getParsedObjectValue(skills),
        availability,
        hourlyRate,
      }),
    }));
  }

  const fetchProjects = () => {
    dispatch(fetchGithubProjects(activeUser.id, formData.githubHandle));
  };

  const openProjectGithubLink = (link) => {
    window.open(link, '_blank');
  }

  return (
    <StyledTopWrapper>
      <div style={{ display: 'flex', columnGap: 20 }}>
        <Card style={{ width: '33%', height: 'fit-content' }}>
          <div className="card-title text-center">Welcome {activeUser?.firstName || 'User'}</div>
          {/* <StyledPrimaryLink theme={theme} to={'/profile/me'}>See Public View</StyledPrimaryLink> */}
          {
            projectError && (
              <div className='error-text text-center'>{projectError}</div>
            )
          }
          <div className="card-content">
            <Input
              type="text"
              label="Github Handle"
              name="githubHandle"
              placeholder={'Enter Github Handle'}
              onChange={handleChange}
              value={formData?.githubHandle}
            />
            <Button
              type="button"
              label="Fetch Projects"
              name="fetchProjectsBtn"
              priority="primary"
              onClick={fetchProjects}
              theme={theme}
            />

            {
              !loading && isEmpty(projectError) && !isEmpty(activeUser?.projects) && (
                <>
                  <div>Project List</div>
                  <hr />
                  <StyledProjectWrapper>
                    {
                      activeUser.projects.sort((a, b) => a.name.localeCompare(b.name)).map((project, index) => {
                        return (
                          <StyledBadge theme={theme} key={index} className='cursor-pointer' onClick={() => {
                            openProjectGithubLink(project.url)
                          }}>{project.name}</StyledBadge>
                        )
                      })
                    }
                  </StyledProjectWrapper>
                </>
              )
            }
          </div>
        </Card>
        <Card style={{ width: '66%', height: 'fit-content' }}>
          <div className="card-title text-center">My Information</div>
          <div className="card-content">
            <form className='form' autoComplete='off' onSubmit={handleProfileUpdate}>
              <div>
                <Input
                  type="text"
                  label="First Name"
                  name="firstName"
                  placeholder={'Enter First Name'}
                  onChange={handleChange}
                  value={formData?.firstName}
                  isRequired
                  minLength={3}
                />
              </div>

              <div>
                <Input
                  type="text"
                  label="Last Name"
                  name="lastName"
                  placeholder={'Enter Last Name'}
                  onChange={handleChange}
                  value={formData?.lastName}
                  isRequired
                />
              </div>

              <div>
                <Input
                  type="email"
                  label="Email"
                  name="email"
                  placeholder={'Enter Email'}
                  isReadonly={true}
                  value={formData?.email}
                  onChange={handleChange}
                  isRequired
                  isEmail
                  minLength={8}
                />
              </div>

              <div>
                <Input
                  type="text"
                  label="Languages"
                  name="languages"
                  helperText={'(comma separated values)'}
                  placeholder={'Enter Languages'}
                  onChange={handleChange}
                  value={formData?.languages}
                />
              </div>

              {
                userType === ROLES.FREELANCER && (
                  <>
                    <div>
                      <Input
                        type="text"
                        label="Skills"
                        name="skills"
                        helperText={'(comma separated values)'}
                        placeholder={'Enter Skills'}
                        onChange={handleChange}
                        value={formData?.skills}
                      />
                    </div>

                    <div>
                      <Input
                        type="number"
                        label="Availability"
                        helperText={'(hours/week)'}
                        name="availability"
                        placeholder={'Enter Hours'}
                        onChange={handleChange}
                        value={formData?.availability}
                        isRequired
                        minValue={1}
                        maxValue={99}
                      />
                    </div>

                    <div>
                      <Input
                        type="number"
                        label="Hourly Rate"
                        name="hourlyRate"
                        helperText={'($)'}
                        placeholder={'Enter Amount'}
                        onChange={handleChange}
                        value={formData?.hourlyRate}
                        isRequired
                        minValue={1}
                      />
                    </div>
                  </>
                )
              }

              <div>
                <Input
                  type="text"
                  label="Heading"
                  name="heading"
                  placeholder={'Enter Heading'}
                  onChange={handleChange}
                  value={formData?.heading}
                  isRequired
                  minLength={5}
                />
              </div>

              <div>
                <Textarea
                  label="Cover Letter"
                  name="coverLetter"
                  placeholder={'Enter your cover letter'}
                  onChange={handleChange}
                  value={formData?.coverLetter}
                  isRequired
                  minLength={20}
                />
              </div>

              <div>
                <Button
                  type="submit"
                  label="Update"
                  name="profileUpdate"
                  priority="secondary"
                  onClick={handleProfileUpdate}
                  theme={theme}
                />
              </div>
            </form>
          </div>
        </Card>
      </div >
    </StyledTopWrapper >
  )
}

export default MyProfile;