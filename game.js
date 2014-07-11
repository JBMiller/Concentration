/* 	Author: Jonathan B. Miller (http://jonathanbmiller.com)
	Purpose: This file holds the major game loop functionality. It is dependant on "core.js" to function.
	Special thanks to William Malone (www.williammalone.com) (http://www.williammalone.com/articles/create-html5-canvas-javascript-sprite-animation/)
 */
// Get canvas
var mousePos = { x: 0, y: 0 };
var canvas = document.getElementById("GameCanvas");
canvas.width = 500;
canvas.height = 500;
canvas.addEventListener("touchstart", DefaultClickHandler);
canvas.addEventListener("mousedown", DefaultClickHandler);
canvas.addEventListener('mousemove', function (evt) {
        var rect = canvas.getBoundingClientRect();
        mousePos = {
            x: evt.clientX - rect.left,
            y: evt.clientY - rect.top
        };
    }, false);

// Create & Load sprite sheet
var cardSpritesheet = new Image();
cardSpritesheet.addEventListener("load", gameLoop);
cardSpritesheet.src = "cards.png";

// Holds all visible cards
var FrameArray = [];
var CardsArray = [];
var ButtonArray = [];

// Milliseconds of sleep
var sleep = 0;

var numbSelectedCards = 0;
var numbMatches = 0;
var levelIndex = 0;
// 2x2, 2x3, 2x4, 3x6, 4x8, 5x10
var levels = { 
    0: { cols: 2, totalMatches: 2 },
    1: { cols: 2, totalMatches: 3 },
    2: { cols: 2, totalMatches: 4 },
    3: { cols: 3, totalMatches: 6 },
    4: { cols: 4, totalMatches: 8 },
    5: { cols: 5, totalMatches: 10 }
};
var startTime = Date.now();
var timer = startTime - Date.now();

init();
function init() {
    FrameArray = [];
    CardsArray = [];
    ButtonArray = [];
    sleep = 0;
    numbSelectedCards = 0;
    numbMatches = 0;
    cols = levels[levelIndex].cols;
    totalMatches = levels[levelIndex].totalMatches;
    // Create Bottom UI

    // Create Buttons
    var aButton = Button({
        x: 380,
        y: 435,
        width: 100,
        height: 50,
        text: "Restart",
        context: canvas.getContext("2d"),
        action: function () { levelIndex=0; startTime = Date.now(); init();}
    })
    ButtonArray[0] = aButton;
    // Create Cards
    initFrames();
    shuffle(FrameArray);
    doubleUp(FrameArray);
    for (var i = 0; i < totalMatches * 2; i += 1) {
        aCard = Card({
            matchID: i - (i % 2),
            cardFace: FrameArray[i],
            scale: 1.5,
        });
        CardsArray[CardsArray.length] = aCard;
    }
    shuffle(CardsArray);
    
    for (var i = 0; i < CardsArray.length; i += 1) {
        CardsArray[i].x = ((canvas.width - (cols * 90)) / 2) + (90 * (i % cols));
        CardsArray[i].y = 50 + (90 * (Math.floor(i / cols)));
    }
}
function gameLoop() {	
    if (sleep > 0) {
        sleep--;
        if (sleep == 0) {
            for (i = 0; i < CardsArray.length; i += 1) {
                CardsArray[i].isSelected = false;
            }
        }
    }
    window.requestAnimationFrame(gameLoop);

    // Clear the canvas
    canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);
	
	// Draw UI
	canvas.getContext("2d").font = "20pt Ariel";
	canvas.getContext("2d").fillText("Concentration", 170, 35);
	if(numbMatches == totalMatches && levelIndex >= 5)
	{
		canvas.getContext("2d").fillText("Finish!!", 5, 440);
	}
	else
	{
		canvas.getContext("2d").fillText("Level: " + (levelIndex+1), 5, 440);
		timer = ((Date.now() - startTime)/1000).toFixed(2);
	}
	canvas.getContext("2d").fillText("Time Taken: " + timer + "s", 5, 480);

	// Button Loops
    for (var i = 0; i < ButtonArray.length; ++i) {
        ButtonArray[i].update();
        ButtonArray[i].render();
    }
	// Card Loops
    for (var i = 0; i < CardsArray.length; ++i) {
        CardsArray[i].update();
        CardsArray[i].render();
    }
	// Increment Level when current level is complete
    if (numbMatches == totalMatches && levelIndex < 5) {
        levelIndex++
        init();
    }
}

function DefaultClickHandler(e) {
    ButtonClickHandler();
    CardClickHandler();
}
function ButtonClickHandler() {
    for (var i = 0; i < ButtonArray.length; ++i) {
        var isWithin = false;
        isWithin = IsPointWithinRect(
            { x: mousePos.x, y: mousePos.y },
            {
                x1: ButtonArray[i].x, x2: ButtonArray[i].x + ButtonArray[i].width,
                y1: ButtonArray[i].y, y2: ButtonArray[i].y + ButtonArray[i].height
            }
        );
        if (isWithin) {
            ButtonArray[i].action();
            break;
        }
    }
}
function CardClickHandler() {
    if (sleep > 0)
        return;

    for (i = 0; i < CardsArray.length; i += 1) {
        // Check for mouse click collision with coin
        var isWithin = false;
        isWithin = IsPointWithinRect(
            { x: mousePos.x, y: mousePos.y },
            {
                x1: CardsArray[i].x, x2: CardsArray[i].x + CardsArray[i].getFrameWidth(),
                y1: CardsArray[i].y, y2: CardsArray[i].y + CardsArray[i].getFrameHeight()
            }
        );
        if (isWithin) {
            if (CardsArray[i].isFaceUp)
                return;
            CardsArray[i].isSelected = true;
            numbSelectedCards++;
            break;
        }
    }

    if (numbSelectedCards >= 2) {
        numbSelectedCards = 0;
        var cardA = null;
        var cardB = null;
        for (i = 0; i < CardsArray.length; i += 1) {
            if (CardsArray[i].isSelected) {
                if (!cardA) cardA = CardsArray[i];
                else if (!cardB) cardB = CardsArray[i];
            }
            if (!!cardA && !!cardB)
                break;
        }
        if (cardA.matchID == cardB.matchID) {
            cardA.isMatched = true;
            cardB.isMatched = true;
            cardA.isSelected = false;
            cardB.isSelected = false;
            numbMatches++;
        }
        else
            sleep = 50;
    }
}

// Helping Methods
// ***************

// Fisher–Yates Shuffle http://bost.ocks.org/mike/shuffle/
function shuffle(array) {
    var m = array.length, t, i;

    // While there remain elements to shuffle…
    while (m) {

        // Pick a remaining element…
        i = Math.floor(Math.random() * m--);

        // And swap it with the current element.
        t = array[m];
        array[m] = array[i];
        array[i] = t;
    }

    return array;
}
function doubleUp(array) {
    for (var i = 0; i < array.length; i += 2) {
        array.splice(i+1, 0, array[i]);
    }
    return array;
}
function getElementPosition(element) {

    var parentOffset,
        pos = {
            x: element.offsetLeft,
            y: element.offsetTop
        };

    if (element.offsetParent) {
        parentOffset = getElementPosition(element.offsetParent);
        pos.x += parentOffset.x;
        pos.y += parentOffset.y;
    }
    return pos;
}

function IsPointWithinRect(point, rect) {
    return (
        (rect.x1 < point.x) &&
        (point.x < rect.x2) &&
        (rect.y1 < point.y) &&
        (point.y < rect.y2)
        );
}
