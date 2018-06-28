const Screen = require('./screen')
const ROT = require('rot-js')
const GAME = require('../game')

let Title = new Screen('title')

Title.render = function(display) {
  for (let id in GAME._things) {
    let thing = GAME._things[id]
    display.draw(thing.x, thing.y, thing.glyph)
  }
}

Title.handleInput = function(keyCode, shift) {
  switch (keyCode) {
    case ROT.VK_NUMPAD8:
    case ROT.VK_UP:
      return {move: "N"}
    case ROT.VK_NUMPAD9:
      return {move: "NE"}
    case ROT.VK_NUMPAD6:
    case ROT.VK_RIGHT:
      return {move: "E"}
    case ROT.VK_NUMPAD3:
      return {move: "SE"}
    case ROT.VK_NUMPAD2:
    case ROT.VK_DOWN:
      return {move: "S"}
    case ROT.VK_NUMPAD1:
      return {move: "SW"}
    case ROT.VK_NUMPAD4:
    case ROT.VK_LEFT:
      return {move: "W"}
    case ROT.VK_NUMPAD7:
      return {move: "NW"}
    default:
      return {move: "NONE"}
  }
}

module.exports = Title