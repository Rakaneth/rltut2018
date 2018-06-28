//Game state

const Title = require('./screens/title')

let GAME = {}

GAME._curScreen = null
GAME._screens = {}
GAME.player = {}
GAME.update = () => {
  this._curScreen.render()
}
GAME.init = () => {
  g = this
  window.addEventListener("keydown", (e) => {
    g._curScreen.handleInput(e.keyCode, e.shiftKey)
  })
}
GAME.register = (...screens) => {
  for (let screen of screens) {
    this._screens[screen.name] = screen
  }
}
GAME.setScreen = (screenName) => {
  if (this._curScreen) {
    this._curScreen.exit()
  }
  this._curScreen = this.screens[screenName]
  this._curScreen.enter()
  this.update()
}

module.exports = GAME