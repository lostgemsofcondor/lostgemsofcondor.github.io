var game = new Game();

var canvas = document.getElementById("mainCanvas");
var convasDiv = document.getElementById("mainCanvasDiv")
var context = canvas.getContext("2d");

var mapCanvas = document.getElementById("mapCanvas");
var mapConvasDiv = document.getElementById("mapCanvasDiv")
var mapContext = mapCanvas.getContext("2d");

var drawTime = 0;
var frameTime = 0;
var drawTimeMax = 0;


var fpsMax = 60;
var fps = 0;
var adjust = 0;

game.map = {};

/// constants

var debug = true;
var debugLevel = 3;
var adjustment = 1/32;

/// end constants

window.onload = startUp;

function startUp(){
	resize();
	//canvas.addEventListener("mousedown", handelMouseDown);
	//canvas.addEventListener("mouseup", handelMouseUp);
	//canvas.addEventListener("mousemove", handelMouseMove);
	//window.addEventListener("keypress", keypress, false);
	window.addEventListener("resize", resize);
	
	main();
}

async function main(){
	var frameTimes = [];
	var count = 0;
	while(true){
		var start = performance.now();
		gameLoop();
		drawTime = performance.now() - start;
		if(drawTime < 1/(fpsMax) * 1000){
			await sleep((1/(fpsMax) * 1000) - drawTime + adjust);
		} else {
			await sleep(0)
		}
		frameTime = performance.now() - start;
		if(drawTime > drawTimeMax){
			drawTimeMax = drawTime
		}
		frameTimes.push(frameTime);
		count++;
		if(frameTimes.length > 60){
			frameTimes.shift()
		}
		fps = frameTimes.length/frameTimes.reduce((a, b) =>  a + b)*1000;
		if(count % 60 == 0){
			count = 0;
			
			if(fps - 1 > fpsMax){
				adjust += adjustment;
				if(fps - .4 > fpsMax){
					adjust += adjustment;
				}
			}
			if(fps + .5 < fpsMax){
				adjust -= adjustment;
				if(fps + .2 < fpsMax){
					adjust -= adjustment;
				}
			}
		}
	}
	console.log("exit while true?");
}

function sleep(ms){
  return new Promise(resolve => setTimeout(resolve, ms));
}

function gameLoop(){
	mainGameLoop(game);
	redraw();
}

function redraw(){
	clearCanvas();
	draw();
}

function clearCanvas(){
	context.clearRect(0, 0, canvas.width, canvas.height);
}

function draw(){
	
	copyMap();
	drawPlayer();
	counter();
	addDebugText();
}

function drawPlayer(){
	context.drawImage(game.player.sprite.getImg(), game.width/2, game.height/2, 48, 48);
}

function copyMap(){
	context.drawImage(mapCanvas, game.player.positionX, game.player.positionY);
}

function resize(){
	canvas.width = game.width = convasDiv.offsetWidth;
	canvas.height = game.height =convasDiv.offsetHeight;
	
	drawMap();
	
	//blueprint.draw();
	addDebugText();
}
			

/*

function loadSprite(url) {
	if(resourceCache[url]) {
		return resourceCache[url];
	}
	else {
		var img = new Image();
		img.onload = function() {
			resourceCache[url] = img;

			if(isReady()) {
				readyCallbacks.forEach(function(func) { func(); });
			}
		};
		resourceCache[url] = false;
		img.src = url;
	}
}
*/

function rotateAndPaintImage(img, angleInDeg , positionX, positionY, sizeX, sizeY ) {
	var angleInRad = angleInDeg*Math.PI/180
	
	positionX += sizeX/2;
	positionY += sizeY/2;
	
	context.translate(positionX, positionY);
	context.rotate(angleInRad);
	context.drawImage(img, -sizeX/2, -sizeY/2, sizeX, sizeY);
	context.rotate(-angleInRad);
	context.translate(-positionX, -positionY);
}

function drawMap(){
	
	mapCanvas.width = 3000;
	mapCanvas.height = 3000;
	drawGrass();
}

///temp
var img = new Image();
img.src = "./sprites/background/pixil-frame-0.png";
function drawGrass(){
	var x = 0;
	var y = 0;
	var width = 96;
	var height = 96;
	var sum =0;
	var sum2 =0;
	for(var i = x; i <= x + width*30; i += width/2){
		sum2++;
		for(var j = y; j <= y + height*30; j += height/2){
			// rotateAndPaintImage(img, 10, i, j, width, height);
			mapContext.drawImage(img, i, j, width, height);
			sum++;
			
		}
	}
	console.log(sum, sum2)
}


var count = 0;
var seconds = 0;
function counter(){
	count++;
	if(count >= 60){
		count = 0; 
		seconds++;
		
	}
		context.font = "60px Verdana,sans-serif";
		context.fillText(seconds, 300, 50);
}
///temp

class DebugInfo {
	constructor(level = 0){
		this.font = "14px Verdana,sans-serif";
		this.leftMargin = 10;
		this.topMargin = 200;
		this.gap = 15;
		this.lines = 0;
		this.level = level;
		context.font = this.font;
	}
	
	add(str, level=0){
		if(level <= this.level){
			context.fillText(str, this.leftMargin, this.topMargin + this.gap * this.lines);
			this.lines++;
		}
	}
}

function addDebugText(){
	if(!debug) return;
	var debugInfo = new DebugInfo(debugLevel);
	debugInfo.add("fps: " + fps.toFixed(0), 1);
	debugInfo.add("Width: " + canvas.width, 4);
	debugInfo.add("Height: " + canvas.height, 4);
	debugInfo.add("Draw Time " + drawTime, 3);
	debugInfo.add("Draw Time Max " + drawTimeMax, 2);
	debugInfo.add("performance.now() " + performance.now(), 4);
	debugInfo.add("Frame Time " + frameTime, 4);
	debugInfo.add("adjust " + adjust, 4);
	debugInfo.add("Keys Pressed " + getKeys(), 3);
}

function getKeys(){
	keys = ""
	Object.keys(game.map).forEach(function(key){
		// keys += String.fromCharCode(key) + " ";
		keys += key + " ";
	});
	return keys;
}

onkeydown = onkeyup = function(e){
    e = e || event; // to deal with IE
	if(e.type == 'keydown'){
		game.map[e.keyCode] = true;
	} else {
		delete game.map[e.keyCode];
	}
	// console.log(game.map)
}

