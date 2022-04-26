const keyValueToString = ([key, value]) => {
  if (typeof (value) === 'object' && !Array.isArray(value)) throw new Error('Check your inputs');

  return `${key}=${value}`
}

module.exports.queryString = (obj) => Object.entries(obj)
  .map(keyValueToString)
  .join('&');;

module.exports.parse = (string) => {
  const entries = string.split('&');
  const queries = entries.map((entry) => entry.split('='));

  return Object.fromEntries(queries);
};
