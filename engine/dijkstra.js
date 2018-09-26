function DMap(gMap, goals) {
  this._goals = goals || []
  this._map = gMap
  this._values = {}
}

DMap.prototype.setValue = function(x, y, v) {
  this._values[`${x},${y}`] = v
}

DMap.prototype.getValue = function(x, y) {
  let v = this._values[`${x},${y}`]
  return typeof(v) === 'undefined' ? 99999 : v
}

DMap.prototype.setGoal = function(x, y, clear) {
  if (clear) {
    this._goals = []
  }
  this._goals.push({x, y})
}

DMap.prototype.compute = function(...newGoals) {
  let opn = newGoals || this._goals.slice()
  let visited = {}
  this._values = {}
  for (let pt of opn) {
    this.setValue(pt.x, pt.y, 0)
  }
  let visit = (pt) => visited[`${pt.x},${pt.y}`] = true
  let hasVisited = (pt) => visited[`${pt.x},${pt.y}`]
  let d = 0
  while (opn.length > 0 && d < 20) {
    let nxt = opn.shift()
    for (let nei of this._map.neighbors(nxt.x, nxt.y)) {
      if (!hasVisited(nei)) {
        d = this.getValue(nxt.x, nxt.y) + 1
        if (d < this.getValue(nei.x, nei.y)) {
          this.setValue(nei.x, nei.y, d)
        }
        opn.push(nei)
        visit(nei)
      }
    }
  }
}


DMap.prototype.fleeMap = function() {
  let newMap = new DMap(this._map, this._goals)
  for (let v of Object.values(newMap._values)) {
    v *= -1.2
  }
  return newMap
}

DMap.prototype.getNext = function(x, y) {
  let neis = this._map.neighbors(x, y)
  let curValue = this.getValue(x, y)
  let cands = neis.filter(f => this.getValue(f.x, f.y) < curValue)
  if (cands.length > 0) {
    return cands.random()
  } else {
    return neis.random()
  }
}

module.exports = DMap