###Card Matching
A card matching game (based of ["Concentration"](http://en.wikipedia.org/wiki/Concentration_(game))). The rules are simple: you may flip over two cards at once. If they match, they stay flipped up. If they do not, they are flipped back down. There are a number of cards on the field. Goal: Flip them all.


[Play the current build here!](http://jonathanbmiller.com/Games/Matching/CardMatching.aspx)


###File Descriptions:
* index.html: The page that holds the game and imports the required .js files in the necessary order.
* card.png: Spritesheet containing all the necessary "cards"
* game.js: Holds the primary game functions.
* sprites.js: Pulls and stores sprites from the spritesheet, card.png. 
* spriting.js: Holds logic for animation and drawing (rendering) sprites to the canvas.

Note 1: All of the .js files can be merged with the eachother, however, they has been separated for organization.
Note 2: The three .js files will be condensed in a later commit
