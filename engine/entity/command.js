let GAME = require('../game')

let Commands = {}

Commands.moveCommand = function(entity, direction) {
  return () => entity.moveTo(direction)
}

Commands.transformCommand = function(entity) {
  return () => entity.transform()
}

Commands.changeScreenCommand = function(screen) {
  return () => GAME.setScreen(screen)
}

module.exports = Commands