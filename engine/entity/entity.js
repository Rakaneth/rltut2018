let counter = 0

function Entity(opts) {
  this.x = 0
  this.y = 0
  this.glyph = opts.glyph || '@'
  this.color = opts.color || 'white'
  this.layer = opts.layer || 1
  this.name = opts.name || 'No name'
  this.desc = opts.desc || 'No description'
  this._mixins = {}
  this._groups = {}
  this.id = this.name + (counter++)
  let mixins = opts.mixins || [];
  for (let mixin of mixins) {
    for (let prop in mixin) {
      if (prop !== 'init' && prop !== 'name' && prop !== 'group' && !this.hasOwnProperty(prop)) {
        this[prop] = mixin[prop]
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

Entity.prototype.loc = function() {
  return {x: this.x, y: this.y}
}

module.exports = Entity