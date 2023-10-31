import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import isEmpty from 'lodash.isempty';
import useHandlePostJob from '../../../customHooks/useHandlePostJob';
import { getCurrentDateTime, getParsedObjectValue } from '../../../util';
import Button from '../../common/button/Button';
import Card from '../../common/card/Card';
import Input from '../../common/input/Input';
import { StyledCenteredWrapper } from '../../common/styled/StyledComponents';
import Textarea from '../../common/textarea/Textarea';

const PostNewJob = () => {

  const navigate = useNavigate();
  const [isJobPosted, handlePostJob] = useHandlePostJob();
  const [hasFileError, setHasFileError] = useState(false);
  const { user: { activeUser }, jobs: { loading, error } } = useSelector(state => state);
  const [filePath, setFilePath] = useState('');

  useEffect(() => {
    if(isJobPosted) {
      navigate('/my-jobs');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isJobPosted]);

  const initialFormData = Object.freeze({
    title: '',
    description: '',
    skills: '',
    companyName: activeUser?.companyName ||  '',
    email: activeUser?.email || '',
    amount: '',
    freelancersToHire: '',
    weeklyEngagement: '',
    hourlyBudget: '',
    tags: '',
  });

  const [formData, updateFormData] = useState(initialFormData);

  const handleChange = (e) => {
    updateFormData({
      ...formData,

      // Trimming any whitespace
      [e.target.name]: e.target.value
    });
  };

  const handleFileUpload = (e) => {
    const selectedFile = e.target.files[0];
    if(selectedFile) {
      const fileSize = selectedFile.size/1000;
      if(fileSize > 16) {
        setHasFileError(true);
        setFilePath('');
      } else {
        setHasFileError(false);
        setFilePath(e.target.value);
      }
    }
  };

  const handlePostNewJob = (event) => {
    event.preventDefault();
    if(!hasFileError) {
      const { email, companyName, ...rest } =  formData;
      handlePostJob({
        id: uuidv4(),
        ...rest,
        skills: getParsedObjectValue(formData.skills),
        tags: getParsedObjectValue(formData.tags),
        createdOn: getCurrentDateTime(),
        isApplied: false,
        appliedBy: [],
        isClosed: false,
        client: {
          id: activeUser.id,
          email: email || activeUser.email,
          name: companyName || activeUser.companyName,
        },
        hasJdDocument: !isEmpty(filePath),
      });
    }
  };

  return (
    <StyledCenteredWrapper style={{ marginTop: 40}}>
      <Card style={{ minWidth: 600 }}>
        <div className="card-title text-center">Post a new Job</div>
        {
          !loading && error && (
            <div className='error-text text-center'>{error}</div>
          )
        }
        <div className='card-content'>
          <form className='form' autoComplete='off' onSubmit={handlePostNewJob}>
            <div>
              <Input
                type="text"
                label="Job Title"
                name="title"
                placeholder={'Enter Job Title'}
                onChange={handleChange}
                isRequired
                minLength={15}
                maxLength={50}
              />
            </div>

            <div>
              <Textarea
                label="Job Description"
                name="description"
                placeholder={'Enter Job Description'}
                onChange={handleChange}
                isRequired
                minLength={50}
                maxLength={200}
              />
            </div>

            <div>
              <Input
                type="file"
                label="Job Description Document"
                name="descriptionDocument"
                placeholder={'Enter Job Description'}
                onChange={handleFileUpload}
              />
              {hasFileError && (
                <span className='error-text'>File size should be less than 16KB</span>
              )}
            </div>

            <div>
              <Input
                type="text"
                label="Required Skills"
                helperText="(comma separated)"
                name="skills"
                placeholder={'Enter Required Skills'}
                onChange={handleChange}
                isRequired
              />
            </div>

            <div>
              <Input
                type="text"
                label="Tags"
                helperText="(comma separated)"
                name="tags"
                placeholder={'Enter Related Tags'}
                onChange={handleChange}
                isRequired
              />
            </div>

            <div>
              <Input
                type="text"
                label="Company Name"
                name="companyName"
                placeholder={'Enter Company Name'}
                onChange={handleChange}
                isRequired
                minLength={2}
                value={formData.companyName}
              />
            </div>

            <div>
              <Input
                type="email"
                label="Company Email"
                name="email"
                placeholder={'Enter Company Email'}
                onChange={handleChange}
                isRequired
                isEmail
                minLength={8}
                value={formData.email}
              />
            </div>

            <div>
              <Input
                type="number"
                label="Weekly Engagement"
                helperText={'(Hours)'}
                name="weeklyEngagement"
                placeholder={'Enter Weekly engagement hours'}
                onChange={handleChange}
                isRequired
                minValue={1}
                maxValue={99}
              />
            </div>

            <div>
              <Input
                type="number"
                label="Hourly Budget"
                helperText='($)'
                name="hourlyBudget"
                placeholder={'Enter hourly budget'}
                isRequired
                onChange={handleChange}
                minValue={1}
              />
            </div>

            <div>
              <Input
                type="number"
                label="Amount"
                helperText='($)'
                name="amount"
                placeholder={'Enter project Budget'}
                onChange={handleChange}
                isRequired
                minValue={1}
              />
            </div>

            <div>
              <Input
                type="number"
                label="Freelancers to Hire"
                name="freelancersToHire"
                placeholder={'Enter Number of freelancers needed'}
                onChange={handleChange}
                isRequired
                minValue={1}
                step={1}
              />
            </div>

            <div>
              <Button
                type="submit"
                label="Post Your Job"
                name="postJobBtn"
                priority="primary"
                onClick={handlePostNewJob}
                isDisabled={loading}
              />
            </div>
          </form>
        </div>
      </Card>
    </StyledCenteredWrapper>
  )
};

export default PostNewJob;