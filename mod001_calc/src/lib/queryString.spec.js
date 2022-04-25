const { queryString } = require('./queryString');

describe('Object to query string', () => {
  it('should create a valid query string when an object is provided', () => {
    const obj = {
      name: 'Bruno',
      profession: 'Developer',
    };

    expect(queryString(obj)).toBe('name=Bruno&profession=Developer');
  });
});

describe('Query string to object', () => {

});