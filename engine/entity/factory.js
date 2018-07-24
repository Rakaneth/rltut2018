const {
  baseMove, 
  vision, 
  smell, 
  life, 
  stdDeath, 
  werewolf, 
  musk, 
  wolfMusk
} = require('./mixins')
const ENTITY = require('./entity')
const GAME = require ('../game')
const UI = require('../ui')

let baseMoveEvt = function(x, y) {
  let stuff = GAME.thingsAt(x, y)
  if (stuff.size > 0) {
    stuff.forEach(thing => {
      this.fireEvent('interact', thing)
    })
    return true
  } else if (GAME._map.getTile(x, y).walk) {
    this.x = x
    this.y = y
    return true
  } else {
    return false
  }
}

let testInteract = function(entity) {
  UI.addMessage(`${this.name} bumped into ${entity.name}`)
}

let creatures = {
  player: {
    name: 'Player',
    desc: 'The player',
    mixins: [baseMove, vision, smell, life, werewolf, wolfMusk],
    events: {
      move: baseMoveEvt,
      interact: testInteract
    }
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
    mixins: [baseMove, vision, smell, life, stdDeath, musk],
    events: {
      move: baseMoveEvt
    }
  },
  deer: {
    name: 'deer',
    desc: 'A swift buck',
    glyph: 'D',
    color: 'goldenrod',
    smellDesc: 'Soft fur, light musk',
    stench: 3,
    mixins: [baseMove, vision, life, stdDeath, musk],
    events: {
      move: baseMoveEvt
    }
  },
  rabbit: {
    name: 'rabbit',
    desc: 'A small rabbit',
    glyph: 'R',
    color: 'white',
    smellDesc: 'Earth and extremely light musk',
    stench: 1,
    events: {
      move: baseMoveEvt
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