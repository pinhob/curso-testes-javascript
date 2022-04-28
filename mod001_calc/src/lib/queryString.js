const keyValueToString = ([key, value]) => {
  if (typeof (value) === 'object' && !Array.isArray(value)) throw new Error('Check your inputs');

  return `${key}=${value}`
}

export function queryString(obj) {
  return Object.entries(obj)
    .map(keyValueToString)
    .join('&');
};

export function parse(string) {
  const entries = string.split('&');

  const queries = entries.map((entry) => {
    let [key, value] = entry.split('=');

    if (value.indexOf(',') > -1) {
      value = value.split(',');
    }

    return [key, value];
  });

  return Object.fromEntries(queries);
}
