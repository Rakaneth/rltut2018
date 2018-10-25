const Screen = require('./screen')
const ROT = require('rot-js')
const GAME = require('../game')
const UTILS = require ('../utils')
const UI = require('../ui')
const CMDS = require ('../entity/command')

let Main = new Screen('main')

Main.debug = false

function cam(gameMap) {
  let calc = (p, m, s) => {
    return UTILS.clamp(p-s/2, 0, Math.max(0, m-s))
  }
  return {
    x: calc(GAME.player.x, gameMap.width, GAME.MAPW),
    y: calc(GAME.player.y, gameMap.height, GAME.MAPH)
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
  GAME._huntMap.compute(GAME.player.loc)
  GAME.player.visibleThings = []
  m.fov.compute(GAME.player.x, GAME.player.y, 6, function(x, y, r, v) {
    tile = m.getTile(x, y)
    s = toScreen(m, x, y)
    if (tile.glyph && inView(s.x, s.y)) {
      if (Main.debug) {
        let v = GAME._huntMap.getValue(x, y)
        let dv = v > 9 ? '*' : v
        display.draw(s.x, s.y, dv, tile.color)
      } else {
        display.draw(s.x, s.y, tile.glyph, tile.color)
      }
    }
    GAME.thingsAt(x, y).forEach((thing => {
      GAME.player.visibleThings.push(thing)
    }))
  })

  let things = Object.values(GAME._things)
  things.sort((fst, snd) => fst.layer - snd.layer)
  things.forEach((thing) => {
    let s = toScreen(m, thing.x, thing.y)
    if (inView(s.x, s.y)) {
      if (GAME.player.canSee(thing)) {
        display.draw(s.x, s.y, thing.glyph, thing.color)
      } else if (GAME.player.canSmell(thing)) {
        display.draw(s.x, s.y, '*', thing.color)
      }
    }
  })

  UI.showMessages()
  UI.updateSeen(GAME.player.visibleThings)
  UI.updateBeast(GAME.player.beast)
}

Main.handleMouseover = function(mx, my) {
  if (mx > 0 && my > 0) {
    let w = toMap(GAME._map, mx, my)
    let things = GAME.thingsAt(w.x, w.y)
    if (things.length) {
      let toShow = things[0]
      UI.updateCursor(toShow, GAME.player.canSee(toShow))
    } else {
      UI.updateCursor(w)
    }
  }
}

Main.cmds = {
  [ROT.VK_NUMPAD8]: CMDS.moveCommand("N"),
  [ROT.VK_UP]: CMDS.moveCommand("N"),
  [ROT.VK_NUMPAD9]: CMDS.moveCommand("NE"),
  [ROT.VK_NUMPAD6]: CMDS.moveCommand("E"),
  [ROT.VK_RIGHT]: CMDS.moveCommand("E"),
  [ROT.VK_NUMPAD3]: CMDS.moveCommand("SE"),
  [ROT.VK_NUMPAD2]: CMDS.moveCommand("S"),
  [ROT.VK_DOWN]: CMDS.moveCommand("S"),
  [ROT.VK_NUMPAD1]: CMDS.moveCommand("SW"),
  [ROT.VK_NUMPAD4]: CMDS.moveCommand("W"),
  [ROT.VK_LEFT]: CMDS.moveCommand("W"),
  [ROT.VK_NUMPAD7]: CMDS.moveCommand("NW"),
  [ROT.VK_T]: CMDS.transformCommand()
}

module.exports = Main