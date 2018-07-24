let GAME = require('../game')

let Commands = {}

Commands.moveCommand = function(direction) {
  return (entity) => entity.moveTo(direction)
}

Commands.transformCommand = function() {
  return (entity) => entity.transform()
}

Commands.changeScreenCommand = function(screen) {
  return () => GAME.setScreen(screen)
}

module.exports = Commands