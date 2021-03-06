let counter = 0

function Entity(opts) {
  opts = opts || {}
  this.x = 0
  this.y = 0
  this.glyph = opts.glyph || '@'
  this.color = opts.color || 'white'
  this.layer = opts.layer || 1
  this.name = opts.name || 'No name'
  this.desc = opts.desc || 'No description'
  this._mixins = {}
  this._groups = {}
  this._events = opts.events || {}
  this.id = this.name + (counter++)
  let mixins = opts.mixins || [];
  for (let mixin of mixins) {
    for (let prop in mixin) {
      if (prop !== 'init' && prop !== 'name' && prop !== 'group' && !this.hasOwnProperty(prop)) {
        let propDesc = Object.getOwnPropertyDescriptor(mixin, prop)
        if (propDesc.get) {
          Object.defineProperty(this, prop, propDesc)
        } else {
          this[prop] = mixin[prop]
        }
      }
    }
    this._mixins[mixin.name] = true
    this._groups[mixin.group] = true
    if (mixin.init) {
      mixin.init.call(this, opts)
    }
  }
}

Entity.prototype.hasMixin = function(mixin) {
  if (typeof(mixin) === 'object') {
    return this._mixins[mixin.name]
  } else {
    return this._mixins[mixin] || this._groups[mixin]
  }
}

Entity.prototype.locString = function() {
  return `(${this.x},${this.y})`
}

Object.defineProperty(Entity.prototype, 'loc', {
  get: function() { return {x: this.x, y: this.y}},
  set: function(pt) { 
    this.x = pt.x
    this.y = pt.y
  }
})

Entity.prototype.fireEvent = function(event, ...args) {
  if (this._events[event]) {
    this._events[event].call(this, ...args)
  } else {
    throw new Error(`Event ${event} doesn't exist for entity ${this.id}`)
  }
}

module.exports = Entity