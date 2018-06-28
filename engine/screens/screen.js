function Screen(name) {
  this.name = name
}

Screen.prototype.enter = () => {
  console.log(`Entered ${this.name} screen.`)
}

Screen.prototype.exit = () => {
  console.log(`Exited ${this.name} screen.`)
}

Screen.prototype.render = () => {
  console.log(`Please implement render method for ${this.name} screen.`)
}

Screen.prototype.handleInput = (keyCode, shift) => {
  console.log(`Keycode ${keyCode} pressed.${shift ? " Shift held down." : ""}`)
}

module.exports = Screen