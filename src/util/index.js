import messages from '../nls/en.json';

export const getParsedObjectValue = (inputString) => {
  return inputString
      .split(',')
      .map(element => element.trim())
      .filter(element => element !== '');
};

export const getCurrentDateTime = () => {
  return new Date().toJSON().slice(0, 19).replace('T', ' ');
};

export const handleNetworkError = (error) => {
  console.error(messages.SERVER_DOWN, error);
};