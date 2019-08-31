var game;
/// constants

var keyUp = "87";
var keyDown = "83";
var keyLeft = "65";
var keyRight = "68";

/// end constants

function mainGameLoop(){
	mapActions();
}

function mapActions(){
	var keys = Object.keys(game.map);
	var up = keys.includes(keyUp);
	var down = keys.includes(keyDown);
	var left = keys.includes(keyLeft);
	var right = keys.includes(keyRight);
	if(up){
		game.player.positionY += game.player.speed;
		game.player.sprite.direction = "up"; 
	}
	if(down){
		game.player.positionY -= game.player.speed;
		game.player.sprite.direction = "down"; 
	}
	if(left){
		game.player.positionX += game.player.speed;
		game.player.sprite.direction = "left"; 
	}
	if(right){
		game.player.positionX -= game.player.speed;
		game.player.sprite.direction = "right"; 
	}
}


