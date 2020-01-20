class Game {
	constructor(){
		game = this;
		this.keyMap = {};
		this.mouse = new Mouse();
		this.config = new Config();
		
		var playerSpeed = 15;
		this.player = new Player().setImage("player").setSpeed(playerSpeed).setDimensions(48, 48);
		this.width;
		this.height;
		this.zoom = 1080;
		this.cameraX = 0;
		this.cameraY = 0;
		this.cameraCenterX = 0;
		this.cameraCenterY = 0;
		this.angle = Math.PI/4;
		this.rotateSpeed = this.config.rotateSpeed/180 * Math.PI;
		this.gameTick = 0;
		this.mainTick = 0;
		this.paused = false;
		
		this.entities = []; //does not include player
		this.entitieIDNext = 1;
		this.entityList = new EntityList();
		this.text = [];
		this.textIDNext = 0;
		this.map = new Map();
		this.entityList.add(0); // Add player
		
		this.loadSave();
		this.hud = new Hud();
		this.itemSprites = new ItemSprites();
		this.inventory = new Inventory(4, 5);

        this.solids = null;
		this.solidsTickUpdated = -1;
		
		// ********************* Start Temp Enemy creation ****************
		
		// new Enemy("player", 1, 350, -35, 48, 48, true);
		var m = 35;
		for(var i = 0; i < 10*m; i += m){
			for(var j = 0; j < 10*m; j += m){
				var e = new Enemy(i, j).setImage("player").setDimensions(48, 48).setMoving(true).setSpeed(1);
				e.AI = new CombineAI(
				            new ShootAI(),
				            new BuilderAI(3000, 6000,
				             new CircleAI(0, 200, Math.random() > .5),
							 new AI()));
				//AI.AI = new CircleAI(c++, 200);
				//this.add(AI);
				//this.add(new Entity("player", 1, i, j, 48, 48, true));
			}
		}
		
		var m = 100;
		for(var i = 500; i < 500 + 5*m; i += m){
			for(var j = 800; j < 800 + 5*m; j += m){
				//var tree = new Enemy("./sprites/trees/tree.png", 0, i, j, 60, 60, false, 0, true);
				var tree = new Enemy(i, j).setImage("./sprites/trees/tree.png", 0).setDimensions(60, 60).setSolid(true);
			}
		}
		
		// var AI1 = new Enemy("player", 5, 100, 100, 48, 48, true);
		// var AI2 = new Enemy("player", 5, 100, 100, 48, 48, true);
		// var AI3 = new Enemy("player", 5, 100, 100, 48, 48, true);

		var AI1 = new Enemy(100, 100).setImage("player").setDimensions(48, 48).setMoving(true).setSpeed(5);
		var AI2 = new Enemy(100, 100).setImage("player").setDimensions(48, 48).setMoving(true).setSpeed(5);
		var AI3 = new Enemy(100, 100).setImage("player").setDimensions(48, 48).setMoving(true).setSpeed(5);
		AI1.AI = new CircleAI(AI2.key, 200);
		AI2.AI = new CircleAI(AI3.key, 200);
		AI3.AI = new CircleAI(AI1.key, 200);
		// var axe = new Entity("./sprites/weapon/axe.png", 0, 0, 0, 96, 96, false, 0, false);
		// axe.AI = new WeaponAI();
		// this.add(axe);

		

		//this.vectorField();
		
	}

	incrementTick(){
		if(!this.paused){
			this.gameTick++;
		}
		this.mainTick++;
	}
	
	loadSave(){
		
        // do this in Save.js
        try{
            //this.save = JSON.parse('{"inventory":[{"itemSpriteKey":"arrow","location":"inventory","amount":1,"x":0,"y":0}],"itemIdNext":1}');
            this.save = JSON.parse(document.cookie);
        } catch {
			console.log("error with save conversion");
			this.save = new Save();
        }	
        console.log(document.cookie);
	}

	vectorField(){
		var m = 35;
		for(var i = 0; i < 50*m; i += m){
			for(var j = 0; j < 50*m; j += m){
				// var vector = new Entity("empty", 1, i, j, 0, 0, false);
				var vector = new Entity(i, j).setImage("empty").setDimensions(0, 0).setMoving(false);
				vector.AI = new CircleAI(0, 100, false); // AI to implement
				this.add(vector);
			}
		}
	}

	add(object){
		object.key = this.entitieIDNext; // Player reserves the 0th space
		this.entitieIDNext++;
		this.entities[object.key] = object;
		
		this.entityList.add(object.key);
	}

	delete(object){
		this.entityList.delete(object.key)
		delete this.entities[object.key];
	}
	
	get(key){
		if(key == 0){
			return this.player;
		} else {
			return this.entities[key];
		}
	}
	
	addText(text){
		text.key = this.textIDNext;
		this.text[this.textIDNext++] = text;		
	}
	
	deleteText(text){
		delete this.text[text.key];
	}
	
	adjustAllSpriteDirections(){
		this.player.adjustSpriteDirection();
		for(var i in this.entities){
			this.entities[i].adjustSpriteDirection();
		}
	}
	
	adjustCameraToPlayer(){
		this.cameraCenterX = this.player.positionX;
		this.cameraCenterY = this.player.positionY;
		this.adjustCamera();
	}
	
	adjustCamera(){
		this.cameraX = (this.width - this.hud.width) / 2 - this.cameraCenterX ;
		this.cameraY = this.height*.7 - this.cameraCenterY;
		
	}

	updateAllObjects(){
		// for(var i in this.entities){
		// 	this.entities[i].update();
		// }
		//update player too
		if(!this.paused){
			this.entityList.list.forEach(o => {
				var e = this.get(o.key);
				e.update();
			});
		} else if(debug.overRideMove){
			game.player.update();
		}
	}

	// updateAI(){
		
	// 	for(var i in this.entities){
	// 		var e = this.entities[i];
	// 		if(e.AI){
	// 			e.AI.calculate(e);
	// 		}
	// 	}
	// }

	bulletCollisionDetection(){
		// var vert = -99999;
		// this.entityList.list.forEach(o => {
			// if(vert > o.vertical){
				// console.log("failed");
			// }
			// vert = o.vertical;
		// });
		
		// this.entityList.list and enemies is sorted here
		// can do binary search

		var enemies = this.getEnemies();
		var bullets = this.getBullets();

		for(var j = 0; j < bullets.length; j++){

			//bullet and enemy collision
			for(var i = 0; i < enemies.length; i++){
				if(bullets[j] && enemies[i] && bullets[j].friendly && bullets[j].collides(enemies[i])){
					enemies[i].struck(bullets[j]);
					this.delete(bullets[j]);
					delete bullets[j];
					j++
				}
			}
			//bullet and player collision
			if(bullets[j] && !bullets[j].friendly && bullets[j].collides(this.player)){
				this.player.struck(bullets[j]);
				this.delete(bullets[j]);
				delete bullets[j];
				j++
			}

		}
		
		
		// enemies.forEach(e => {
			// bullets.forEach(b => {
				// if(b.collides(e)){
					// this.delete(b);
					// this.delete(e);
				// }
			// });
		// });

	}

	getEnemies(){
		var enemies = [];
		for(var i in this.entities){
			var e = this.entities[i];
			if(e instanceof Enemy){
				enemies.push(e);
			}
		}
		return enemies;
	}
	
	getBullets(){
		var bullets = [];
		for(var i in this.entities){
			var e = this.entities[i];
			if(e instanceof Bullet){
				bullets.push(e);
			}
		}
		return bullets;
	}
		
    getSolids(){
        if(this.tickUpdated >= this.gameTick){
			return this.solids;
		}
		
		this.solids = [];
		for(var i in this.entities){
			var e = this.entities[i];
			if(e.solid){
				this.solids.push(e);
			}
		}
		this.tickUpdated = this.gameTick;
        return this.solids;
    }

	updateText(){
		for(var i in this.text){
			var t = this.text[i];
			if(this.gameTick >= t.deathTick){
				this.deleteText(t);
			} else {
				t.update();
			}
		}
	}


}
