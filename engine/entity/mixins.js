let Mixins = {}
const {DIRS} = require ('../constants')
const UTILS = require('../utils')
const UI = require('../ui')

Mixins.baseMove = {
  name: 'baseMove',
  group: 'move',
  tryMove: function(x, y) {
    this.fireEvent('move', x, y)
  },
  moveTo: function(direction) {
    let delta = DIRS[direction]
    this.tryMove(this.x + delta[0], this.y + delta[1])
  }
}

Mixins.player =  {
  name: 'player',
  group: 'actor',
  isPlayer: true
}

Mixins.vision = {
  name: 'vision',
  group: 'vision',
  visibleThings: [],
  canSee: function(entity) {
    return this.visibleThings.indexOf(entity) > -1
  }
}

Mixins.smell = {
  name: 'smell',
  group: 'vision',
  canSmell: function(entity) {
    let stench = entity.hasMixin('musk') ? entity.stench : 0
    return !!stench && (UTILS.distancePts(this.loc(), entity.loc()) <= this.nosePower + stench)
  }
}

Mixins.musk = {
  name: 'musk',
  group: 'musk',
  init: function(opts) {
    this.smellDesc = opts.smellDesc || "No scent in particular."
    this.stench = opts.stench || 1
  }
}

Mixins.wolfMusk = {
  name: 'wolf-musk',
  group: 'musk',
  get stench() {
    return 2 + this.beastBonus
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
      this.fireEvent('death', attacker)
    }
  },
  init: function(opts) {
    this._hp = opts.hp || 1
  }
}

Mixins.werewolf = {
  name: 'werewolf',
  group: 'werewolf',
  beast: 20,
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
  },
  get beastBonus() {
    return this.wolf ? Math.floor(this.beast / 10) : 0
  },
  get nosePower() {
    return 5 + this.beastBonus
  }
}

Mixins.foodChain = {
  name: 'food-chain',
  group: 'food-chain',
  isPredator: function(entity) {
    return this.chainLevel > entity.chainLevel
  },
  init: function(opts) {
    this.chainLevel = opts.chainLevel || 0
  }
}

Mixins.inventory = {
  name: 'inventory',
  group: 'inventory',
  get bagsFull() {
    return !this.inventory || this.inventory.length >= this.capacity
  },
  pickUp: function(item) {
    this.fireEvent('pickup', item)
  },
  drop: function(item) {
    this.fireEvent('drop', item)
  },
  init: function(opts) {
    this.inventory = opts.inventory || []
    this.capacity = opts.capacity || 2
  }
}

module.exports = Mixins