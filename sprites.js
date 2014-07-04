/* All sprite-frames (a single frame in any sprite animation)
    No value needs to be changed
    
    The reason for this approach is for scalable reusablitity. If I were to create a game (or update this one)
    to incorporate more animation, this approach would be used in the same way.
*/

// Create & Load sprite sheet
var cardSpritesheet = new Image();
cardSpritesheet.addEventListener("load", gameLoop);
cardSpritesheet.src = "cards.png";

function CreateSpriteFrame(options) {
    /* Information:
        Source = Related to the spritesheet file itself.
        X = X-Axis (horizontal) coordinate of the top-left corner of the single sprite frame boundary
        Y = Y-Axis (vertical) coordinate of the top-left corner of the single sprite frame boundary
        Width = How many pixels across is the frame
        Height = How many pixels tall is the frame        
    */
    var newFrame = {};
    newFrame.sourceFile = options.sourceFile;
    newFrame.sourceX = options.sourceX;
    newFrame.sourceY = options.sourceY;
    newFrame.sourceWidth = options.sourceWidth;
    newFrame.sourceHeight = options.sourceHeight;

    return newFrame;
}
Mario_fr = CreateSpriteFrame({
    sourceFile: cardSpritesheet,
    sourceX: 1,
    sourceY: 114,
    sourceWidth: 56,
    sourceHeight: 52
});
Luigi_fr = CreateSpriteFrame({
    sourceFile: cardSpritesheet,
    sourceX: 62,
    sourceY: 114,
    sourceWidth: 56,
    sourceHeight: 52
});
Peach_fr = CreateSpriteFrame({
    sourceFile: cardSpritesheet,
    sourceX: 1,
    sourceY: 57,
    sourceWidth: 56,
    sourceHeight: 52
});
Bowser_fr = CreateSpriteFrame({
    sourceFile: cardSpritesheet,
    sourceX: 62,
    sourceY: 228,
    sourceWidth: 56,
    sourceHeight: 52
});
Wario_fr = CreateSpriteFrame({
    sourceFile: cardSpritesheet,
    sourceX: 1,
    sourceY: 228,
    sourceWidth: 56,
    sourceHeight: 52
});
Waluigi_fr = CreateSpriteFrame({
    sourceFile: cardSpritesheet,
    sourceX: 1,
    sourceY: 171,
    sourceWidth: 56,
    sourceHeight: 52
});

var FrameArray = [
    Mario_fr,
    Luigi_fr,
    Peach_fr,
    Bowser_fr,
    Wario_fr,
    Waluigi_fr,
];