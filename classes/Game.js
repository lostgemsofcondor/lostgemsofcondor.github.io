class Game {
	constructor(){
		this.map = {};
		this.player = new Player(playerSpeed);
		this.width;
		this.height;
		this.cameraX = 0;
		this.cameraY = 0;
		this.cameraCenterX = 0;
		this.cameraCenterY = 0;
		this.angle = 0;
		this.rotateSpeed = rotateSpeed/180 * Math.PI;

		this.objects = [];

		//this.objects.push(new Entity("player", 0, 200, 200, 48, 48));
		//this.objects.push(new Entity("player", 0, 2000, 2000, 48, 48));
		var m = 35;
		for(var i = 0; i < 100*m; i += m){
			for(var j = 0; j < 50*m; j += m){
				this.objects.push(new Entity("player", 1, i, j, 48, 48, true));
			}
		}

	}

	adjustAllSpriteDirections(){
		this.player.entity.adjustSpriteDirection();
		this.objects.forEach(e => e.adjustSpriteDirection());
	}
	
	adjustCameraToPlayer(){
		this.cameraCenterX = this.player.positionX;
		this.cameraCenterY = this.player.positionY;
		this.adjustCamera();
	}
	
	adjustCamera(){
		this.cameraX = this.width / 2 - this.cameraCenterX;
		this.cameraY = this.height / 2 - this.cameraCenterY;
		
	}

	moveAllObjects(){
		game.objects.forEach(e => e.move());
	}

}
