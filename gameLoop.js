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

/// end constants

function mainGameLoop(){
	game.blockIO = true; // gets set to false after redraw
	game.gameTick++;
	game.bulletCollisionDetection();
	
	readKeys();
	handleRotate();
	handleMove();
	
	shootArrow();
	handleDebug();
	
	game.updateAI();
	game.moveAllObjects();
	game.updateText();
	
	game.adjustCameraToPlayer();
	game.map.adjustChunks();
	//game.entityList.sort();
}

function handleDebug(){
	if(key.startDebug){
		debug = true;
		debugDrawing = true;
	}
}

function shootArrow(){
	if(game.mouse.leftClickDownStart || (debug && game.mouse.leftClickDown)){
		
		var angle =  Math.atan2(game.mouse.point.positionY - game.player.positionY, game.mouse.point.positionX - game.player.positionX);
		// var arrow = new Bullet("./sprites/bullets/arrows/arrowGreen.png", 10, game.player.positionX, game.player.positionY, 48, 48, true, angle + Math.PI/4, Math.random() > .3);
		var arrow = new Bullet(game.player.positionX, game.player.positionY).setImage("./sprites/bullets/arrows/arrowGreen.png", angle + Math.PI/4).setSpeed(10).setDimensions(48, 48).setRotates(false);
		arrow.AI = new BulletAI(arrow, angle, 100);
		// game.add(arrow);
	}
}

function XNOR(a, b){
	return (a && !b) || (!a && b);
}

function handleRotate(){
	if(key.resetRotation){
		game.angle = 0;
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
		game.player.move();
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
}
