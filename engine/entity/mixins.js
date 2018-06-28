let Mixins = {}
const {DIRS} = require ('../constants')

Mixins.baseMove = {
  name: 'baseMove',
  group: 'move',
  move: function(x, y) {
    this.x = x
    this.y = y
  },
  moveTo: function(direction) {
    let delta = DIRS[direction]
    this.move(this.x + delta[0], this.y + delta[1])
  }
}

module.exports = Mixins