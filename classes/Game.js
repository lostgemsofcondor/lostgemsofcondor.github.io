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
		
		
		new Enemy("player", 1, 350, -35, 48, 48, true);
		var m = 35;
		for(var i = 0; i < 10*m; i += m){
			for(var j = 0; j < 10*m; j += m){
				new Enemy("player", 1, i, j, 48, 48, true);
				//AI.AI = new CircleAI(c++, 200);
				//this.add(AI);
				//this.add(new Entity("player", 1, i, j, 48, 48, true));
			}
		}
		
		var AI1 = new Enemy("player", 5, 100, 100, 48, 48, true);
		var AI2 = new Enemy("player", 5, 100, 100, 48, 48, true);
		var AI3 = new Enemy("player", 5, 100, 100, 48, 48, true);
		AI1.AI = new CircleAI(AI2.key, 200);
		AI2.AI = new CircleAI(AI3.key, 200);
		AI3.AI = new CircleAI(AI1.key, 200);
		var axe = new Entity("./sprites/weapon/axe.png", 0, 0, 0, 96, 96, false, 0);
		axe.AI = new WeaponAI();
		this.add(axe);

		
		var name = new Enemy("player", 5, 100, 100, 48, 48, true);
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

	delete(object){
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

	bulletCollisionDetection(){
		var vert = -99999;
		game.entityList.list.forEach(o => {
			if(vert > o.vertical){
				console.log("failed");
			}
			vert = o.vertical;
		});
		
		// game.entityList.list and enemies is sorted here
		// can do binary search

		var enemies = this.getEnemies();
		var bullets = this.getBullets();

		bullets.forEach(b => {
			enemies.forEach(e => {
				if(b.collides(e)){
					this.delete(b);
					this.delete(e);
				}
			});
		});

	}

	getEnemies(){
		var enemies = [];
		game.objects.forEach(e => {
			if(e instanceof Enemy){
				enemies.push(e);
			}
		});
		return enemies;
	}
	
	getBullets(){
		var bullets = [];
		game.objects.forEach(e => {
			if(e instanceof Bullet){
				bullets.push(e);
			}
		});
		return bullets;
	}


}