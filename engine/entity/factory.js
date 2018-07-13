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

let creatures = {
  player: {
    name: 'Player',
    desc: 'The player',
    mixins: [baseMove, vision, smell, life, werewolf, wolfMusk]
  },
  bear: {
    name: 'bear',
    desc: 'A large bear',
    glyph: 'B',
    color: 'brown',
    smellDesc: 'Heavy fur and musk',
    mixins: [baseMove, vision, smell, life, stdDeath, musk]
  },
  deer: {
    name: 'deer',
    desc: 'A swift buck',
    glyph: 'D',
    color: 'goldenrod',
    smellDesc: 'Soft fur, light musk',
    mixins: [baseMove, vision, life, stdDeath, musk]
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
  return new ENTITY(temp)
}

module.exports = Factory