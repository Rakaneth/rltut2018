const ROT = require('rot-js')

window.onload = () => {
  let screen = document.getElementsByTagName("body")[0]
  let display = new ROT.Display({width: 80, height: 40, fontSize: 16})
  screen.appendChild(display.getContainer())
  display.draw(0, 0, "Hello Electron and ROT.js!")
}

