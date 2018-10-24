//Game state
const UI = require('./ui')
const Entity = require('./entity/entity')
const ROT = require('rot-js')

let GAME = {
  _curScreen: null,
  _screens: {},
  MAPW: 50,
  MAPH: 50,
  _display: null,
  _things: {},
  _map: {},
  _fleeMap: {},
  _huntMap: {},
  _rangeMap: {},
  setUp: false,
  scheduler: null,
  engine: null,
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
    this.unschedule(entity)
    delete this._things[entity.id]
  },
  initEngine: function() {
    this.scheduler = new ROT.Scheduler.Speed()
    this.engine = new ROT.Engine(this.scheduler)
  },
  schedule: function(entity) {
    this.scheduler.add(entity, true)
  },
  unschedule: function(entity) {
    this.scheduler.remove(entity)
  },
  pause: function() {
    this.engine.pause()
  },
  resume: function() {
    this.engine.resume()
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
    entity.loc = this._map.randomFloor()
  },
  thingsAt: function(x, y) {
    return Object.values(this._things).filter(thing => thing.x === x && thing.y === y)
  },
  get player() {
    return this._things['player']
  },
  playerVisible(entity) {
    return this.player.canSee(entity)
  }
}

module.exports = GAME