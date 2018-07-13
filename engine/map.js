const {Noise, RNG, FOV} = require('rot-js')
const {TERRAIN, TILES} = require('./constants')
const UTILS = require ('./utils')
function Map(opts) {
  opts = opts || {}
  this.width = opts.width || 100
  this.height = opts.height || 100
  this.tiles = []
  this.regions = {}
  this.curRegion = 1
  let noise = new Noise.Simplex()
  this.fov = new FOV.RecursiveShadowcasting((x, y) => !this.isRegionBorder(x, y))

  for (let y=0; y<this.height; y++) {
    this.tiles.push([])
    for (let x=0; x<this.width; x++) {
      let n = noise.get(x/this.width, y/this.height) * 100
      let choice
      if (UTILS.between(n, -80, -60)) {
        choice = TERRAIN.PATH
      } else if (n < -80) {
        choice = TERRAIN.LAKE
      } else {
        choice = TERRAIN.TREE
      }
      this.tiles[y].push(choice)
    }
  }

  for (let ry=0; ry<this.height; ry++) {
    for (let rx=0; rx<this.width; rx++) {
      if (this.getRegion(rx, ry) === 0 && this.getTile(rx, ry).walk) {
        this._floodFill(rx, ry, this.curRegion++)
      }
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

Map.prototype.neighbors = function(x, y) {
  let minX = Math.max(0, x-1)
  let maxX = Math.min(this.width-1, x+1)
  let minY = Math.max(0, y-1)
  let maxY = Math.min(this.height-1, y+1)
  let results = []
  for (let xs=minX; xs<= maxX; xs++) {
    for (let ys=minY; ys<=maxY; ys++) {
      let notSelf = (xs != x || ys != y)
      let canWalk = this.getTile(xs, ys).walk
      if (notSelf && canWalk) {
        results.push({x: xs, y: ys})
      }
    }
  }
  return results
}

Map.prototype.getRegion = function(x, y) {
  let key = `${x},${y}`
  if (this.regions[key]) {
    return this.regions[key]
  } else {
    return 0
  }
}

Map.prototype.setRegion = function(x, y, region) {
  let key = `${x},${y}`
  this.regions[key] = region
}

Map.prototype._floodFill = function(x, y, region) {
  let open = [{x, y}]
  this.setRegion(x, y, region)
  while (open.length > 0) {
    let nxt = open.pop()
    for (let nei of this.neighbors(nxt.x, nxt.y)) {
      let nxtTile = this.getTile(nxt.x, nxt.y).region
      let curTile = this.getTile(nei.x, nei.y).region
      if (nxtTile !== curTile) {
        continue
      }
      if (this.getRegion(nei.x, nei.y) === 0) {
        this.setRegion(nei.x, nei.y, region)
        open.push({x: nei.x, y: nei.y})
      }
    }
  }
}

Map.prototype.isRegionBorder = function(x, y) {
  return this.neighbors(x, y).some(p => {
    return this.getRegion(p.x, p.y) !== this.getRegion(x, y) && 
    this.getRegion(x, y) > 0 &&
    this.getRegion(p.x, p.y) > 0
  }) && this.getTile(x, y).region === 'forest'
}


module.exports = Map