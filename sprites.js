/*  All sprite-frames
    *****************
    A frame refers to a single clip (frame) in any given sprite animation.
    
    This file extracts each needed individual frame from the sprite sheet using (X,Y) coordinates, Width and Height.
    
    My reason for this approach is for scalable reusablitity. If I were to create a game (or update this one)
    that used more animation, this approach can be used in the same way. Frames from one animation can also be
    used in another, creating more versitility, including when using scattered sprite sheets.
*/

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
function initFrames() {
    Blank_fr = CreateSpriteFrame({
        sourceFile: cardSpritesheet,
        sourceX: 489,
        sourceY: 285,
        sourceWidth: 56,
        sourceHeight: 52
    });
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
    DonkeyKong_fr = CreateSpriteFrame({
        sourceFile: cardSpritesheet,
        sourceX: 62,
        sourceY: 171,
        sourceWidth: 56,
        sourceHeight: 52
    });
    DiddyKong_fr = CreateSpriteFrame({
        sourceFile: cardSpritesheet,
        sourceX: 123,
        sourceY: 114,
        sourceWidth: 56,
        sourceHeight: 52
    });
    DixieKong_fr = CreateSpriteFrame({
        sourceFile: cardSpritesheet,
        sourceX: 184,
        sourceY: 114,
        sourceWidth: 56,
        sourceHeight: 52
    });
    Yoshi_fr = CreateSpriteFrame({
        sourceFile: cardSpritesheet,
        sourceX: 123,
        sourceY: 57,
        sourceWidth: 56,
        sourceHeight: 52
    });
    KingKRool_fr = CreateSpriteFrame({
        sourceFile: cardSpritesheet,
        sourceX: 182,
        sourceY: 228,
        sourceWidth: 56,
        sourceHeight: 52
    });
    Boo_fr = CreateSpriteFrame({
        sourceFile: cardSpritesheet,
        sourceX: 428,
        sourceY: 57,
        sourceWidth: 56,
        sourceHeight: 52
    });

    // Holds every frame (which is every card) extracted from the spritesheet
    // The exception is "Blank_fr", which is called directly by all cards to use as it's face-down
    FrameArray = [
        Mario_fr,
        Luigi_fr,
        Peach_fr,
        Bowser_fr,
        Wario_fr,
        Waluigi_fr,
        DonkeyKong_fr,
        DiddyKong_fr,
        DixieKong_fr,
        Yoshi_fr,
        KingKRool_fr,
        Boo_fr,
    ];
}