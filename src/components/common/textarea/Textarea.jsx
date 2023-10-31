import React, { useState } from 'react';
import isEmpty from 'lodash.isempty';
import '../input/Input.css';

const Textarea = ({
  label,
  name,
  placeholder,
  rows = 5,
  onChange,
  value,
  isRequired,
  minLength,
  maxLength,
}) => {

  const [error, setError] = useState('');

  const validateField = (event) => {
    const inputValue = event.target.value;
    if(isRequired && isEmpty(inputValue)) {
      setError(`${label} is a required field.`);
      return;
    }

    if(minLength && inputValue.length < minLength) {
      setError(`${label} should be minimum ${minLength} characters in length.`);
      return;
    }

    if(maxLength && inputValue.length > maxLength) {
      setError(`${label} shouldn't be greater than ${maxLength} characters in length.`);
      return;
    }

    setError('');
  };

  return (
    <div className={`form-group`}>
      <label htmlFor={name}>{label}{ isRequired && <span className='required-star'>*</span>}</label>
      <textarea
        id={name}
        name={name}
        placeholder={placeholder}
        className={`form-input`}
        rows={rows}
        onChange={onChange}
        value={value}
        onBlur={validateField}
        required={isRequired}
        aria-label={label}
        aria-required={isRequired}
      ></textarea>
      {!isEmpty(error) && (
        <span className='error-text'>{error}</span>
      )}
    </div>
  )
}

export default Textarea;
