let Mixins = {}
const {DIRS} = require ('../constants')
const UTILS = require('../utils')
const UI = require('../ui')

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

Mixins.vision = {
  name: 'vision',
  group: 'vision',
  canSee: function(entity) {
    return this.visibleThings.indexOf(entity) > -1
  },
  init: function() {
    this.visibleThings = []
  }
}

Mixins.smell = {
  name: 'smell',
  group: 'vision',
  canSmell: function(entity) {
    return UTILS.distancePts(this.loc, entity.loc) <= this.nosePower
  },
  init: function(opts) {
    this.nosePower = opts ? opts.nosePower : 5
  }
}

Mixins.life = {
  name: 'life',
  group: 'life',
  alive: true,
  takeDmg: function(amt, attacker) {
    this._hp = Math.max(0, this._hp - amt)
    if (this._hp == 0) {
      this.alive = false
      if (this.hasMixin('death')) {
        this.onDeath(attacker)
      }
    }
  },
  init: function(opts) {
    this._hp = opts ? opts.hp : 1
  }
}

Mixins.stdDeath = {
  name: 'stdDeath',
  group: 'death',
  onDeath: function(killer) {
    this.fireEvent('on-death', killer, true)
  }
}

Mixins.werewolf = {
  name: 'werewolf',
  group: 'werewolf',
  beast: 0,
  wolf: false,
  transform: function() {
    if (this.wolf) {
      this.color = 'white'
      this.wolf = false
    } else {
      this.beast += 1
      this.color = 'crimson'
      this.wolf = true
    }
    UI.addMessage(`${this.name} transforms to ${this.wolf ? 'beast' : 'human'} form.`)
  }
}

module.exports = Mixins