//Game state

const {Display} = require('rot-js')
const FACTORY = require('./entity/factory')
const UI = require('./ui')
const Map = require('./map')

let GAME = {
  _curScreen: null,
  _screens: {},
  _player: null,
  MAPW: 50,
  MAPH: 50,
  _display: null,
  _things: {},
  _map: {},
  setUp: false,
  update: function()  {
    this._display.clear()
    this._curScreen.render(this._display)
    UI.update('char-name', this._player.name)
    UI.update('char-desc', this._player.desc)
    UI.update('char-loc',  this._player.locString())
  },
  addEntity: function(entity) {
    this._things[entity.id] = entity
  },
  removeEntity: function(entity) {
    delete this._things[entity.id]
  },
  init: function(){
    g = this
    this._display = new Display({width: this.MAPW, height: this.MAPH, fontSize: 16})
    let screen = document.getElementById("screen")
    screen.appendChild(this._display.getContainer())
    window.addEventListener("keydown", (e) => {
      let action = g._curScreen.handleInput(e.keyCode, e.shiftKey)
      g.processAction(action, g._player)
    })
    this._player = FACTORY.makeCreature('player'),
    this._map = new Map()
    this.addEntity(this._player)
    let start = this._map.randomFloor()
    this._player.move(start.x, start.y)
    this.setUp = true
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
    if (this.setUp) { 
      this.update()
    }
  },
  processAction: function(action, entity) {
    if (action.move) {
      entity.moveTo(action.move)
      UI.addMessage(`${entity.name} moves to ${entity.locString()}`)
    } else if (action.screen) {
      this.setScreen(action.screen)
    } else if (action.shapeshift) {
      entity.transform()
    }
    this.update()
  },
  forEachThing: function(calbak) {
    for (let thing of Object.values(this._things)) {
      calbak(thing)
    }
  }
}

module.exports = GAME