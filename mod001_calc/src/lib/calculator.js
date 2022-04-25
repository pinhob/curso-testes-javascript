module.exports.sum = (num1, num2) => {
  const int1 = parseInt(num1, 10);
  const int2 = parseInt(num2, 10);

  if (isNaN(int1) || isNaN(int2)) throw new Error('Check your input');

  return int1 + int2;
};
