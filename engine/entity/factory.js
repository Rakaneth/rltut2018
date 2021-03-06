const {
  baseMove, 
  vision, 
  smell, 
  life, 
  werewolf, 
  musk, 
  wolfMusk,
  foodChain,
  inventory,
  player
} = require('./mixins')
const ENTITY = require('./entity')
const GAME = require ('../game')
const UI = require('../ui')

let baseMoveEvt = function(x, y) {
  let stuff = GAME.thingsAt(x, y)
  if (stuff.length > 0) {
    stuff.forEach(thing => {
      this.fireEvent('interact', thing)
    })
    return true
  } else if (GAME._map.getTile(x, y).walk) {
    this.loc = {x, y}
    return true
  } else {
    return false
  }
}

let testInteract = function(entity) {
  UI.addMessage(`${this.name} bumped into ${entity.name}`)
}

let predatorInteract = function(entity) {
  if (entity.hasMixin('food-chain') && this.isPredator(entity)) {
    entity.takeDmg(1, this)
    if (!entity.alive) {
      UI.addMessage(`${this.name} devours the ${entity.name}.`)
    }
  }
}

let baseDeath = function(killer) {
  UI.addMessage(`${killer.name} has slain the ${this.name}.`)
  GAME.removeEntity(this)
}

let basePickup = function(item) {
  if (this.bagsFull && this.isPlayer) {
    UI.addMessage(`Cannot pick up ${item.name}; drop other items first.`)
  } else if (!this.bagsFull) {
    this.inventory.push(item)
    if (this.isPlayer) {
      UI.addMessage(`You pick up the ${item.name}.`)
    } else if (GAME.playerVisible(this)) {
      UI.addMessage(`${this.name} picks up ${item.name}.`)
    }
    GAME.removeEntity(item)
  }
}

let baseDrop = function(item) {
  this.inventory = this.inventory.filter(i => i.id !== item.id)
  item.x = this.x
  item.y = this.y
  let toWrite
  if (this.isPlayer) {
    toWrite = `You drop the ${item.name}.`
  } else if (GAME.playerVisible(this)) {
    toWrite = `${this.name} drops the ${item.name}.`
  }
  GAME.addEntity(item)
  UI.addMessage(toWrite)
}

let creatures = {
  player: {
    name: 'Player',
    desc: 'The player',
    mixins: [
      baseMove, 
      vision, 
      smell, 
      life, 
      werewolf, 
      wolfMusk, 
      foodChain, 
      inventory,
      player
    ],
    events: {
      move: baseMoveEvt,
      interact: predatorInteract,
      pickup: basePickup,
      drop: baseDrop,
    },
    chainLevel: 3
  },
  bear: {
    name: 'bear',
    desc: 'A large bear',
    glyph: 'B',
    color: 'brown',
    smellDesc: 'Heavy fur and musk',
    stench: 4,
    hp: 2,
    speed: 3,
    dmg: 1,
    mixins: [
      baseMove, 
      vision, 
      smell, 
      life, 
      musk, 
      foodChain
    ],
    events: {
      move: baseMoveEvt,
      death: baseDeath
    },
    chainLevel: 2
  },
  deer: {
    name: 'deer',
    desc: 'A swift buck',
    glyph: 'D',
    color: 'goldenrod',
    smellDesc: 'Soft fur, light musk',
    stench: 3,
    mixins: [
      baseMove, 
      vision, 
      life, 
      musk, 
      foodChain
    ],
    events: {
      move: baseMoveEvt,
      death: baseDeath
    }
  },
  rabbit: {
    name: 'rabbit',
    desc: 'A small rabbit',
    glyph: 'R',
    color: 'white',
    smellDesc: 'Earth and extremely light musk',
    stench: 1,
    mixins: [
      baseMove, 
      vision, 
      life, 
      musk, 
      foodChain
    ],
    events: {
      move: baseMoveEvt,
      death: baseDeath
    }
  }
}

let Factory = {}

Factory.makeCreature = function(template) {
  let temp = creatures[template]
  if (template === 'player') {
    temp.layer = 3
  } else {
    temp.layer = 2
  }
  let foetus = new ENTITY(temp)
  if (template === 'player') {
    foetus.id = 'player'
  }
  return foetus
}

module.exports = Factory