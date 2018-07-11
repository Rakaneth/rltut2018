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

//King's move distance

UTILS.distance = function(x1, y1, x2, y2) {
  return Math.max(Math.abs(x1-x2), Math.abs(y1-y2))
}

UTILS.distancePts = function(ptA, ptB) {
  return this.distance(ptA.x, ptA.y, ptB.x, ptB.y)
}

module.exports = UTILS