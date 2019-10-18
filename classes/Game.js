class Game {
	constructor(){
		game = this;
		this.keyMap = {};
		this.player = new Player(playerSpeed);
		this.width;
		this.height;
		this.cameraX = 0;
		this.cameraY = 0;
		this.cameraCenterX = 0;
		this.cameraCenterY = 0;
		this.angle = 0;
		this.rotateSpeed = rotateSpeed/180 * Math.PI;
		this.gameTick = 0;
		
		this.objects = [];
		this.entityList = new EntityList();
		this.map = new Map();
		this.entityList.add(0); // Add player
		
		
		this.add(new Entity("player", 1, 350, -35, 48, 48, true));
		var m = 35;
		var c = 0;
		for(var i = 0; i < 10*m; i += m){
			for(var j = 0; j < 50*m; j += m){
				var AI = new Entity("player", c*2+1, i, j, 48, 48, true);
				AI.AI = new CircleAI(c++, 200);
				this.add(AI);
				//this.add(new Entity("player", 1, i, j, 48, 48, true));
			}
		}

		var axe = new Entity("./sprites/weapon/axe.png", 0, 0, 0, 96, 96, false, 0);
		axe.AI = new WeaponAI();
		this.add(axe);
		//this.vectorField();
		// var AI = new Entity("player", 1, 350, -35, 48, 48, true);
		// AI.AI = new CircleAI(0, 200);
		// this.add(AI);
		
	}


	vectorField(){
		var m = 35;
		for(var i = 0; i < 50*m; i += m){
			for(var j = 0; j < 50*m; j += m){
				var AI = new Entity("player", 1, i, j, 0, 0, false)
				AI.AI = new CircleAI(0, 500); // AI to implement
				this.add(AI);
			}
		}
	}

	add(object){
		object.key = this.objects.length + 1; // Player reserves the 0th space
		this.objects.push(object);

		this.entityList.add(object.key);
	}

	delete(object){ //todo

	}

	get(key){
		if(key == 0){
			return this.player.entity;
		} else {
			return this.objects[key - 1];
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

	updateAI(){
		game.objects.forEach(e => {
			if(e.AI){
				e.AI.calculate(e);
			}
		});
	}
}
