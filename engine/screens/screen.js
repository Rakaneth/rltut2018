let GAME = require('../game')

function Screen(name) {
  this.name = name
}

Screen.prototype.enter = function() {
  console.log(`Entered ${this.name} screen.`)
}

Screen.prototype.exit = function() {
  console.log(`Exited ${this.name} screen.`)
}

Screen.prototype.render = function(display) {
  display.drawText(0, 0, `Please implement render method for ${this.name} screen.`)
}

Screen.prototype.handleInput = function(keyCode, shift) {
  if (shift && this.shiftCmds && this.shiftCmds[keyCode]) {
    this.shiftCmds[keyCode](GAME.player)
  } else if (this.cmds[keyCode]) {
    this.cmds[keyCode](GAME.player)
  } else {
    console.log(`Unhandled key ${keyCode} on screen ${this.name}`)
  }
}

Screen.prototype.handleMouseover = function(mx, my) {}

Screen.prototype.handleMouseClick = function(mx, my, btn) {
  console.log(`Button ${btn} pressed at ${mx},${my}`)
}

module.exports = Screen