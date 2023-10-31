import React, { useState } from 'react';
import isEmpty from 'lodash.isempty';
import './Input.css';
import { REGEX_PATTERNS } from '../../../constants';

const Input = ({
  type,
  label,
  name,
  onChange,
  placeholder,
  value,
  isReadonly,
  isRequired,
  isEmail,
  isPassword,
  helperText,
  minLength,
  maxLength,
  pattern,
  minValue,
  maxValue,
  step,
  onError,
  autoFocus,
}) => {
  const [error, setError] = useState('');

  const hasError = (errorText) => {
    setError(errorText);
    onError && onError({[name]: !isEmpty(errorText)});
  }

  const validateField = (event) => {
    const inputValue = event.target.value;
    if(isRequired && isEmpty(inputValue)) {
      hasError(`${label} is a required field.`);
      return;
    }

    if(minLength && inputValue.length < minLength) {
      hasError(`${label} should be minimum ${minLength} characters in length.`);
      return;
    }

    if(maxLength && inputValue.length > maxLength) {
      hasError(`${label} shouldn't be greater than ${maxLength} characters in length.`);
      return;
    }

    if(minValue && +inputValue < minValue) {
      hasError(`${label} should be greater than ${minValue}.`);
      return;
    }

    if(maxValue && +inputValue > maxValue) {
      hasError(`${label} should be less than ${maxValue}.`);
      return;
    }

    if(isEmail && !REGEX_PATTERNS.EMAIL.test(inputValue)) {
      hasError(`Enter a valid Email.`);
      return;
    }

    if(isPassword && !REGEX_PATTERNS.PASSWORD.test(inputValue)) {
      hasError(`Password should have atleast 1 uppercase, lowercase, digit and special character.`);
      return;
    }

    if(pattern && !pattern.test(inputValue)) {
      hasError(`Enter a valid ${label}.`);
      return;
    }
    hasError('');
  };

  return (
    <div className={`form-group`}>
      <label htmlFor={name}>
        {label}
        { helperText && (` ${helperText}`)}
        { isRequired && <span className='required-star'>*</span>}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        placeholder={placeholder}
        className={`form-input`}
        onChange={onChange}
        value={value}
        readOnly={isReadonly}
        onBlur={validateField}
        step={step}
        autoFocus={autoFocus}
        required={isRequired}
        aria-label={label}
        aria-required={isRequired}
      />
      {!isEmpty(error) && (
        <span className='error-text'>{error}</span>
      )}
    </div>
  );
};

export default Input;
