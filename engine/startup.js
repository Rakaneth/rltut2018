const ROT = require('rot-js')
const GAME = require('./game')
const TITLE = require('./screens/title')

window.onload = () => {
  let screen = document.getElementById("screen")
  let display = new ROT.Display({width: 80, height: 40, fontSize: 16})
  screen.appendChild(display.getContainer())
  GAME.register(TITLE)
  GAME.setScreen('title')
  GAME.init()
  GAME.update()
}

