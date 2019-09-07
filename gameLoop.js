var game;
var key = {};
/// constants

var keyUp = "87";
var keyDown = "83";
var keyLeft = "65";
var keyRight = "68";
var keyRotateClockwise = "81";
var keyRotateCounterClockwise = "69";

/// end constants

function mainGameLoop(){
	readKeys();
	handleRotate();
	handleMove();

	adjustCamera();
}

/*
function mapActions(){

}
*/

function handleRotate(){
	if(key.rotateClockwise) {
		game.angle += game.rotateSpeed;
	}
	if(key.rotateCounterClockwise) {
		game.angle -= game.rotateSpeed;
	}
}

function handleMove(){
	
	var angles = [null, 0, 180, null, 90, 45, 135, null, 270, 315, 225, null, null, null, null, null]; // udlr as binary
	var angle = angles[key.right + key.left*2 + key.down*4 + key.up*8];
	if(angle != null){
		var angleInRad = angle*Math.PI/180;
		game.player.entity.angle = angleInRad;
		game.player.positionY += Math.sin(game.player.entity.angle)*game.player.entity.speed;
		game.player.positionX += Math.cos(game.player.entity.angle)*game.player.entity.speed;
	}

	game.player.entity.adjustSpriteDirection();	
}

function readKeys(){
	var keys = Object.keys(game.map);
	key.up = keys.includes(keyUp);
	key.down = keys.includes(keyDown);
	key.left = keys.includes(keyLeft);
	key.right = keys.includes(keyRight);
	key.rotateClockwise = keys.includes(keyRotateClockwise);
	key.rotateCounterClockwise = keys.includes(keyRotateCounterClockwise);
}

function adjustCamera(){
	game.cameraX = game.width / 2 - game.player.positionX;
	game.cameraY = game.height / 2 - game.player.positionY;
}

