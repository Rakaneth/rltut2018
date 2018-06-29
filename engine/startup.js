const GAME = require('./game')
const TITLE = require('./screens/title')
const MAIN = require('./screens/mainscreen')

window.onload = () => {
  GAME.register(TITLE, MAIN)
  GAME.init()
  GAME.setScreen('title')
}

