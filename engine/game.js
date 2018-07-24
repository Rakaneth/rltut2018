//Game state
const UI = require('./ui')
const Entity = require('./entity/entity')

let GAME = {
  _curScreen: null,
  _screens: {},
  MAPW: 50,
  MAPH: 50,
  _display: null,
  _things: {},
  _map: {},
  setUp: false,
  update: function()  {
    this._display.clear()
    this._curScreen.render(this._display)
    UI.update('char-name', this.player.name)
    UI.update('char-desc', this.player.desc)
    UI.update('char-loc',  this.player.locString())
  },
  addEntity: function(entity) {
    this._things[entity.id] = entity
  },
  removeEntity: function(entity) {
    delete this._things[entity.id]
  },
  init: function(){

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
  },
  get player() {
    return this._things['player']
  }
}

module.exports = GAME