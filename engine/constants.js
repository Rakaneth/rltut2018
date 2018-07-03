let Constants = {}

Constants.DIRS = {
  N: [0, -1],
  NE: [1, -1],
  E: [1, 0],
  SE: [1, 1],
  S: [0, 1],
  SW: [-1, 1],
  W: [-1, 0],
  NW: [-1, -1],
  NONE: [0, 0]
}

Constants.TERRAIN = {
  PATH: 1,
  TREE: 2,
  LAKE: 3
}

Constants.TILES = [
  {
    walk: false,
    region: "none",
  },
  {
    walk: true,
    region: "path",
    glyph: '.',
    color: 'goldenrod'
  },
  {
    walk: true,
    region: "forest",
    glyph: '\u2663',
    color: 'darkgreen'
  },
  {
    walk: false,
    region: "water",
    glyph: '~',
    color: 'blue'
  }
]

module.exports = Constants