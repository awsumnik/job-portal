import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';
import { THEME_CONFIG } from '../../../constants';

export const StyledCenteredWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

export const StyledTopWrapper = styled.div`
  margin-top: 40px;
  width: 100%;
`;

export const StyledLink = styled(Link)`
  cursor: pointer;
  border-radius: 15px;
  padding: 5px 15px;
  margin-right: 10px;
`;

export const StyledBadge = styled.span`
  background: ${(props) => THEME_CONFIG[props.theme].primaryColor};
  padding: 5px 10px;
  border-radius: 15px;
  margin-right: 10px;
  color: ${(props) => THEME_CONFIG[props.theme].secondaryColor};
`;

export const StyledPrimaryLink = styled(StyledLink)`
  ${(props) =>
    props.theme &&
    css`
      border: 1px solid ${THEME_CONFIG[props.theme].btnPrimaryColor};
      background: ${THEME_CONFIG[props.theme].btnPrimaryBg};
      color: ${THEME_CONFIG[props.theme].btnPrimaryColor};
    `}
`;

export const StyledSecondaryLink = styled(StyledLink)`
  ${(props) =>
    props.theme &&
    css`
      border: 1px solid ${THEME_CONFIG[props.theme].btnSecondaryColor};
      background: ${THEME_CONFIG[props.theme].btnSecondaryBg};
      color: ${THEME_CONFIG[props.theme].btnSecondaryColor};
    `}
`;