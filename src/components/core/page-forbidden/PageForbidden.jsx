import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { DEFAULT_ROUTES } from '../../../constants';
import Button from '../../common/button/Button';
import { StyledCenteredWrapper } from '../../common/styled/StyledComponents';

const PageForbidden = () => {

  const navigate = useNavigate();
  const { userType } = useSelector(state => state.user);

  const returnToHome = () => {
    navigate(DEFAULT_ROUTES[userType]);
  };

  return (
    <StyledCenteredWrapper>
      <div className="text-center">
        <h1 style={{ color: 'red' }}>403</h1>
        <h4>It seems you have taken a wrong turn?</h4>
        <p>Do not worry we are here to help you !</p>
        <Button
          type="button"
          label="Click to return to `Home`"
          name="returnToHome"
          priority="primary"
          onClick={returnToHome}
        />
      </div>
    </StyledCenteredWrapper>
  );
}

export default PageForbidden;
