let UI = {}

UI.update = function(tag, val) {
  document.getElementById(tag).innerText = val
}

UI.updateSeen = function(objs) {
  let list = document.getElementById('seen')
  list.innerHTML = ''
  for (obj of objs) {
    let line = document.createElement('li')
    line.style = `color: ${obj.color}`
    line.innerText = `${obj.name} (${obj.glyph})`
    list.appendChild(line)
  }
}

module.exports = UI