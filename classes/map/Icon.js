class Icon {
	get positionX(){
        var e = game.get(this.key);
		return e.positionX/game.map.tileSize;
	}
	get positionY(){
        var e = game.get(this.key);
		return e.positionY/game.map.tileSize;
    }
    
	get angle(){
		if(this.key == 0){
			var e = game.get(this.key);
			return e.angle + Math.PI/4;
		}
		return -game.angle;
	}

	constructor(key, icon, width, height, rotates){
        this.key = key;
        this.image = new Image();
        this.image.src = icon;
        this.width = width;
		this.height = height;
		this.rotates = rotates;
    }
    
	adjustXCordSprite(){
		return this.adjustXCord() - this.width / 2;
	}

	adjustYCordSprite(){
		return this.adjustYCord() - this.height / 2;
	}

	adjustXCord(){
		var cos = Math.cos(game.angle);
		var sin = Math.sin(game.angle);
		return cos*(this.positionX - game.cameraCenterX/game.map.tileSize) - sin*(this.positionY - game.cameraCenterY/game.map.tileSize) + game.miniMap.size/2;
	}

	adjustYCord(){
		var cos = Math.cos(game.angle);
		var sin = Math.sin(game.angle);
		return sin*(this.positionX - game.cameraCenterX/game.map.tileSize) + cos*(this.positionY - game.cameraCenterY/game.map.tileSize) + game.miniMap.size/2;
	}
}
