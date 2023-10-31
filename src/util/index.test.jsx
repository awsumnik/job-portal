import { getParsedObjectValue } from './';

describe('Test utils', () => {
  test('Returns an array of items from a comma separated string', () => {
    const outputArray =  getParsedObjectValue('React,Angular');
    expect(outputArray).toEqual(['React', 'Angular']);
  });
});