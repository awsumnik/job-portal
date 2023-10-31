import React from 'react';
import { useSelector } from 'react-redux';
import Card from '../../common/card/Card';
import { StyledTopWrapper, StyledPrimaryLink, StyledSecondaryLink } from '../../common/styled/StyledComponents';
import messages from '../../../nls/en.json';

const LandingPage = () => {
  const theme = useSelector(state => state.theme);
  return (
    <StyledTopWrapper>
      <Card>
        <div className="card-title">{messages.LANDING_PAGE_HEADING}</div>
        <div className="card-content">
          <p>{messages.LANDING_PAGE_TEXT}</p>
          <div>
            <StyledPrimaryLink theme={theme} to={'/sign-in'}>{messages.FIND_TALENT}</StyledPrimaryLink>
            <StyledSecondaryLink theme={theme} to={'/sign-in'}>{messages.FIND_WORK}</StyledSecondaryLink>
          </div>
        </div>
      </Card>
    </StyledTopWrapper>
  )
}

export default LandingPage;