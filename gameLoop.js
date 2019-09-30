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

/// end constants

function mainGameLoop(){
	game.gameTick++;
	readKeys();
	handleRotate();
	handleMove();
	game.updateAI();
	game.moveAllObjects();

	game.adjustCameraToPlayer();
}

/*
function mapActions(){

}
*/
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
}

function handleMove(){
	
	var angles = [null, 0, 180, null, 90, 45, 135, null, 270, 315, 225, null, null, null, null, null]; // udlr as binary
	var angle = angles[key.right + key.left*2 + key.down*4 + key.up*8];
	if(angle != null){
		var angleInRad = angle*Math.PI/180;
		game.player.entity.angle = angleInRad - game.angle;
		//game.player.entity.angle = angleInRad - game.angle;
		// game.player.positionY += Math.sin(game.player.entity.angle)*game.player.entity.speed;
		// game.player.positionX += Math.cos(game.player.entity.angle)*game.player.entity.speed;
		game.player.entity.moving = true;
		game.player.entity.move();
	} else {
		game.player.entity.moving = false;
	}

	//game.player.entity.adjustSpriteDirection();	
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
}
