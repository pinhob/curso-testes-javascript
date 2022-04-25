module.exports.queryString = (obj) => {
  const queries = Object.entries(obj).map(([key, value]) => `${key}=${value}`);

  return queries.join('&');
};
