//Game state
;
const {Display} = require('rot-js')

let GAME = {
  _curScreen: null,
  _screens: {},
  _player: {},
  _display: new Display({width: 50, height: 50, fontSize: 16}),
  update: function()  {
    this._display.clear()
    this._curScreen.render(this._display)
  },
  init: function(){
    g = this
    let screen = document.getElementById("screen")
    screen.appendChild(this._display.getContainer())
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