class Game {
	constructor(){
		game = this;
		this.buttons = [];
		this.keyMap = {};
		this.config = new Config();
		this.keyboard = new Keyboard();
		this.mouse = new Mouse();
		this.sounds = new Sounds();
		this.dropTableService = new DropTableService();
		this.spawnService = new SpawnService();
		this.bulletBuilder = new BulletBuilder();
		this.imageBuilder = new ImageBuilder();
		this.gameLoopService = new GameLoopService();
		this.font = new Font();
		
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

		
		var playerSpeed = 7;
		this.player = new Player(0, 0)
			.setImage("player")
			.setSpeed(playerSpeed)
			.setDimensions(48, 48)
			.setMaxHealth(20)
			.setLight("large")
			.setHitSound(this.sounds.playerHit);
		this.entities = []; //does not include player
		this.entitieIDNext = 1;
		this.entityList = new EntityList();
		
		this.text = [];
		this.textIDNext = 0;
		this.map = new Map();
		this.entityList.add(0); // Add player

		this.scene = null;
		
		this.loadSave();
		this.inventories = [];

		this.miniMap = new MiniMap("game");
		this.icons = [];
		this.hud = new Hud();
		this.overlay = new Overlay();
		this.items = [];
		this.itemService = new ItemService();
		this.craftingRecipes = new CraftingRecipes();


		this.experienceService = new ExperienceService();

        this.solids = null;
		this.solidsTickUpdated = -1;

		
		this.player.setIcon("./sprites/miniMap/playerIcon.png", 16, 16, true);
		
		// ********************* Start Temp Enemy creation ****************
		/*
		// new Enemy("player", 1, 350, -35, 48, 48, true);
		
		*/
		// var AI1 = new Enemy("player", 5, 100, 100, 48, 48, true);
		// var AI2 = new Enemy("player", 5, 100, 100, 48, 48, true);
		// var AI3 = new Enemy("player", 5, 100, 100, 48, 48, true);

		var AI1 = new Crab(100, 100)
			.setImage("enemy/crab")
			.setDimensions(48, 48)
			.setMoving(true)
			.setSpeed(5);
		var AI2 = new Crab(101, 100)
			.setImage("enemy/crab")
			.setDimensions(48, 48)
			.setMoving(true)
			.setSpeed(5);
		var AI3 = new Crab(100, 101)
			.setImage("enemy/crab")
			.setDimensions(48, 48)
			.setMoving(true)
			.setSpeed(5);
		AI1.AI = new CircleAI(AI2.key, 200);
		AI2.AI = new CircleAI(AI3.key, 200);
		AI3.AI = new CircleAI(AI1.key, 200);
		
		var tester = new Crab(100, 100)
			.setImage("enemy/crab")
			.setDimensions(48, 48)
			.setMoving(true)
			.setSpeed(5);
		tester.AI = new CombineAI(new CircleAI(AI3.key, 200),
							      new ThrowsAI(AI3.key, 15));
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
        var saveOnFile = localStorage.getItem("save");
        if(saveOnFile != null){
			this.save = Object.assign(new Save, JSON.parse(saveOnFile));
			if(this.save.version == null || this.config.versionCompare(this.save.version, this.config.version) > 0){
				this.newSave();
			}
        } else {
			this.newSave();
		}

		this.player.health = this.save.health;
		this.player.stamina = this.save.stamina;
	}

	newSave(){
		this.save = new Save();
        this.save.version = this.config.version;
	}
	
	vectorField(){
		var m = 35;
		for(var i = 0; i < 50*m; i += m){
			for(var j = 0; j < 50*m; j += m){
				var vector = new Entity(i, j)
					.setImage("empty")
					.setDimensions(0, 0)
					.setMoving(false);
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

	getInventory(name){
		for(var i in this.inventories){
			var inventory = this.inventories[i];
			if(inventory.location == name){
				return inventory;
			}
		}
		return null;
	}
	
	addIcon(icon){
		this.icons[icon.key] = icon;
	}

	deleteIcon(key){
		delete this.icons[key];
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
		//also updates player
		if(!this.paused){
			this.entityList.list.forEach(o => {
				var e = this.get(o.key);
				e.update(); //move than stats
			});
			this.entityList.list.forEach(o => {
				var e = this.get(o.key);
				e.updateAI();
			});
		} else if(main.debug.overRideMove){
			game.player.update();
		}
	}

	pickUpItems(){
		var droppedItems = this.getDroppedItems();
		for(var i = 0; i < droppedItems.length; i++){
			if(droppedItems[i].collides(this.player)){
				droppedItems[i].getPicked();
			}
		}

	}

	bulletCollisionDetection(){
		// this.entityList.list and enemies is sorted here
		// can do binary search

		var enemies = this.getEnemies();
		var bullets = this.getBullets();

		for(var j = 0; j < bullets.length; j++){

			//bullet and enemy collision
			for(var i = 0; i < enemies.length; i++){
				if(bullets[j] && enemies[i] && bullets[j].friendly && bullets[j].collides(enemies[i])){
					if(bullets[j].piercing){
						if(!bullets[j].hit.includes(enemies[i].key)){
							bullets[j].handleHit();
							bullets[j].hit.push(enemies[i].key);
							enemies[i].struck(bullets[j]);
						}
					} else {
						bullets[j].handleHit();
						enemies[i].struck(bullets[j]);
						bullets[j].die();
						this.delete(bullets[j]);
						delete bullets[j];
						j++
					}
				}
			}
			//bullet and player collision
			if(bullets[j] && !bullets[j].friendly && bullets[j].collides(this.player)){
				if(bullets[j].piercing){
					if(!bullets[j].hit.includes(this.player.key)){
						bullets[j].handleHit();
						bullets[j].hit.push(this.player.key);
						this.player.struck(bullets[j]);
					}
				} else {
					bullets[j].handleHit();
					this.player.struck(bullets[j]);
					bullets[j].die();
					this.delete(bullets[j]);
					delete bullets[j];
					j++
				}
			}
		}
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
	
	getDroppedItems(){
		var droppedItem = [];
		for(var i in this.entities){
			var e = this.entities[i];
			if(e instanceof DroppedItem){
				droppedItem.push(e);
			}
		}
		return droppedItem;
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

	spawns(){
		if(!this.paused){
			game.spawnService.updateSpawnRate();
			var r = 1200;
			var amount = 10;
			for(var theta = 0; theta <= Math.PI*2; theta += Math.PI*2/amount){
				if(Math.random() <= game.spawnService.spawnRate * game.spawnService.randomSpawnRate){
					var x = this.player.positionX + r*Math.cos(theta);
					var y = this.player.positionY + r*Math.sin(theta);
					var tile = this.map.getTile(x, y);
					if(tile && tile.spawn){
						tile.spawn(x, y);
					}
				}
			}
		}
	}

	addButton(button){
		this.buttons.push(button);
	}

	periodic(length, period){
		var tick = Math.floor(this.gameTick / length);
		var value = tick%(period * 2)
		if(value >= period){
			return period - tick%period - 1;
		}
		return value;
	}

	enter(enterance){
		if(enterance){
			this.scene = new Scene(enterance.positionX, enterance.positionY);
			this.clearEntities();
			this.scene.init();
		}
	}

	clearEntities(){
		for(var i in this.entities){
			this.entities[i].delete();
		}
	}

	exit(exit){
		this.player.positionX = this.scene.overworldX;
		this.player.positionY = this.scene.overworldY;
		this.clearEntities();
		this.scene.delete();
		this.scene = null;
	}

	sleep(){
		this.hud.log("Game saved");
		this.overlay.dayOffset = game.gameTick;
		this.hud.log("The time is now 4:30am");
	}
}