// Copyright 2013 William Malone (www.williammalone.com)
 
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

var CardsArray = [];

// Get canvas
canvas = document.getElementById("GameCanvas");
canvas.width = 600;
canvas.height = 300;

// Create sprites
for (var i = 0; i < FrameArray.length; i += 1) {
	aCard = sprite({
		frames: [FrameArray[i]],
		ticksPerFrame: 0,
		context: canvas.getContext("2d"),
		X: 0 + (90 * i),
		Y: 0,
		scale: 1.5,
	});
	CardsArray[CardsArray.length] = aCard;
}
for (var i = 0; i < FrameArray.length; i += 3) {
	aCard = sprite({
		frames: [FrameArray[i], FrameArray[i + 1], FrameArray[i + 2]],
		ticksPerFrame: 5,
		context: canvas.getContext("2d"),
		X: 90 + (90 * i),
		Y: 90,
		scale: 1.5,
	});
	CardsArray[CardsArray.length] = aCard;
}

function sprite (options) {
		
	var theSprite = {},
		frameIndex = 0,
		tickCount = 0,
		ticksPerFrame = options.ticksPerFrame || 0;
		
	theSprite.frames = [];
	for(var i = 0; i < options.frames.length; ++i){
		theSprite.frames[theSprite.frames.length] = options.frames[i];
	}
	if(theSprite.frames.length == 0){
		alert("Error! Number Of Frames is 0! Sprite creation terminated");
		return;
	}
		
	theSprite.context = options.context;
	theSprite.X = options.X || 0;
	theSprite.Y = options.Y || 0;
	theSprite.scale = options.scale || 1;
	// theSprite.image = options.image;
		
	theSprite.update = function () {
	    if (ticksPerFrame == 0)
	        return;

		tickCount += 1;

		if (tickCount > ticksPerFrame) {

			tickCount = 0;
				
			// If the current frame index is in range
			if (frameIndex < theSprite.frames.length - 1) {	
				// Go to the next frame
				frameIndex += 1;
			} else {
				frameIndex = 0;
			}
		}
	};
		
	theSprite.render = function () {
		
		// Clear the canvas
		theSprite.context.clearRect(theSprite.X, theSprite.Y, theSprite.width, theSprite.height);
		  
		// Draw the animation
		theSprite.context.drawImage(
		theSprite.frames[frameIndex].sourceFile,
		theSprite.frames[frameIndex].sourceX,
		theSprite.frames[frameIndex].sourceY,
		theSprite.frames[frameIndex].sourceWidth,
		theSprite.frames[frameIndex].sourceHeight,
		theSprite.X,
		theSprite.Y,
		theSprite.frames[frameIndex].sourceWidth * theSprite.scale,
		theSprite.frames[frameIndex].sourceHeight * theSprite.scale);
	};
		
	return theSprite;
}


