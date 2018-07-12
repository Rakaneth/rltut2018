const {baseMove, vision, smell, life, stdDeath, werewolf} = require('./mixins')
const ENTITY = require('./entity')

let creatures = {
  player: {
    name: 'Player',
    desc: 'The player',
    mixins: [baseMove, vision, smell, life, werewolf]
  },
  bear: {
    name: 'bear',
    desc: 'A large bear',
    smellDesc: 'Heavy fur and musk',
    mixins: [baseMove, vision, smell, life, stdDeath]
  },
  deer: {
    name: 'deer',
    desc: 'A swift buck',
    smellDesc: 'Soft fur, light musk',
    mixins: [baseMove, vision, life, stdDeath]
  }
}

let Factory = {}

Factory.makeCreature = function(template) {
  return new ENTITY(creatures[template])
}

module.exports = Factory