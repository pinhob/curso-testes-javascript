import { queryString, parse } from './queryString';

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
  it('should convert a query string to object ', () => {
    const queryString = 'name=Bruno&profession=Developer';

    expect(parse(queryString)).toEqual({
      name: 'Bruno',
      profession: 'Developer',
    });
  });

  it('should convert a query string of a single key-value pair to object ', () => {
    const queryString = 'name=Bruno';

    expect(parse(queryString)).toEqual({
      name: 'Bruno',
    });
  });

  it('should convert a query string to object taking care of comma separated values', () => {
    const queryString = 'name=Bruno&techs=JS,Jest';

    expect(parse(queryString)).toEqual({
      name: 'Bruno',
      techs: ['JS', 'Jest'],
    });
  });
});
