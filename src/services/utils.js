const formatDecimal = function(num, decimal) {
  num = num.toString();
  var index = num.indexOf(".");
  if (index !== -1) {
    num = num.substring(0, decimal + index + 1);
  } else {
    num = num.substring(0);
  }
  return parseFloat(num).toFixed(decimal);
};

export { formatDecimal };
