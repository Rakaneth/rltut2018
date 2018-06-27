![RoguelikeDev Does the Complete Roguelike Tutorial Event Logo](https://i.imgur.com/EYJFgdI.png)

# What this is

I am following along with the roguelike tutorial given [here](https://www.reddit.com/r/roguelikedev/). I started in Python but decided that I dislike writing roguelikes in Python, so I've decided to start again in Javascript.

# Libraries Used

* [rot.js](http://ondras.github.io/rot.js/hp/)
* [electron](https://electronjs.org/)

# Progress

- [ ] Week 1
- [ ] Week 2
- [ ] Week 3
- [ ] Week 4
- [ ] Week 5
- [ ] Week 6
- [ ] Week 7
- [ ] Week 8

# Devlog

## 6/27/18

Made the choice to return to Javascript. There are many things I don't like about writing in Python, despite the neat syntax for many things. 

* I don't like the libtcod library; to me, it exists in this strange limbo between bare-bones and feature-filled. I prefer BearLibTerminal if I intend on coding things like FOV and pathfinding myself and I prefer rot.js or SquidLib if I want a lot of features.
* I also dislike how the library uses a lot of low-level C to get its constants; it means that my IDE of choice (VS Code) cannot get proper autocompletion, and seeing so many error false positives drives me mad while coding.
* I really like Javascript's object system for composition of game entities, which I'll make extensive use of.
* ROT.js provides all the annoying things I don't necessarily want to code so that I can focus on game content.

Though I have fallen a week behind by this decision, I will be happier in the long run by doing it now rather than later. I've written prototypes in raw Javascript and Typescript before; the main thing I will be learning from this exercise is Electron.

I've run into an interesting dilemma so far where the canvas that I intend on attaching my game map to seems to be offset. I cannot determine if this is an error of design or a lack of knowledge of Electron's APIs.
