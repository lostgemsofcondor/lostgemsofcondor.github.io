var game;
/// constants

var keyUp = "87";
var keyDown = "83";
var keyLeft = "65";
var keyRight = "68";

/// end constants

function mainGameLoop(){
	handleMove();

	adjustCamera();
}

/*
function mapActions(){

}
*/

function handleMove(){
	var angles = [null, 0, 180, null, 90, 45, 135, null, 270, 315, 225, null, null, null, null, null]; // udlr as binary
	var keys = Object.keys(game.map);
	var up = keys.includes(keyUp);
	var down = keys.includes(keyDown);
	var left = keys.includes(keyLeft);
	var right = keys.includes(keyRight);

	var angle = angles[right + left*2 + down*4 + up*8];
	if(angle != null){
		var angleInRad = angle*Math.PI/180;
		game.player.entity.angle = angleInRad;
		game.player.positionY += Math.sin(game.player.entity.angle)*game.player.entity.speed;
		game.player.positionX += Math.cos(game.player.entity.angle)*game.player.entity.speed;
	}

	game.player.entity.adjustSpriteDirection();
	/*
	if(up){
		game.player.positionY -= game.player.speed;
		game.player.entity.sprite.direction = "up";
	}
	if(down){
		game.player.positionY += game.player.speed;
		game.player.entity.sprite.direction = "down"; 
	}
	if(left){
		game.player.positionX -= game.player.speed;
		game.player.entity.sprite.direction = "left"; 
	}
	if(right){
		game.player.positionX += game.player.speed;
		game.player.entity.sprite.direction = "right"; 
	}
	*/
	
}


function adjustCamera(){
	game.cameraX = game.width / 2 - game.player.positionX;
	game.cameraY = game.height / 2 - game.player.positionY;
}

