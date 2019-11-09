class Game {
	constructor(){
		game = this;
		this.keyMap = {};
		this.mouse = new Mouse();
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
		this.blockIO = false;
		this.paused = false;
		
		this.objects = []; //does not include player
		this.objectIDNext = 1;
		this.entityList = new EntityList();
		this.map = new Map();
		this.entityList.add(0); // Add player
		
		
		this.add(new Entity("player", 1, 350, -35, 48, 48, true));
		var m = 35;
		var c = 0;
		for(var i = 0; i < 10*m; i += m){
			for(var j = 0; j < 10*m; j += m){
				var AI = new Entity("player", c*2+1, i, j, 48, 48, true);
				//AI.AI = new CircleAI(c++, 200);
				this.add(AI);
				//this.add(new Entity("player", 1, i, j, 48, 48, true));
			}
		}
		
		var AI1 = new Entity("player", 5, 100, 100, 48, 48, true);
		var AI2 = new Entity("player", 5, 100, 100, 48, 48, true);
		var AI3 = new Entity("player", 5, 100, 100, 48, 48, true);
		this.add(AI1);
		this.add(AI2);
		this.add(AI3);
		AI1.AI = new CircleAI(AI2.key, 200);
		AI2.AI = new CircleAI(AI3.key, 200);
		AI3.AI = new CircleAI(AI1.key, 200);
		var axe = new Entity("./sprites/weapon/axe.png", 0, 0, 0, 96, 96, false, 0);
		axe.AI = new WeaponAI();
		this.add(axe);

		
		var name = new Entity("player", 5, 100, 100, 48, 48, true);
		this.add(name);
		name.AI = new CircleAI(game.player.key, 200);

		//this.vectorField();
		// var AI = new Entity("player", 1, 350, -35, 48, 48, true);
		// AI.AI = new CircleAI(0, 200);
		// this.add(AI);
		
	}


	vectorField(){
		var m = 35;
		for(var i = 0; i < 50*m; i += m){
			for(var j = 0; j < 50*m; j += m){
				var AI = new Entity("empty", 1, i, j, 0, 0, false)
				var AI = new Entity("empty", 1, i, j, 0, 0, false)
				AI.AI = new CircleAI(0, 200); // AI to implement
				this.add(AI);
			}
		}
	}

	add(object){
		object.key = this.objectIDNext; // Player reserves the 0th space
		this.objectIDNext++;
		this.objects[object.key] = object;
		
		this.entityList.add(object.key);
	}

	delete(object){ //todo
		this.entityList.delete(object.key)
		delete this.objects[object.key];
	}

	get(key){
		if(key == 0){
			return this.player;
		} else {
			return this.objects[key];
		}
			
	}

	adjustAllSpriteDirections(){
		this.player.adjustSpriteDirection();
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
