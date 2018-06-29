const {app, BrowserWindow} = require('electron')

let win

function createWindow() {
  win = new BrowserWindow({
    title: 'Roguelike Tutorial 2018',
    show: false,
    width: 900,
    height: 900,
    frame: false,
    resizable: false
  })
  win.loadURL("file://" + __dirname + "/index.html")
  win.on('closed', () => {
    win = null
  })
  win.on('ready-to-show', () => {
    win.show()
    win.focus()
  })
}

app.on('ready', createWindow)
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (win === null) {
    createWindow()
  }
})