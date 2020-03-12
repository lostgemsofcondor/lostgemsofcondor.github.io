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

var game = new Game();

var fpsMax = 60;
var fps = 0;
var adjust = 0;
var debug = new Debug();
var debugDrawing = false;

//var p = new Perlin();
//game.keyMap = {};
window.onload = startUp;

function startUp(){
	resize();
	drawMap();

	window.addEventListener("mousedown", handelMouseDown);
	window.addEventListener("mouseup", handelMouseUp);
	window.addEventListener("mousemove", handelMouseMove);
	window.addEventListener("resize", resize);

	canvas.oncontextmenu = function (e) {
		e.preventDefault();
	};


	
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
	drawOverlay();
	drawMiniMap();
	drawHud();

	debug.draw();
	//debugOld();
}


function debugOld(){

	drawDebugThings();
	addDebugText();
}

function drawMiniMap(){
	game.miniMap.redraw();
	addToContext(game.miniMap.canvas, game.miniMap.offsetX, game.miniMap.offsetY, game.miniMap.canvas.width, game.miniMap.canvas.height);
}

function drawHud(){
	game.hud.redraw();
	addToContext(game.hud.canvas, 0, 0, game.hud.canvas.width, game.hud.canvas.height);
}

function drawOverlay(){
	game.overlay.redraw();
	addToContext(game.overlay.canvas, 0, 0, game.overlay.canvas.width, game.overlay.canvas.height);
}

function drawObjects(){
	game.entityList.sort();
	//sorting gets handled after all movement 
	game.entityList.list.forEach(o => {
		try{
			var e = game.get(o.key);
			addSprite(e.sprite);
		} catch(err){
			console.log("could not draw sprite for " + e.constructor.name + ": " + o.key + "\n" + err.message)
		}
		if(e.drawHealth){
			drawHealth(e);
		}
	});
	// context.fillStyle = "#222222";
	var size = 48;
	context.font = "bold " + size + "px pixel_font";
	context.textAlign = "center";
	for(var i in game.text){
		var t = game.text[i];
		context.fillStyle = t.color;
		context.fillText(t.str, t.adjustXCord(), t.adjustYCord());
	}
}

function drawHealth(e){
	var width = (e.sprite.width + 48)/2;
	var x = e.sprite.adjustXCord() - width / 2;
	var y = e.sprite.adjustYCord() + 3;
	var height = 6;
	context.fillStyle = game.config.healthGreen;
	context.fillRect(x, y, width, height);
	
	context.fillStyle = game.config.healthRed;
	context.fillRect(x + width * e.health/e.maxHealth, y, width - width * e.health/e.maxHealth, height);
	
}

function copyMap(chunk){
	// var p = new Point(0, 0);
	var adjXCamera = game.cameraCenterX + game.cameraX;
	var adjYCamera = game.cameraCenterY + game.cameraY;
	var adjXZero = chunk.positionX + game.cameraX - chunk.offsetX;
	var adjYZero = chunk.positionY + game.cameraY - chunk.offsetY;
	context.save();
	context.translate(adjXCamera , adjYCamera);
	context.rotate(game.angle);
	context.translate(-adjXCamera, -adjYCamera);
	addToContext(chunk.canvas, adjXZero, adjYZero);
	context.restore();
}

function adjustCanvasSize(){
	canvas.width = game.width = game.zoom/canvasDiv.offsetHeight * canvasDiv.offsetWidth;
	canvas.height = game.height = game.zoom;
}

function resize(){
	adjustCanvasSize();
	game.hud.resize();
	game.overlay.resize();
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

function drawMap(){
	mapCanvas.width = 5000;
	mapCanvas.height = 5000;
}

onkeydown = onkeyup = function(e){
    e = e || event; // to deal with IE
	if(e.type == 'keydown'){
		game.keyMap[e.keyCode] = true;
	} else {
		delete game.keyMap[e.keyCode];
	}
}

function handelMouseDown(){
	var canvasX = event.clientX / canvasDiv.offsetWidth * canvas.width;
	var canvasY = event.clientY / canvasDiv.offsetHeight * canvas.height;
	//0 left, 1 middle, 2 right
	if(event.button == 0){
		game.mouse.clickLeft(canvasX, canvasY);
	}
	if(event.button == 2){
		game.mouse.clickRight(canvasX, canvasY);
	}
}

function handelMouseUp(){
	//0 left, 1 middle, 2 right
	if(event.button == 0){
		game.mouse.clickLeftRelease();
	}
	if(event.button == 2){
		game.mouse.clickRightRelease();
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

function correctMod(a, b){
	return ((a % b) + b) % b;
}
