let UI = {
  messages: []
}

UI.update = function(tag, val) {
  document.getElementById(tag).innerText = val
}

UI.updateSeen = function(objs) {
  let list = document.getElementById('seen')
  list.innerHTML = ''
  for (let obj of objs) {
    let line = document.createElement('li')
    line.style = `color: ${obj.color}`
    line.innerText = `${obj.name} (${obj.glyph})`
    list.appendChild(line)
  }
}

UI.addMessage = function(msg) {
  this.messages.push(msg)
}

UI.showMessages = function() {
  let msg = document.getElementById('messages')
  msg.innerHTML = ''
  for (let m of this.messages.slice().reverse()) {
    let line = document.createElement('li')
    line.innerText = m
    msg.appendChild(line)
  }
}

module.exports = UI