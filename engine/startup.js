let GAME = require('./game')
const TITLE = require('./screens/title')
const MAIN = require('./screens/mainscreen')
const {Display} = require('rot-js')
const FACTORY = require('./entity/factory')
const Map = require('./map')

window.onload = () => {
  GAME.register(TITLE, MAIN)
  GAME._display = new Display({width: GAME.MAPW, height: GAME.MAPH, fontSize: 12})
  let screen = document.getElementById("screen")
  screen.appendChild(GAME._display.getContainer())
  window.addEventListener("keydown", (e) => {
    GAME._curScreen.handleInput(e.keyCode, e.shiftKey)
    GAME.update()
  })
  window.addEventListener('click', (e) => {
    let [mx, my] = GAME._display.eventToPosition(e)
    GAME._curScreen.handleMouseClick(mx, my, e.button)
  })
  window.addEventListener('mouseover', (e) => {
    let [mx, my] = GAME._display.eventToPosition(e)
    GAME._curScreen.handleMouseover(mx, my)
  })
  GAME._map = new Map()
  let player = FACTORY.makeCreature('player')
  GAME.addEntity(player)
  GAME.seed(player)
  let choices = ['bear', 'deer', 'rabbit']
  for (let i=0; i<50; i++) {
    let animalBase = choices.random()
    let animal = FACTORY.makeCreature(animalBase)
    GAME.addEntity(animal)
    GAME.seed(animal)
  }
  GAME.setUp = true
  GAME.setScreen('title')
}

