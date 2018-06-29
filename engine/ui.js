let UI = {}

UI.update = function(tag, val) {
  document.getElementById(tag).innerText = val
}

module.exports = UI