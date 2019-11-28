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

	constructor(path, speed, x, y, width, height, moving = false, spriteDirection = null){
		this.sprite = new Sprite(path, x, y, width, height, spriteDirection);
		this.width = width;
		this.height = height;
		this.positionX = x;
		this.positionY = y;
		this.speed = speed;
		this.angle = Math.random() * Math.PI*2;
		this.moving = moving;
		//this.adjustSpriteDirection();
		this.key; //defined in adding to game
		this.AI = new AI(this);
	}

	correctMod(a, b){
		return ((a % b) + b) % b;
	}

	adjustSpriteDirection(){
		var angle = this.correctMod((this.angleAbsolute + game.angle)/Math.PI*180, 360) ;
		if(angle >= 315 || angle <= 45){
			this.sprite.turn("right");
		} else if(angle > 45 && angle < 135){
			this.sprite.turn("down");
		} else if(angle >= 135 && angle <= 225){
			this.sprite.turn("left");
		} else {
			this.sprite.turn("up");
		}
	}

	move(){
		if((!this.moving || game.paused) && this.key != 0){
			return;
		}
		var newX = this.positionX + Math.cos(this.angle)*this.speed;
		var newY = this.positionY + Math.sin(this.angle)*this.speed;
		if(game.map.noCollsion(newX, newY) || this.noCollsion){
			this.positionX = newX;
			this.positionY = newY;
		} else {
			var newMapX = Math.floor(newX / game.map.tileSize);
			var newMapY = Math.floor(newY / game.map.tileSize);
			var mapX = Math.floor(this.positionX / game.map.tileSize);
			var mapY = Math.floor(this.positionY / game.map.tileSize);
			if(mapX != newMapX && mapY != newMapY){
				if(game.map.collisionMap[newMapX] && game.map.collisionMap[newMapX][mapY]){
					newMapX = mapX;
				} else if(game.map.collisionMap[mapX] && game.map.collisionMap[mapX][newMapY]){
					newMapY = mapY;
				}
			} 
			if(mapX != newMapX){
				if(newMapX > mapX){
					newX = newMapX * game.map.tileSize - .01;
				} else {
					newX = mapX * game.map.tileSize;
				}
				this.positionX = newX;
				this.positionY = newY;
			} 
			if(mapY != newMapY){
				if(newMapY > mapY){
					newY = newMapY * game.map.tileSize - .01;
				} else {
					newY = mapY * game.map.tileSize;
				}
				this.positionX = newX;
				this.positionY = newY;
			}
		}
	}

	collides(e){
		var d = Math.sqrt(Math.pow(this.positionX - e.positionX, 2) + Math.pow(this.positionY - e.positionY, 2));
		
		return d <= (this.width + e.width) / 2;
	}
}
