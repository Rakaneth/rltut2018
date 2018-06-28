//Game state

const Title = require('./screens/title')

let GAME = {
  _curScreen: null,
  _screens: {},
  _player: {},
  update: function()  {
    this._curScreen.render()
  },
  init: function(){
    g = this
    window.addEventListener("keydown", (e) => {
      g._curScreen.handleInput(e.keyCode, e.shiftKey)
    })
  },
  register: function(...screens) {
    for (let screen of screens) {
      this._screens[screen.name] = screen
    }
  },
  setScreen: function(screenName) {
    if (this._curScreen) {
      this._curScreen.exit()
    }
    this._curScreen = this._screens[screenName]
    this._curScreen.enter()
    this.update()
  }
}

module.exports = GAME