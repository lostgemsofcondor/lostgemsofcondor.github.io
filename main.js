

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


/// constants

var debug = true;
var debugDrawing = true;
var debugLevel = 4;
var adjustment = 1/32;

var rotateSpeed = 2;
var playerSpeed = 15;

/// end constants

var game = new Game();
game.map = {};
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
	drawObjects();
	drawPlayer();
	counter();
	drawDebugThings();
	addDebugText();
}

function drawObjects(){
	addSprite(game.temp.sprite);
}

function drawPlayer(){
	addSprite(game.player.entity.sprite);
}

function copyMap(){
	var p = new Point(0, 0);
	var adjXPlayer = game.player.positionX + game.cameraX;
	var adjYPlayer = game.player.positionY + game.cameraY;
	var adjXZero = p.positionX + game.cameraX;
	var adjYZero = p.positionY + game.cameraY;
	context.save();
	context.translate(adjXPlayer , adjYPlayer);
	context.rotate(game.angle);
	context.translate(-adjXPlayer, -adjYPlayer);
	addToContext(mapCanvas, adjXZero, adjYZero);
	//context.drawImage(mapCanvas, 0, 0);
	//context.translate(-positionX, -positionY);
	context.restore();
}

function resize(){
	canvas.width = game.width = convasDiv.offsetWidth;
	canvas.height = game.height = convasDiv.offsetHeight;
	
	drawMap();
	
	//blueprint.draw();
	draw();
}
	

function addSprite(sprite){
	addToContext(sprite.getImg(), adjustXCord(sprite), adjustYCord(sprite), sprite.width, sprite.height);
}

function addToContext(img, x, y, width = null, height = null){
	//var adjX = adjustXCord(x);
	//var adjY = adjustYCord(y);
	if(width && height){
		context.drawImage(img, x, y, width, height)
	} else {
		context.drawImage(img, x, y);
	}
}

function adjustXCord(o){ //from Object or Entity or point
	//cos(theta) * (px-ox) - sin(theta) * (py-oy) + ox
	var cos = Math.cos(game.angle);
	var sin = Math.sin(game.angle);
	return cos*(o.positionX - game.cameraCenterX) - sin*(o.positionY - game.cameraCenterY) + game.cameraCenterX + game.cameraX;
	// return o.positionX + game.cameraX;
}

function adjustYCord(o){ //from Object or Entity or point
	//sin(theta) * (px-ox) + cos(theta) * (py-oy) + oy
	var cos = Math.cos(game.angle);
	var sin = Math.sin(game.angle);
	return sin*(o.positionX - game.cameraCenterX) + cos*(o.positionY - game.cameraCenterY) + game.cameraCenterY + game.cameraY;
	//return o.positionY + game.cameraY;
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

/*
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
*/

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
///end temp

onkeydown = onkeyup = function(e){
    e = e || event; // to deal with IE
	if(e.type == 'keydown'){
		game.map[e.keyCode] = true;
	} else {
		delete game.map[e.keyCode];
	}
	// console.log(game.map)
}
