###Card Matching
###============

A card matching game (under development). Upon completion, the game will feature a table of face down cards. The player may flip two cards. If they match, they stay face-up. If they do not, they flip back down. The goal will be to match all of the cards in the given timelimit.


[Play the current build here!](http://jonathanbmiller.com/Games/Matching/CardMatching.aspx)


###File Descriptions:

index.html: The page that holds the game and imports the required .js files in the necessary order.
card.png: Spritesheet containing all the necessary "cards"
game.js: Holds the primary "game loop".
sprites.js: Pulls and stores sprites from the spritesheet, card.png. 
spriting.js: Holds logic for animation and drawing (rendering) sprites to the canvas.

Note: All of the .js files can be merged with the eachother, however, they has been separated for organization.
