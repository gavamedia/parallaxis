/**
 * Displace's background image to emulate distance.
 *
 * @author Christopher Ringrose
 * @copyright (c) 2015 Gavamedia®
 * @version 1.0.0
 * @package System
 *
**/




var onScroll = window.requestAnimationFrame ||
	window.webkitRequestAnimationFrame ||
	window.mozRequestAnimationFrame ||
	window.msRequestAnimationFrame ||
	window.oRequestAnimationFrame ||
	function(callback){ window.setTimeout(callback, 1000/60) };


var parallaxLastScrollY = 0;
var parallaxIsDrawing = false;


// Store images in buffers
var parallaxOriginalImage = [];
var parallaxImageBuffer = [];
var parallaxCanvasContext = [];


// Removing the original background image is deferred until all is loaded
var numToLoad = 0;
var numSuccessfullyLoaded = 0;






function updateParallax() {
	var parallaxCanvas = document.querySelectorAll('canvas[parallax-distance]');
	for (var i = 0; i < parallaxCanvas.length; i++) {


		// Only redraw if visible
		var canvasBounds = parallaxCanvas[i].getBoundingClientRect();
		if (canvasBounds.top < window.innerHeight && (canvasBounds.bottom > 0)) {
	

			// Center picture vertically
			var y = (parallaxCanvasContext[i].canvas.height - parallaxImageBuffer[i].height) / 2;

			
			// Convert distance
			var distance = Math.min(10, parallaxCanvas[i].getAttribute('parallax-distance'));
			
			// This allows for the user-friendly 1 to 10 distance value
			distance = Math.max(1, 10 - distance);
			
			
			// Adjust for position on page, based on speed
			y -= canvasBounds.top / distance;


			try {
				parallaxCanvasContext[i].drawImage(parallaxImageBuffer[i], 0, y);

				// Clear missing parts when image isn't tall enough
				//if (parallaxImageBuffer[i].height )
				//parallaxCanvasContext[i].clearRect(0, 20, parallaxImageBuffer[i].width, 10);
			}
			catch(ex){}

		}

	}
	
	parallaxIsDrawing = false;
}











function parallaxScrolled() {
	parallaxLastScrollY = (window.pageYOffset || document.documentElement.scrollTop) - (document.documentElement.clientTop || 0);
	
	if (!parallaxIsDrawing) {
		parallaxIsDrawing = true;
		onScroll(updateParallax);
	}
}











/*
*  Update width and height of every parallax-enabled element
*/
function parallaxPrepareCanvases() {
	var parallaxCanvas = document.querySelectorAll('canvas[parallax-distance]');
	for (var i = 0; i < parallaxCanvas.length; i++) {
		var canvasSize = window.getComputedStyle(parallaxCanvas[i]);
		parallaxCanvas[i].width = canvasSize.width.replace(/px/g, '');
		parallaxCanvas[i].height = canvasSize.height.replace(/px/g, '');
		
		
		// Create buffer to store pre-sized image
		if (!(i in parallaxImageBuffer)) {
			parallaxImageBuffer[i] = document.createElement('canvas');
			parallaxCanvasContext[i] = parallaxCanvas[i].getContext('2d');	
		}

		
		// Proportionally scale buffer to new width
		parallaxImageBuffer[i].width = parallaxCanvas[i].width;
		parallaxImageBuffer[i].height = parallaxOriginalImage[i].height / (parallaxOriginalImage[i].width / parallaxCanvas[i].width);
		
		// Paint it to buffer
		parallaxImageBuffer[i].getContext('2d').drawImage(parallaxOriginalImage[i], 0, 0, parallaxImageBuffer[i].width, parallaxImageBuffer[i].height);
	}
	
	
	parallaxIsDrawing = false;
	onScroll(updateParallax);
	
	
	// Remove original background images	
	if (numSuccessfullyLoaded >= numToLoad) {
		
		// Prevent calling again
		numToLoad = 0;
		numSuccessfullyLoaded = -1;

		// NOTE:	This isn't done sooner to avoid an initial flicker. Rigorous testing in slow internet
		//				conditions revealed this to be the most reliable time to do this.
		for (var i = 0; i < parallaxCanvas.length; i++) parallaxCanvas[i].parentElement.style.backgroundImage = 'none';
	}
	
}












(function() {
	
	var parallaxItems = document.querySelectorAll('[parallax-distance]');
	if (parallaxItems.length > 0) {

		numToLoad = parallaxItems.length;
		
		for (var i = 0; i < parallaxItems.length; i++) {

			// Create canvas background
			var parallaxCanvas = document.createElement('canvas');
			parallaxCanvas.style.display = 'block';
			parallaxCanvas.style.position = 'absolute';
			parallaxCanvas.style.left = '0';
			parallaxCanvas.style.top = '0';
			parallaxCanvas.style.width = '100%';
			parallaxCanvas.style.height = '100%';
			parallaxCanvas.style.zIndex = '-1';
			parallaxCanvas.setAttribute('parallax-distance', parallaxItems[i].getAttribute('parallax-distance'));
			
			parallaxItems[i].appendChild(parallaxCanvas);
			parallaxItems[i].removeAttribute('parallax-distance');


			// Set canvas width/height
			var canvasSize = window.getComputedStyle(parallaxCanvas);
			parallaxCanvas.width = canvasSize.width.replace(/px/g, '');
			parallaxCanvas.height = canvasSize.height.replace(/px/g, '');

			
			// Determine image
			var imgSrc = window.getComputedStyle(parallaxItems[i]).backgroundImage.match(/\((.*?)\)/)[1].replace(/('|")/g,'');
			
			// Perhaps use HQ image instead
			imgSrc = imgSrc.replace(/\%7BLOADING\%7D\./gi, '.').replace(/\{LOADING\}\./gi, '.');

			// Load image
			parallaxOriginalImage[i] = new Image();
			parallaxOriginalImage[i].onload = function(){
				// Prepare canvas only after image load
				numSuccessfullyLoaded++;
				parallaxPrepareCanvases();
			}
			parallaxOriginalImage[i].src = imgSrc;
		}

		
		// Refresh on scroll
		if (document.addEventListener) window.addEventListener('scroll', parallaxScrolled, false);
		else if (document.attachEvent) window.attachEvent('onscroll',  parallaxScrolled);
		
		// Resize window updates canvas size
		if (document.addEventListener) window.addEventListener('resize', parallaxPrepareCanvases, false);
		else if (document.attachEvent) window.attachEvent('onresize', parallaxPrepareCanvases);
	}
	
})();
