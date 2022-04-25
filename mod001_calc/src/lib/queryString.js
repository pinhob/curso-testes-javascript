const keyValueToString = ([key, value]) => {
  if (typeof (value) === 'object' && !Array.isArray(value)) throw new Error('Check your inputs');

  return `${key}=${value}`
}

module.exports.queryString = (obj) => Object.entries(obj)
  .map(keyValueToString)
  .join('&');;
