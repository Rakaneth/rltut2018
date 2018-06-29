const ROT = require('rot-js')
const GAME = require('./game')
const TITLE = require('./screens/title')

window.onload = () => {
  GAME.register(TITLE)
  GAME.init()
  GAME.setScreen('title')
}

