class GameLoopService {
	constructor(){

	}

	mainGameLoop(){
		game.incrementTick();
		game.bulletCollisionDetection();
		game.pickUpItems();
		
		this.handleRotate();
		this.handelZoom();
		this.handleMove();

		this.handleClicks();
		this.handleDebug();
		
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

	handleClicks(){
		if(game.mouse.left.down){
			if(game.mouse.onHud){
				game.hud.handleClick(game.mouse.x, game.mouse.y);
			} else {
				this.handleShooting();
			}
		}
		if(game.mouse.left.end){
			if(game.mouse.onHud){
				game.hud.handleClick(game.mouse.x, game.mouse.y);
			}
		}
	}

	handelZoom(){
		if(game.keyboard.zoomIn.down && game.zoom > 500){
			game.zoom -= 50;
			main.adjustCanvasSize();
			game.hud.resize();
		} else if(game.keyboard.zoomOut.down && game.zoom < 5000){
			game.zoom += 50;
			main.adjustCanvasSize();
			game.hud.resize();
		}
	}

	handleDebug(){
		if(game.keyboard.debug.start){
			if(main.debug.debugging){
				main.debug.setAllDebug(false);
			} else {
				main.debug.setAllDebug(true);
			}
		}
	}

	handleShooting(){
		game.player.handelShoot(game.mouse.point.positionX, game.mouse.point.positionY);
	}

	XNOR(a, b){
		return (a && !b) || (!a && b);
	}

	handleRotate(){
		if(game.keyboard.resetRotation.down){
			game.angle = Math.PI/4;
			game.zoom = 1080;
			main.adjustCanvasSize();
			game.hud.resize();
			drawTimeMax = 0; //for debug
			game.adjustAllSpriteDirections();
			return;
		}
		if(this.XNOR(game.keyboard.rotateClockwise.down, game.keyboard.rotateCounterClockwise.down)){
			if(game.keyboard.rotateClockwise.down) {
				game.angle += game.rotateSpeed;
				game.adjustAllSpriteDirections();
			}
			if(game.keyboard.rotateCounterClockwise.down) {
				game.angle -= game.rotateSpeed;
				game.adjustAllSpriteDirections();
			}
		}
	}

	handleMove(){
		
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
}
