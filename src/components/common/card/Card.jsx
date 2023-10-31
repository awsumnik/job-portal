import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { THEME_CONFIG } from '../../../constants';
import './Card.css';

const StyledCard = styled.div`
 border: 1px solid ${props => THEME_CONFIG[props.theme].borderColor};
`;

const Card = ({ style, children }) => {
  const theme = useSelector(state => state.theme);
  return (
    <StyledCard theme={theme} className="card" style={{ ...style }}>
      {children}
    </StyledCard>
  )
}

export default Card;