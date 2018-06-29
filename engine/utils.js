let UTILS = {}

UTILS.clamp = function(val, lower, upper) {
  if (val < lower) {
    return lower
  } else  if (val > upper) {
    return upper
  } else {
    return val
  }
}

UTILS.between = function(val, lower, upper) {
  return this.clamp(val, lower, upper) === val
}

module.exports = UTILS