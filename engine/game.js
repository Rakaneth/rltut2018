//Game state
;
const {Display} = require('rot-js')
const {baseMove} = require('./entity/mixins')
const Entity = require ('./entity/entity')

let GAME = {
  _curScreen: null,
  _screens: {},
  _player: {},
  _display: new Display({width: 50, height: 50, fontSize: 16}),
  _things: {},
  update: function()  {
    this._display.clear()
    this._curScreen.render(this._display)
  },
  addEntity: function(entity) {
    this._things[entity.id] = entity
  },
  removeEntity: function(entity) {
    delete this._things[entity.id]
  },
  init: function(){
    g = this
    let screen = document.getElementById("screen")
    screen.appendChild(this._display.getContainer())
    window.addEventListener("keydown", (e) => {
      let action = g._curScreen.handleInput(e.keyCode, e.shiftKey)
      g.processAction(action, g._player)
    })
    this._player = new Entity({
      name: 'player',
      desc: 'The player.',
      mixins: [baseMove]
    })
    this.addEntity(this._player)
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
  },
  processAction(action, entity) {
    if (action.move) {
      entity.moveTo(action.move)
    }
    this.update()
  }
}

module.exports = GAME