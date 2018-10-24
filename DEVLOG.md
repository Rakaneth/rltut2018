## 10/24/18

Picked this back up again. Despite not finishing in the tutorial time allotted, I'm still determined to complete this because I want this concept to be given form. 

Prepared the gamestate for scheduling and the engine - going with a Speed scheduler. Also cleaned up Entity.loc.

## 7/26/18

FINALLY finished basic combat. The player can now run around and eat the various denizens of the forest. This catches me up to Week 4. Added inventory and player mixins (which only the player will use). 

### Range

Only NPCs will have range (werewolf hunters). With my composition-based design, though, it should not be difficult to extend this to the player at need.

## 7/24/18

I am much farther behind than I want to be - for work reasons, but also because of some refactoring. `game.js` no longer depends on `factory.js`, so I can now use functions from `game.js` in `factory.js` without causing a circular dependency. This allows me to query the gamestate in my mixins.

There is also a rudimentary event system in place to allow objects to communicate with each other, as well as a message log.

The refactoring did not go well at first, as I had to also refactor how commands worked. I've fixed everything to have a running game again, so now I can get back to catching up - I have a semi-free weekend coming up, and I hope to get caught up then.

## 7/13/18

Creatures now have a defined 'stench' rating which makes them easier to smell at longer ranges. An unwashed human (such as the player's human form) has a stench rating of 2. Rotting corpses have a stench rating of 5.

Also, the FOV correctly includes border forest tiles that block further vision.

## 7/12/18

Tested some of the mixins - they work - and refactored input to use the Command pattern, since it's so straightforward to do with first-class objects.

### Combat (not implemented yet)

I intend for the game to control with just one action button, outside of movement. Combat, such that will be, will be simple, with most creatures having one hit point, with the player and certain animals being the exception. The player will also be the only creature capable of recovering. I intend for LOS/smell to provide most of the emergent gameplay, with the player being forced to take advantage of his superior senses to take down prey, as well as manage time spent in werewolf form.

### The Werewolf (partially implemented)

Now that I've gone and mentioned it, this is probably a good time to go over the main premise of the game. The player is a werewolf, and the game starts on a Blood Moon night where his curse threatens to take his humanity forever. The game focuses on the one night and what the player does with it. The more time he spends as a werewolf, the closer he comes to the Wolf; the more time he spends in human form, the closer he comes to humanity. The player cannot engage in any combat at all in human form, and cannot talk to NPCs in werewolf form (which he will need to do to get the best ending). If at any point the player's Wolf rating gets to 100, the game ends.

## 7/11/18

Drama and work have taken over my life for the time being, so progress may be slow. I've added some more mixins for my entities to use, but I don't have the energy to wire them up to test.

## 7/3/18

With flood-filling, I've managed to implement regions for my FOV; the player can only see map tiles in his region, but may be able to detect objects outside of it if they have a smell (since the protagonist is a werewolf with heightened senses). The first part is implemented; the second part is not, since the player is still the only object known to the game.

## 6/29/18

Finished up Weeks 1 and 2, getting a rendered map under a moving @. Going with Simplex noise for now. `Array.fill` is *the worst* for filling a 2D array; all the arrays were *the same object,* causing my maps to look weird (and causing me to initially think that I had somehow used `ROT.Noise.Simplex` incorrectly).

## 6/28/18

I figured out what my issue was - `ROT.Display.draw()` is meant to draw a single character and does strange things when fed a full string. I should have known that. Silly me. Onwards with catching up!

I have introduced the beginnings of the screen mechanism I try to use in all my roguelikes. Also, Electron's `require` system is slightly finicky - you have to `require` the script attached to the main page before further `require`s will work normally (see `index.html`)

After a lot of finagling, I'm back to week one - a moving @ on a blank canvas, but using the entity implementation above. I think the hardest part of capturing input and producing output is over, though; I can build on the models I have created, adjusting as needed.

### The entity system

I'll be making use of the technique described [here](http://www.codingcookies.com/2013/04/20/building-a-roguelike-in-javascript-part-4/) to set up my entities. It is well-suited to Javascript's prototypal inheritance scheme.

### The map

I will only have one large map, likely based on simplex noise. There will be very few hard walls since the game will be set in a massive forest, but I plan to adjust FOV/rendering so that creatures in patches of woods can see each other, but not things outside, nor can creatures outside look in. 

### Game state

I like to hold the game state in one large object; it is a lot easier to serialize and reason about if it is all in one place. 

## 6/27/18

Made the choice to return to Javascript. There are many things I don't like about writing in Python, despite the neat syntax for many things. 

* I don't like the libtcod library; to me, it exists in this strange limbo between bare-bones and feature-filled. I prefer BearLibTerminal if I intend on coding things like FOV and pathfinding myself and I prefer rot.js or SquidLib if I want a lot of features.
* I also dislike how the library uses a lot of low-level C to get its constants; it means that my IDE of choice (VS Code) cannot get proper autocompletion, and seeing so many error false positives drives me mad while coding.
* I really like Javascript's object system for composition of game entities, which I'll make extensive use of.
* ROT.js provides all the annoying things I don't necessarily want to code so that I can focus on game content.

Though I have fallen a week behind by this decision, I will be happier in the long run by doing it now rather than later. I've written prototypes in raw Javascript and Typescript before; the main thing I will be learning from this exercise is Electron.

I've run into an interesting dilemma so far where the canvas that I intend on attaching my game map to seems to be offset. I cannot determine if this is an error of design or a lack of knowledge of Electron's APIs.