function mainGameLoop(){
	game.incrementTick();
	game.bulletCollisionDetection();
	game.pickUpItems();
	
	handleRotate();
	handelZoom();
	handleMove();

	handleClicks();
	handleDebug();
	
	//game.updateAI();
	game.updateAllObjects();
	game.updateText();
	for(var i in game.buttons){
		game.buttons[i].update()
	}
	
	game.adjustCameraToPlayer();
	game.map.adjustChunks();

	game.spawns();

	game.save.save();
	//game.entityList.sort();
}

function handleClicks(){
	if(game.mouse.left.down){
		if(game.mouse.onHud){
			game.hud.handleClick(game.mouse.x, game.mouse.y);
		} else {
			handleShooting();
		}
	}
	if(game.mouse.left.end){
		if(game.mouse.onHud){
			game.hud.handleClick(game.mouse.x, game.mouse.y);
		}
	}
}

function handelZoom(){
	if(game.keyboard.zoomIn.down && game.zoom > 500){
		game.zoom -= 50;
		adjustCanvasSize();
		game.hud.resize();
	} else if(game.keyboard.zoomOut.down && game.zoom < 5000){
		game.zoom += 50;
		adjustCanvasSize();
		game.hud.resize();
	}
}

function handleDebug(){
	if(game.keyboard.debug.start){
		if(debug.debugging){
			debug.setAllDebug(false);
		} else {
			debug.setAllDebug(true);
		}
	}
}

function handleShooting(){
	game.player.handelShoot(game.mouse.point.positionX, game.mouse.point.positionY);
}

function XNOR(a, b){
	return (a && !b) || (!a && b);
}

function handleRotate(){
	if(game.keyboard.resetRotation.down){
		game.angle = Math.PI/4;
		game.zoom = 1080;
		adjustCanvasSize();
		game.hud.resize();
		drawTimeMax = 0; //for debug
		game.adjustAllSpriteDirections();
		return;
	}
	if(XNOR(game.keyboard.rotateClockwise.down, game.keyboard.rotateCounterClockwise.down)){
		if(game.keyboard.rotateClockwise.down) {
			game.angle += game.rotateSpeed;
			game.adjustAllSpriteDirections();
		}
		if(game.keyboard.rotateCounterClockwise.down) {
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
	var angle = angles[game.keyboard.right.down + game.keyboard.left.down*2 + game.keyboard.down.down*4 + game.keyboard.up.down*8];
	if(angle != null){

		if(game.player.running || game.keyboard.spaceBar.start){
			if(game.player.running){
				if(game.player.lastJump >= game.mainTick){
					game.player.running = true;
				} else {
					game.player.running = false;
				}
			} else {
				game.player.running = true;
				game.player.lastJump = game.mainTick + game.player.jumpLength;
			}
		}

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
