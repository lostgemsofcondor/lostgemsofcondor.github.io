class Entity {
	set positionX(x) {
		this.x = x;
		this.sprite.x = x;
	}
	set positionY(y) {
		this.y = y;
		this.sprite.y = y;
	}
	get positionX(){
		return this.x;
	}
	get positionY(){
		return this.y;
	}
	get angle(){
		return this.angleAbsolute;
	}
	set angle(theta){
		this.angleAbsolute = theta
		this.adjustSpriteDirection();
	}

	constructor(x, y){
		this.sprite = new Sprite(x, y);
		this.positionX = x;
		this.positionY = y;
		this.speed = 1;
		this.angle = 0;
		this.moving = false;
		this.solid = false;
		this.friendly = false;
		this.age = 0;
		this.nextNewTextTick = -1;
		this.lastText = null;
		this.hasIcon = false;
		this.name = null;

		this.light = null;

		this.setRotates(true);
		
		this.key; //defined in adding to game
		
	}

	//builder functions
	setSpeed(speed){
		this.speed = speed;
		return this;
	}

	setAngle(angle){
		this.angle = angle;
		return this;
	}

	
	setMoving(moving){
		this.moving = moving;
		return this;
	}
	
	setSolid(solid){
		this.solid = solid;
		return this;
	}

	setDimensions(width, height){
		this.sprite.setDimensions(width, height);
		this.width = width;
		this.height = height;
		return this;
	}

	setRotates(rotates){
		this.sprite.setRotates(rotates);
		this.rotates = rotates;
		return this;
	}

	setImage(path, spriteDirection){
		this.sprite.setImage(path, spriteDirection);
		return this;
	}

	setSpriteDirection(spriteDirection){
		this.sprite.setAngle(spriteDirection);
		return this;
	}

	setName(name){
		this.name = name;
		return this;
	}

	setLight(light){
		this.light = light;
		return this;
	}

	//logic functions
	correctMod(a, b){
		return ((a % b) + b) % b;
	}

	adjustSpriteDirection(){
		var angle = this.correctMod((this.angleAbsolute + game.angle)/Math.PI*180, 360);
		if(this.sprite.movingAnimation && this.moving){
			if(angle >= 315 || angle <= 45){
				this.sprite.setDirection("movingRight", true);
			} else if(angle > 45 && angle < 135){
				this.sprite.setDirection("movingDown", true);
			} else if(angle >= 135 && angle <= 225){
				this.sprite.setDirection("movingLeft", true);
			} else {
				this.sprite.setDirection("movingUp", true);
			}
		} else {
			if(angle >= 315 || angle <= 45){
				this.sprite.setDirection("right");
			} else if(angle > 45 && angle < 135){
				this.sprite.setDirection("down");
			} else if(angle >= 135 && angle <= 225){
				this.sprite.setDirection("left");
			} else {
				this.sprite.setDirection("up");
			}
		}
	}

	update(){
		this.move();
		this.age++;
	}

	updateAI(){
		if(this.AI){
			this.AI.calculate(this);
		}
	}

	move(){
		if((!this.moving)){
			return;
		}
		var newX = this.positionX + Math.cos(this.angle)*Math.min(this.speed, 48);
		var newY = this.positionY + Math.sin(this.angle)*Math.min(this.speed, 48);
		if(game.map.noCollsion(newX, newY) || this.noCollsion){
			this.positionX = newX;
			this.positionY = newY;
		} else {
			var newMapX = Math.floor(newX / game.map.tileSize) * game.map.tileSize;
			var newMapY = Math.floor(newY / game.map.tileSize) * game.map.tileSize;
			var mapX = Math.floor(this.positionX / game.map.tileSize) * game.map.tileSize;
			var mapY = Math.floor(this.positionY / game.map.tileSize) * game.map.tileSize;
			
			if(mapX != newMapX && mapY != newMapY){
				if(game.map.noCollsion(newMapX, mapY)){
					newMapX = mapX;
				} else if(game.map.noCollsion(mapX, newMapY)){
					newMapY = mapY;
				}
			}
			if(mapX != newMapX){
				if(newMapX > mapX){
					newX = newMapX - .01;
				} else {
					newX = mapX;
				}
				this.positionX = newX;
				this.positionY = newY;
			} 
			if(mapY != newMapY){
				if(newMapY > mapY){
					newY = newMapY - .01;
				} else {
					newY = mapY;
				}
				this.positionX = newX;
				this.positionY = newY;
			}
		}
		
		if(!this.noCollsion){
			this.solidCollision();
		}
	}

	
	setIcon(image, width, height, rotates = false){
		this.hasIcon = true;
		var icon = new Icon(this.key, image, width, height, rotates);
		game.addIcon(icon);
		return this;
	}
	
	solidCollision(){
		game.getSolids().forEach(e => {
			if(this.strictCollides(e)){
				var d = Math.sqrt(Math.pow(this.positionX - e.positionX, 2) + Math.pow(this.positionY - e.positionY, 2));
				if(d != 0){
					var r = e.width/2
					var newX = e.positionX + r * (this.positionX - e.positionX) / d;
					var newY = e.positionY + r * (this.positionY - e.positionY) / d;
					this.positionX = newX;
					this.positionY = newY;
				}
			}
		})
	}

	strictCollides(e){
		var d = Math.sqrt(Math.pow(this.positionX - e.positionX, 2) + Math.pow(this.positionY - e.positionY, 2));
		return d <= e.width / 2;
	}

	collides(e){
		var d = Math.sqrt(Math.pow(this.positionX - e.positionX, 2) + Math.pow(this.positionY - e.positionY, 2));
		return d <= (this.width + e.width) / 2;
	}
	
	collidesPoint(p){
		var d = Math.sqrt(Math.pow(this.positionX - p.positionX, 2) + Math.pow(this.positionY - p.positionY, 2));
		return d <= this.width;
	}
	
	risingText(text, color = "gray"){
		if(this.nextNewTextTick <= game.gameTick){
			this.nextNewTextTick = game.gameTick + 45;
			this.lastText = new Text(this.x, this.y, text)
			.setColor(color)
			.setOffset(this.height);
			return this.lastText;
		} else {
			return this.lastText.stack(text, color);
		}
	}

	getDescription(){
		return "Unknown entity";
	}

	getName(){
		if(this.name){
			return this.name;
		}
		return this.__proto__.constructor.name;
	}

	drop(item){
		item.drop(this.x, this.y);
	}

	die(){

	}

	rightClick(){
		return [new MenuOption(this.key)];
	}

	delete(){
		if(this.hasIcon){
			game.deleteIcon(this.key);
		}
		game.delete(this);
	}
}
