// Author: Jonathan B. Miller (http://jonathanbmiller.com)
// Original concept built from William Malone (www.williammalone.com) (http://www.williammalone.com/articles/create-html5-canvas-javascript-sprite-animation/)
 
(function() {
	// http://paulirish.com/2011/requestanimationframe-for-smart-animating/
	// http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating
	// requestAnimationFrame polyfill by Erik Möller. fixes from Paul Irish and Tino Zijdel
	// MIT license

	var lastTime = 0;
	var vendors = ['ms', 'moz', 'webkit', 'o'];
	for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
		window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
		window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame'] 
								   || window[vendors[x]+'CancelRequestAnimationFrame'];
	}
 
	if (!window.requestAnimationFrame)
		window.requestAnimationFrame = function(callback, element) {
			var currTime = new Date().getTime();
			var timeToCall = Math.max(0, 16 - (currTime - lastTime));
			var id = window.setTimeout(function() { callback(currTime + timeToCall); }, 
			  timeToCall);
			lastTime = currTime + timeToCall;
			return id;
		};
 
	if (!window.cancelAnimationFrame)
		window.cancelAnimationFrame = function(id) {
			clearTimeout(id);
		};
}());


function Card(options) {
	var theCard = {};
	theCard.matchID = options.matchID || -1; // A pair of cards will share this ID, identifying each other as their match
	theCard.isFaceUp = false;
	theCard.isMatched = false;
	theCard.isSelected = false;
	theCard.x = options.x || 0; // X position of the card, relative to the canvas
	theCard.y = options.y || 0; // Y position of the card, relative to the canvas
	theCard.sprite = Sprite({   // It's sprite, including all of it's needed frames
		frames: [Blank_fr, options.cardFace],
		ticksPerFrame: 0, // Set to 0 to stop it form animating between face up and down
		context: canvas.getContext("2d"),
		scale: options.scale || 1.5,
	});;

	theCard.getFrameWidth = function () { return theCard.sprite.frames[theCard.sprite.frameIndex].sourceWidth * theCard.sprite.scale };
	theCard.getFrameHeight = function () { return theCard.sprite.frames[theCard.sprite.frameIndex].sourceHeight * theCard.sprite.scale };

	theCard.update = function () {
		// Flip Logic
		theCard.isFaceUp = (theCard.isSelected || theCard.isMatched);
		theCard.sprite.frameIndex = (theCard.isFaceUp) ? 1 : 0;

		// Anitmation
		if (theCard.sprite.ticksPerFrame != 0) {
			theCard.sprite.tickCount++;

			if (theCard.sprite.tickCount > theCard.sprite.ticksPerFrame) {
				theCard.sprite.tickCount = 0;
				// If the current frame index is in range
				if (theCard.spriteframeIndex < theCard.sprite.frames.length - 1) {
					// Go to the next frame
					theCard.sprite.frameIndex++;
				} else {
					theCard.sprite.frameIndex = 0;
				}
			}
		}
	};

	theCard.render = function () {
		// Draw the card
		theCard.sprite.context.drawImage(
			theCard.sprite.frames[theCard.sprite.frameIndex].sourceFile,
			theCard.sprite.frames[theCard.sprite.frameIndex].sourceX,
			theCard.sprite.frames[theCard.sprite.frameIndex].sourceY,
			theCard.sprite.frames[theCard.sprite.frameIndex].sourceWidth,
			theCard.sprite.frames[theCard.sprite.frameIndex].sourceHeight,
			theCard.x,
			theCard.y,
			theCard.sprite.frames[theCard.sprite.frameIndex].sourceWidth * theCard.sprite.scale,
			theCard.sprite.frames[theCard.sprite.frameIndex].sourceHeight * theCard.sprite.scale
		);
	};

	return theCard;
}

// Creates a complete sprite animation
function Sprite (options) {
		
	var theSprite = {};
	theSprite.context = options.context;
	theSprite.scale = options.scale || 1;
	theSprite.frames = [];
	theSprite.frameIndex = 0;
	theSprite.tickCount = 0,
	theSprite.ticksPerFrame = options.ticksPerFrame || 0; // Time (ticks) before frame is incremented

	for(var i = 0; i < options.frames.length; ++i){
		theSprite.frames[theSprite.frames.length] = options.frames[i];
	}
	if(theSprite.frames.length == 0){
		console.error("Error! Number Of Frames is 0! Sprite creation terminated");
		return;
	}
		
	return theSprite;
}

function Button(options) {
	var theButton = {};
	theButton.x = options.x;
	theButton.y = options.y;
	theButton.width = options.width;
	theButton.height = options.height;
	theButton.text = options.text;
	theButton.context = options.context;    // Canvas.getContext('2d')
	theButton.action = options.action;      // Function to be called upon click
	theButton.clicked = false;
	theButton.hovered = false;

	theButton.update = function() {
	    theButton.hovered = IsPointWithinRect(mousePos, { x1: theButton.x, y1: theButton.y, x2: theButton.x + theButton.width, y2: theButton.y + theButton.height });
	}
	theButton.render = function() {
		//set color
		if (this.hovered) {
			theButton.context.fillStyle = "#00D4E3";
		} else {
			theButton.context.fillStyle = "#00EEFF";
		}

		//draw button
		theButton.context.fillRect(this.x, this.y, this.width, this.height);

		//text options
		var fontSize = 20;
		theButton.context.fillStyle = "#000000";
		theButton.context.font = fontSize + "px sans-serif";

		//text position
		var textSize = theButton.context.measureText(this.text);
		var textX = this.x + (this.width/2) - (textSize.width / 2);
		var textY = this.y + (this.height*0.8) - (fontSize/2);

		//draw the text
		theButton.context.fillText(this.text, textX, textY);
	}

	return theButton;
}
