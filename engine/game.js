//Game state

const {Display} = require('rot-js')
const FACTORY = require('./entity/factory')
const UI = require('./ui')
const Map = require('./map')

let GAME = {
  _curScreen: null,
  _screens: {},
  _player: FACTORY.makeCreature('player'),
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
    this._display = new Display({width: this.MAPW, height: this.MAPH, fontSize: 12})
    let screen = document.getElementById("screen")
    screen.appendChild(this._display.getContainer())
    window.addEventListener("keydown", (e) => {
      g._curScreen.handleInput(e.keyCode, e.shiftKey)
      g.update()
    })
    this._map = new Map()
    this.addEntity(this._player)
    this.seed(this._player)
    let choices = ['bear', 'deer']
    for (let i=0; i<50; i++) {
      let animalBase = choices.random()
      let animal = FACTORY.makeCreature(animalBase)
      this.addEntity(animal)
      this.seed(animal)
    }
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
  forEachThing: function(calbak) {
    for (let thing of Object.values(this._things)) {
      calbak(thing)
    }
  },
  seed: function(entity) {
    let start = this._map.randomFloor()
    entity.x = start.x
    entity.y = start.y
  },
  thingsAt: function(x, y) {
    return Object.values(this._things).filter(thing => thing.x === x && thing.y === y)
  }
}

module.exports = GAME