const { queryString } = require('./queryString');

describe('Object to query string', () => {
  it('should create a valid query string when an object is provided', () => {
    const obj = {
      name: 'Bruno',
      profession: 'Developer',
    };

    expect(queryString(obj)).toBe('name=Bruno&profession=Developer');
  });

  it('should create a valid query string even when an array is passed as value', () => {
    const obj = {
      name: 'Bruno',
      techs: ['JS', 'Jest'],
    };

    expect(queryString(obj)).toBe('name=Bruno&techs=JS,Jest');
  });

  it('should throw an error when an object is passed as value', () => {
    const obj = {
      name: 'Bruno',
      techs: {
        techs: ['JS', 'Jest'],
      },
    };

    expect(() => queryString(obj)).toThrowError();
  });
});

describe('Query string to object', () => {

});