import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { THEME_CONFIG } from '../../../constants';

const StyledButton = styled.button`
  background: ${props => props.isPrimary ? THEME_CONFIG[props.theme].btnPrimaryBg : THEME_CONFIG[props.theme].btnSecondaryBg};
  color: ${props => props.isPrimary ? THEME_CONFIG[props.theme].btnPrimaryColor : THEME_CONFIG[props.theme].btnSecondaryColor};
  border-radius: 10px;
  padding: 5px 10px;
  cursor: pointer;
  border-radius: 15px;
  min-width: 100px;
`;

const Button = ({
  type,
  label,
  name,
  onClick,
  priority,
  isDisabled,
  alignDirection
}) => {
  const theme = useSelector(state => state.theme);
  return (
    <div style={{ display: 'flex', justifyContent: alignDirection || 'center' }}>
      <StyledButton
        type={type}
        id={name}
        name={name}
        onClick={onClick}
        className={`form-button`}
        disabled={isDisabled}
        isPrimary={priority === 'primary'}
        theme={theme}
      >
        {label}
      </StyledButton>
    </div>
  )
}

export default Button;