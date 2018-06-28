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
  console.log(`Keycode ${keyCode} pressed.${shift ? " Shift held down." : ""}`)
}

module.exports = Screen