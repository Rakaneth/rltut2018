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
    this.shiftCmds[keyCode]()
  } else if (this.cmds[keyCode]) {
    this.cmds[keyCode]()
  } else {
    console.log(`Unhandled key ${keyCode} on screen ${this.name}`)
  }
}

module.exports = Screen