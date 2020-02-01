var game;
var key = {};
/// constants

var keyUp = "87";
var keyDown = "83";
var keyLeft = "65";
var keyRight = "68";
var keyRotateClockwise = "81";
var keyRotateCounterClockwise = "69";
var keyResetRotation = "82";
var startDebug = "192";

var zoomOut = "189";
var zoomIn = "187";

/// end constants

function mainGameLoop(){
	game.incrementTick();
	game.bulletCollisionDetection();
	
	readKeys();
	handleRotate();
	handelZoom();
	handleMove();

	handleClicks();
	handleDebug();
	
	//game.updateAI();
	game.updateAllObjects();
	game.updateText();
	
	game.adjustCameraToPlayer();
	game.map.adjustChunks();

	game.spawns();

	setCookies();
	//game.entityList.sort();
}

function setCookies(){
	document.cookie = JSON.stringify(game.save);
}

function handleClicks(){
	if(game.mouse.left.down){
		if(game.mouse.onHud){
			game.hud.handleClick(game.mouse.x, game.mouse.y);
		} else {
			handleShooting();
		}
	}

}

function handelZoom(){
	if(key.zoomIn && game.zoom > 500){
		game.zoom -= 50;
		adjustCanvasSize();
		game.hud.resize();
	} else if(key.zoomOut && game.zoom < 5000){
		game.zoom += 50;
		adjustCanvasSize();
		game.hud.resize();
	}
}

function handleDebug(){
	if(key.startDebug){
		debug.setAllDebug(true);
	}
}

function handleShooting(){
	game.player.handelShoot(game.mouse.point.positionX, game.mouse.point.positionY);
}

function XNOR(a, b){
	return (a && !b) || (!a && b);
}

function handleRotate(){
	if(key.resetRotation){
		game.angle = Math.PI/4;
		game.zoom = 1080;
		adjustCanvasSize();
		game.hud.resize();
		drawTimeMax = 0; //for debug
		game.adjustAllSpriteDirections();
		return;
	}
	if(XNOR(key.rotateClockwise, key.rotateCounterClockwise)){
		if(key.rotateClockwise) {
			game.angle += game.rotateSpeed;
			game.adjustAllSpriteDirections();
		}
		if(key.rotateCounterClockwise) {
			game.angle -= game.rotateSpeed;
			game.adjustAllSpriteDirections();
		}
	}

	//temp
	var x = game.player.positionX;
	var y = game.player.positionY;
	if(Math.floor(x / 48) != tempX || Math.floor(y / 48) != tempY){
		//game.map.currentMap();
		tempX = Math.floor(x / 48);
		tempY = Math.floor(y / 48);
	}

	//end temp
}
var tempX = 0;
var tempY = 0;
function handleMove(){
	
	var angles = [null, 0, 180, null, 90, 45, 135, null, 270, 315, 225, null, null, null, null, null]; // udlr as binary
	var angle = angles[key.right + key.left*2 + key.down*4 + key.up*8];
	if(angle != null){
		var angleInRad = angle*Math.PI/180;
		game.player.angle = angleInRad - game.angle;
		//game.player.angle = angleInRad - game.angle;
		// game.player.positionY += Math.sin(game.player.angle)*game.player.speed;
		// game.player.positionX += Math.cos(game.player.angle)*game.player.speed;
		game.player.moving = true;
		// game.player.move();
	} else {
		game.player.moving = false;
	}

	//game.player.adjustSpriteDirection();	
}

function readKeys(){
	var keys = Object.keys(game.keyMap);
	key.up = keys.includes(keyUp);
	key.down = keys.includes(keyDown);
	key.left = keys.includes(keyLeft);
	key.right = keys.includes(keyRight);
	key.rotateClockwise = keys.includes(keyRotateClockwise);
	key.rotateCounterClockwise = keys.includes(keyRotateCounterClockwise);
	key.resetRotation = keys.includes(keyResetRotation);
	key.startDebug = keys.includes(startDebug);
	key.zoomOut = keys.includes(zoomOut);
	key.zoomIn = keys.includes(zoomIn);
}
