const Screen = require('./screen')
const GAME = require('../game')
const ROT = require('rot-js')
const {changeScreenCommand} = require('../entity/command')

let Title = new Screen('title')

function drawCenter(display, y, text) {
  display.drawText((GAME.MAPW - text.length)/2, y,text, GAME.MAPW)
}

Title.render = function(display) {
  drawCenter(display, 10, "Werewolf")
  drawCenter(display, 11, "by Rakaneth")
  drawCenter(display, 13, "RoguelikeDev Does the Roguelike Tutorial 2018")
  drawCenter(display, 14, "Press %c{yellow}[Enter]%c{} to start")
}

Title.cmds = {
  [ROT.VK_ENTER]: changeScreenCommand('main'),
  [ROT.VK_RETURN]: changeScreenCommand('main')
}

module.exports = Title