const {Noise, RNG} = require('rot-js')
const {TERRAIN, TILES} = require('./constants')
const UTILS = require ('./utils')
function Map(opts) {
  opts = opts || {}
  this.width = opts.width || 100
  this.height = opts.height || 100
  this.tiles = []
  for (let fy=0; fy < this.height; fy++) {
    this.tiles.push([])
    for (let fx=0; fx < this.width; fx++) {
      this.tiles[fy].push(0)
    }
  }
  let noise = new Noise.Simplex()

  for (let y=0; y<this.height; y++) {
    for (let x=0; x<this.width; x++) {
      let n = noise.get(x/100, y/100) * 100
      let choice
      if (UTILS.between(n, -20, 20)) {
        choice = TERRAIN.PATH
      } else if (n < -20) {
        choice = TERRAIN.LAKE
      } else {
        choice = TERRAIN.TREE
      }
      this.tiles[y][x] = choice
    }
  }
}

Map.prototype.getTile = function(x, y) {
  let val
  if (this.isOOB(x, y)) {
    val = 0
  } else {
    if (typeof(x) === 'object') {
      val = this.tiles[x.y][x.x]
    } else {
      val = this.tiles[y][x]
    }
  }
  return TILES[val]
}

Map.prototype.randomFloor = function() {
  let x, y
  do {
    x = RNG.getUniformInt(0, this.width)
    y = RNG.getUniformInt(0, this.height)
  } while (!this.getTile(x, y).walk)
  return {x, y}
}

Map.prototype.isOOB = function(x, y) {
  return !(UTILS.between(x, 0, this.width-1) && UTILS.between(y, 0, this.height-1))
}

module.exports = Map