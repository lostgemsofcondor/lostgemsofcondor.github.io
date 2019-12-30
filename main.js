var canvas = document.getElementById("mainCanvas");
var canvasDiv = document.getElementById("mainCanvasDiv")
var context = canvas.getContext("2d");

var mapCanvas = addCanvas();
// var mapCanvas = document.getElementById("mapCanvas");
// var mapConvasDiv = document.getElementById("mapCanvasDiv")
var mapContext = mapCanvas.getContext("2d");

var drawTime = 0;
var frameTime = 0;
var drawTimeMax = 0;


var fpsMax = 60;
var fps = 0;
var adjust = 0;
var debug = false;
var debugDrawing = false;

//var p = new Perlin();
var game = new Game();
//game.keyMap = {};
window.onload = startUp;

function startUp(){
	resize();
	drawMap();

	window.addEventListener("mousedown", handelMouseDown);
	window.addEventListener("mouseup", handelMouseUp);
	window.addEventListener("mousemove", handelMouseMove);
	//window.addEventListener("keypress", keypress, false);
	window.addEventListener("resize", resize);
	// canvas.oncontextmenu = function (e) {
	// 	e.preventDefault();
	// };
	
	main();
}

async function main(){
	var frameTimes = [];
	var count = 0;
	while(true){
		var fast = false;
		var start = performance.now();

		gameLoop();

		await sleep(0)
		drawTime = performance.now() - start;
		if(drawTime < 1/(fpsMax) * 1000){
			await sleep((1/(fpsMax) * 1000) - drawTime + adjust);
			fast = true;
		} else {
			// await sleep(0)
		}
		frameTime = performance.now() - start;
		if(frameTime > drawTimeMax){
			drawTimeMax = frameTime;
		}
		frameTimes.push(frameTime);
		count++;
		if(frameTimes.length > 60){
			frameTimes.shift()
		}
		fps = frameTimes.length/frameTimes.reduce((a, b) =>  a + b)*1000;
		if(count % 60 == 0){
			count = 0;
			
			if(fps - 1 > fpsMax && fast){
				adjust += game.config.adjustment;
				if(fps - .4 > fpsMax){
					adjust += game.config.adjustment;
				}
			}
			if(fps + .5 < fpsMax && fast){
				adjust -= game.config.adjustment;
				if(fps + .2 < fpsMax){
					adjust -= game.config.adjustment;
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
	mainGameLoop();
	redraw();
	game.blockIO = false;
}

function redraw(){
	clearCanvas();
	draw();
}

function clearCanvas(){
	context.clearRect(0, 0, canvas.width, canvas.height);
}

function draw(){
	game.map.chunks.forEach(c => {
		copyMap(c);
	})
	//copyMap(game.map.chunks[0].canvas);
	drawObjects();
	drawHud();

	drawDebugThings();
	addDebugText();
}

function drawHud(){
	game.hud.draw();

	addToContext(game.hud.canvas, 0, 0, game.hud.canvas.width, game.hud.canvas.height);

}

function drawObjects(){
	game.entityList.sort();
	//sorting gets handled after all movement 
	game.entityList.list.forEach(o => {
		var e = game.get(o.key);
		addSprite(e.sprite);
		if(e.drawHealth){
			drawHealth(e);
		}
	});
	// context.fillStyle = "#222222";
	var size = 48;
	context.font = "bold " + size + "px Stencil Std";
	context.textAlign = "center";
	for(var i in game.text){
		var t = game.text[i];
		// var text = context.measureText('foo');
		// context.fillStyle = game.config.gray;
		// context.fillRect(t.adjustXCord() - text.width/2, t.adjustYCord() - size, text.width, size);
		context.fillStyle = t.color;
		context.fillText(t.str, t.adjustXCord(), t.adjustYCord());
	}
}

function drawHealth(e){
	var x = e.sprite.adjustXCord() - e.sprite.width / 2;
	var y = e.sprite.adjustYCord() + 3;
	var width = e.sprite.width;
	var height = 6;
	context.fillStyle = game.config.healthGreen;
	context.fillRect(x, y, width, height);
	
	context.fillStyle = game.config.healthRed;
	context.fillRect(x + width * e.health/e.maxHealth, y, width - width * e.health/e.maxHealth, height);
	
}

function copyMap(chunk){
	// var p = new Point(0, 0);
	var adjXPlayer = game.cameraCenterX + game.cameraX;
	var adjYPlayer = game.cameraCenterY + game.cameraY;
	var adjXZero = chunk.positionX + game.cameraX - game.map.tileSize/2;
	var adjYZero = chunk.positionY + game.cameraY - game.map.tileSize/2;
	context.save();
	context.translate(adjXPlayer , adjYPlayer);
	context.rotate(game.angle);
	context.translate(-adjXPlayer, -adjYPlayer);
	addToContext(chunk.canvas, adjXZero, adjYZero);
	//context.drawImage(mapCanvas, 0, 0);
	//context.translate(-positionX, -positionY);
	context.restore();
}

function adjustCanvasSize(){
	canvas.width = game.width = game.zoom/canvasDiv.offsetHeight * canvasDiv.offsetWidth;
	canvas.height = game.height = game.zoom;
}

function resize(){
	adjustCanvasSize();
	game.hud.resize();
	//blueprint.draw();
	draw();
}

function addSprite(sprite){
	if(sprite.rotates){
		addToContext(sprite.getImg(), sprite.adjustXCordSprite(), sprite.adjustYCordSprite(), sprite.width, sprite.height);
	} else {
		context.save();
		context.translate(sprite.adjustXCord() , sprite.adjustYCord());
		context.rotate(sprite.angle + game.angle);
		addToContext(sprite.getImg(), -sprite.width/2, -sprite.height/2, sprite.width, sprite.height);
		context.restore();
	}
}

function addToContext(img, x, y, width = null, height = null){
	if(width && height){
		context.drawImage(img, x, y, width, height)
	} else {
		context.drawImage(img, x, y);
	}
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

function drawMap(){
	
	mapCanvas.width = 5000;
	mapCanvas.height = 5000;
	//game.map.currentMap();
	//drawGrass();
}

///temp
// var img = new Image();
// img.src = "./sprites/background/grassBasicDebug.png";
// var water = new Image();
// water.src = "./sprites/background/waterBasic.png";
// function drawGrass(){
	// var x = 0;
	// var y = 0;
	// var width = 96;
	// var height = 96;
	// var sum =0;
	// var sum2 =0;
	// for(var i = x; i <= x + width*30; i += width/2){
		// sum2++;
		// for(var j = y; j <= y + height*30; j += height/2){
			// // rotateAndPaintImage(img, 10, i, j, width, height);
			// if((i >= 96*4 && i <= 96*6 && j >= 96*3 && j <= 96*5) || (j >= 96*12 && j <= 96*14)){
				// mapContext.drawImage(water, i, j, width, height);

			// } else {

				// mapContext.drawImage(img, i, j, width, height);
			// }
			// sum++;
			
		// }
	// }
// }


var count = 0;
var seconds = 0;
function counter(){
	count++;
	if(count >= 60){
		count = 0; 
		seconds++;
		
	}
	context.fillStyle = "#000000";
	context.font = "60px Verdana,sans-serif";
	context.fillText(fps.toFixed(0), 300, 50);
	// context.fillText(seconds, 300, 50);
}
///end temp

onkeydown = onkeyup = function(e){
    e = e || event; // to deal with IE
	if(e.type == 'keydown'){
		game.keyMap[e.keyCode] = true;
	} else {
		delete game.keyMap[e.keyCode];
	}
	// console.log(game.map)
}

function handelMouseDown(){
	var canvasX = event.clientX / canvasDiv.offsetWidth * canvas.width;
	var canvasY = event.clientY / canvasDiv.offsetHeight * canvas.height;
	//0 left, 1 middle, 2 right
	if(event.button == 0){
		game.mouse.clickDownLeft(canvasX, canvasY);
	}
	if(event.button == 2){
		game.mouse.clickDownRight(canvasX, canvasY);
	}
}

function handelMouseUp(){
	//0 left, 1 middle, 2 right
	if(event.button == 0){
		game.mouse.clickUpLeft();
	}
	if(event.button == 2){
		game.mouse.clickUpRight();
	}
}

function handelMouseMove(){
	var canvasX = event.clientX / canvasDiv.offsetWidth * canvas.width;
	var canvasY = event.clientY / canvasDiv.offsetHeight * canvas.height;
	
	game.mouse.move(canvasX, canvasY);
}

function addCanvas(){
	var canvas = document.createElement("canvas");
	return canvas;
}
/*
var num = 0;
class t {
	constructor(){
		this.x = Math.random();
	}

	get i(){
		var x = [];
		for(var i = 0; i < 100; i++){
			x.push(Math.random());
		}
		x.sort();
		num++;
		return this.x;
	}
}

function test(){
	var x = [];
	for(var i = 0; i < 100; i++){
		x.push(new t());
	}
	x.sort((a,b) => (a.i - b.i));
	console.log(num);
}

*/
