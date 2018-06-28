## 6/28/18

I figured out what my issue was - `ROT.Display.draw()` is meant to draw a single character and does strange things when fed a full string. I should have known that. Silly me. Onwards with catching up!

I have introduced the beginnings of the screen mechanism I try to use in all my roguelikes. Also, Electron's `require` system is slightly finicky - you have to `require` the script attached to the main page before further `require`s will work normally (see `index.html`)

### The entity system

I'll be making use of the technique described [here](http://www.codingcookies.com/2013/04/20/building-a-roguelike-in-javascript-part-4/) to set up my entities. It is well-suited to Javascript's prototypal inheritance scheme.

### The map

I will only have one large map, likely based on simplex noise. There will be very few hard walls since the game will be set in a massive forest, but I plan to adjust FOV/rendering so that creatures in patches of woods can see each other, but not things outside, nor can creatures outside look in. 

## 6/27/18

Made the choice to return to Javascript. There are many things I don't like about writing in Python, despite the neat syntax for many things. 

* I don't like the libtcod library; to me, it exists in this strange limbo between bare-bones and feature-filled. I prefer BearLibTerminal if I intend on coding things like FOV and pathfinding myself and I prefer rot.js or SquidLib if I want a lot of features.
* I also dislike how the library uses a lot of low-level C to get its constants; it means that my IDE of choice (VS Code) cannot get proper autocompletion, and seeing so many error false positives drives me mad while coding.
* I really like Javascript's object system for composition of game entities, which I'll make extensive use of.
* ROT.js provides all the annoying things I don't necessarily want to code so that I can focus on game content.

Though I have fallen a week behind by this decision, I will be happier in the long run by doing it now rather than later. I've written prototypes in raw Javascript and Typescript before; the main thing I will be learning from this exercise is Electron.

I've run into an interesting dilemma so far where the canvas that I intend on attaching my game map to seems to be offset. I cannot determine if this is an error of design or a lack of knowledge of Electron's APIs.