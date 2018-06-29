const Screen = require('./screen')
const GAME = require('../game')

let Title = new Screen('title')

function drawCenter(display, y, text) {
  display.drawText((GAME.MAPW - text.length)/2, y,text, GAME.MAPW)
}

Title.render = function(display) {
  drawCenter(display, 10, "Werewolf")
  drawCenter(display, 11, "by Rakaneth")
  drawCenter(display, 13, "RoguelikeDev Does the Roguelike Tutorial 2018")
}

Title.handleInput = function() {
  return {screen: 'main'}
}

module.exports = Title