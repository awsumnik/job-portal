import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import styled from 'styled-components';
import { DEFAULT_ROUTES, ROLES, THEME_CONFIG } from '../../../constants';
import Button from '../../common/button/Button';
import Card from '../../common/card/Card';
import Input from '../../common/input/Input';
import { StyledCenteredWrapper } from '../../common/styled/StyledComponents';
import { handleRegisterAction } from '../../../reducers/user/actionCreator';
import messages from '../../../nls/en.json';

const BtnTextConfig = {
  [ROLES.EMPLOYER]: {
    btnText: messages.JOIN_AS_CLIENT,
  },
  [ROLES.FREELANCER]: {
    btnText: messages.JOIN_AS_FREELANCER,
  },
};

const ButtonBoxWrapper = styled.div`
  display: flex;
  column-gap: 20px;
  margin-bottom: 1rem;
`;

const ButtonBox = styled.div`
  border: 1px solid ${props => THEME_CONFIG[props.theme].borderColor};
  padding: 10px;
  border-radius: 3px;
  width: 200px;
  text-align: center;
  &.active {
    border: 1px solid ${props => THEME_CONFIG[props.theme].secondaryColor};
    background: ${props => THEME_CONFIG[props.theme].btnSecondaryBg};
    color: ${props => THEME_CONFIG[props.theme].secondaryColor};
  }
`;

const StyledLink = styled.span`
  cursor: pointer;
  color: ${props => THEME_CONFIG[props.theme].btnPrimaryColor};
`;

const Register = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { theme, user: { loading, error, isLoggedIn: isRegistered } } = useSelector(state => state);
  const [userType, setUserType] = useState('');
  const [showForm, setShowForm] = useState(false);

  const [formErrors, setFormErrors] = useState({
    firstName: true,
    lastName: true,
    email: true,
    password: true,
  });

  const onFormError = (errObj) => {
    setFormErrors({
      ...formErrors,
      ...errObj,
    });
  };

  const hasError = () => Object.values(formErrors).some(el => el);

  const initialFormData = Object.freeze({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });

  const [formData, updateFormData] = useState(initialFormData);

  const handleChange = (e) => {
    updateFormData({
      ...formData,
      [e.target.name]: e.target.value.trim()
    });
  };

  useEffect(() => {
    if (isRegistered) {
      const redirectPath = DEFAULT_ROUTES[userType];
      navigate(redirectPath);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isRegistered]);

  const handleRegisterClick = (event) => {
    event.preventDefault();
    const payload = {
      id: uuidv4(),
      ...formData,
      userType,
      password: btoa(formData.password),
    };
    dispatch(handleRegisterAction(payload));
  };

  const switchUserType = (userType) => {
    setShowForm(false);
    setUserType(userType);
  };

  const goToSignIn = () => {
    navigate('/sign-in');
  };

  const renderRegisterForm = () => {
    return (
      <>
        <form className='form' autoComplete='off' onSubmit={handleRegisterClick}>
          <div>
            <Input
              type="text"
              label="First Name"
              name="firstName"
              placeholder={'Enter First Name'}
              onChange={handleChange}
              isRequired
              autoFocus
              minLength={3}
              onError={onFormError}
            />
          </div>

          <div>
            <Input
              type="text"
              label="Last Name"
              name="lastName"
              placeholder={'Enter Last Name'}
              onChange={handleChange}
              isRequired
              onError={onFormError}
            />
          </div>

          {
            userType === ROLES.EMPLOYER && (
              <div>
                <Input
                  type="text"
                  label="Company Name"
                  name="companyName"
                  placeholder={'Enter Company name'}
                  onChange={handleChange}
                  isRequired
                  minLength={2}
                />
              </div>
            )
          }

          <div>
            <Input
              type="email"
              label="Email"
              name="email"
              placeholder={'Enter Email'}
              onChange={handleChange}
              isRequired
              isEmail
              minLength={8}
              onError={onFormError}
            />
          </div>

          <div>
            <Input
              type="password"
              label="Password"
              name="password"
              placeholder={'Enter Password'}
              onChange={handleChange}
              isRequired
              isPassword
              minLength={8}
              onError={onFormError}
            />
          </div>

          <div>
            <Button
              type="submit"
              label={messages.CREATE_MY_ACCOUNT}
              name="registerBtn"
              priority="primary"
              onClick={handleRegisterClick}
              isDisabled={hasError()}
            />
          </div>

          <div className='text-secondary text-center'>
            {
              userType === ROLES.FREELANCER ? (
                <>
                  {messages.HIRE_TALENT}
                  <StyledLink theme={theme} onClick={() => {
                    switchUserType(ROLES.EMPLOYER)
                  }} >{messages.JOIN_AS_CLIENT}</StyledLink>
                </>
              ) : (
                <>
                  {messages.LOOKING_FOR_WORK}
                  <StyledLink theme={theme} onClick={() => {
                    switchUserType(ROLES.FREELANCER)
                  }} >{messages.APPLY_AS_TALENT}</StyledLink>
                </>
              )

            }
          </div>
        </form>
      </>
    )
  }

  return (
    <StyledCenteredWrapper>
      <Card style={{ width: 400 }}>
        <div className="card-title text-center">{messages.JOIN_US}</div>
        {
          error && !loading && (
            <div className='error-text text-center'>{error}</div>
          )
        }
        <div className='card-content'>
          {
            showForm ? renderRegisterForm() : (
              <>
                <ButtonBoxWrapper>
                  <ButtonBox theme={theme} className={userType===ROLES.EMPLOYER ? 'active': ''} onClick={() => { setUserType(ROLES.EMPLOYER) }}>
                    {messages.IAM_CLIENT}
                  </ButtonBox>
                  <ButtonBox theme={theme} className={userType===ROLES.FREELANCER ? 'active': ''} onClick={() => { setUserType(ROLES.FREELANCER) }}>
                    {messages.IAM_FREELANCER}
                  </ButtonBox>
                </ButtonBoxWrapper>
                <div>
                  <Button
                    type="button"
                    label={BtnTextConfig[userType]?.btnText || messages.CREATE_ACCOUNT}
                    name="joinBtn"
                    priority="primary"
                    isDisabled={!userType}
                    onClick={() => { setShowForm(true) }}
                  />
                </div>
              </>
            )
          }
          <div>
            <hr />
            <p className='text-center'>{messages.ALREADY_HAVE_ACCOUNT}</p>
            <Button
              type="button"
              label="Log In"
              name="signInBtn"
              priority="secondary"
              onClick={goToSignIn}
            />
          </div>
        </div>
      </Card>
    </StyledCenteredWrapper>
  )
}

export default Register;