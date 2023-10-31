import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../../common/button/Button';
import Card from '../../common/card/Card';
import Input from '../../common/input/Input';
import { StyledCenteredWrapper } from '../../common/styled/StyledComponents';
import { DEFAULT_ROUTES } from '../../../constants';
import { handleLoginAction } from '../../../reducers/user/actionCreator';
import messages from '../../../nls/en.json';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user: { loading, error, userType, isLoggedIn } } = useSelector(state => state);
  const initialFormData = Object.freeze({
    email: "",
    password: "",
  });
  const [formErrors, setFormErrors] = useState({
    email: true,
    password: true,
  });
  const [formData, updateFormData] = useState(initialFormData);

  const handleChange = (e) => {
    updateFormData({
      ...formData,
      [e.target.name]: e.target.value.trim()
    });
  };

  const onFormError = (errObj) => {
    setFormErrors({
      ...formErrors,
      ...errObj,
    });
  };

  const hasError = () => Object.values(formErrors).some(el => el);

  useEffect(() => {
    if (isLoggedIn) {
      const redirectPath = DEFAULT_ROUTES[userType];
      navigate(redirectPath);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoggedIn]);

  const handleLoginClick = (event) => {
    event.preventDefault();
    dispatch(handleLoginAction(formData));
  };

  const goToSignUp = () => {
    navigate('/sign-up');
  };

  return (
    <StyledCenteredWrapper>
      <form className='form' autoComplete='off' onSubmit={handleLoginClick}>
        <Card style={{ width: 400 }}>
          <div className="card-title text-center">{ messages.LOGIN_HEADING }</div>
          {
            error && !loading && (
              <div className='error-text text-center'>{error}</div>
            )
          }
          <div className="card-content">
            <div>
              <Input
                type="email"
                label="Email"
                name="email"
                placeholder={'Enter Email'}
                onChange={handleChange}
                isRequired
                minLength={8}
                autoFocus
                isEmail
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
                label="Log in"
                name="loginBtn"
                priority="primary"
                onClick={handleLoginClick}
                isDisabled={hasError()}
              />
            </div>
            <div>
              <hr />
              <p className='text-center'>{ messages.DONT_HAVE_ACCOUNT }</p>
              <Button
                type="button"
                label="Sign Up"
                name="signUpBtn"
                priority="secondary"
                onClick={goToSignUp}
              />
            </div>
          </div>
        </Card>
      </form>
    </StyledCenteredWrapper>
  )
}

export default Login;