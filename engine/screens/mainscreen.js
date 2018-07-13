const Screen = require('./screen')
const ROT = require('rot-js')
const GAME = require('../game')
const UTILS = require ('../utils')
const UI = require('../ui')
const CMDS = require ('../entity/command')

let Main = new Screen('main')

function cam(gameMap) {
  let calc = (p, m, s) => {
    return UTILS.clamp(p-s/2, 0, Math.max(0, m-s))
  }
  return {
    x: calc(GAME._player.x, gameMap.width, GAME.MAPW),
    y: calc(GAME._player.y, gameMap.height, GAME.MAPH)
  }
}

function toScreen(gameMap, mapX, mapY) {
  let c = cam(gameMap)
  return {x: mapX-c.x, y: mapY-c.y}
}

function toMap(gameMap, screenX, screenY) {
  let c = cam(gameMap)
  return {x: screenX+c.x, y: screenY+c.y}
}

function inView(screenX, screenY) {
  return UTILS.between(screenX, 0, GAME.MAPW-1) && UTILS.between(screenY, 0, GAME.MAPH-1)
}

Main.render = function(display) {
  let m = GAME._map
  let tile, s
  GAME._player.visibleThings = []
  m.fov.compute(GAME._player.x, GAME._player.y, 5, function(x, y, r, v) {
    tile = m.getTile(x, y)
    s = toScreen(m, x, y)
    if (tile.glyph && inView(s.x, s.y)) {
      display.draw(s.x, s.y, tile.glyph, tile.color)
    }
    GAME.thingsAt(x, y).forEach((thing => {
      GAME._player.visibleThings.push(thing)
    }))
  })

  let things = Object.values(GAME._things)
  things.sort((fst, snd) => fst.layer - snd.layer)
  things.forEach((thing) => {
    let s = toScreen(m, thing.x, thing.y)
    if (inView(s.x, s.y)) {
      if (GAME._player.canSee(thing)) {
        display.draw(s.x, s.y, thing.glyph, thing.color)
      } else if (GAME._player.canSmell(thing)) {
        display.draw(s.x, s.y, '*', thing.color)
      }
    }
  })
  UI.showMessages()
}

Main.cmds = {
  [ROT.VK_NUMPAD8]: CMDS.moveCommand(GAME._player, "N"),
  [ROT.VK_UP]: CMDS.moveCommand(GAME._player, "N"),
  [ROT.VK_NUMPAD9]: CMDS.moveCommand(GAME._player, "NE"),
  [ROT.VK_NUMPAD6]: CMDS.moveCommand(GAME._player, "E"),
  [ROT.VK_RIGHT]: CMDS.moveCommand(GAME._player, "E"),
  [ROT.VK_NUMPAD3]: CMDS.moveCommand(GAME._player, "SE"),
  [ROT.VK_NUMPAD2]: CMDS.moveCommand(GAME._player, "S"),
  [ROT.VK_DOWN]: CMDS.moveCommand(GAME._player, "S"),
  [ROT.VK_NUMPAD1]: CMDS.moveCommand(GAME._player, "SW"),
  [ROT.VK_NUMPAD4]: CMDS.moveCommand(GAME._player, "W"),
  [ROT.VK_LEFT]: CMDS.moveCommand(GAME._player, "W"),
  [ROT.VK_NUMPAD7]: CMDS.moveCommand(GAME._player, "NW"),
  [ROT.VK_T]: CMDS.transformCommand(GAME._player)
}

module.exports = Main