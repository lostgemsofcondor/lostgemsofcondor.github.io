class Debug {
	constructor(){
		this.setAllDebug(false);
		this.keys = "";
		this.str = "";
		this.drawDebugThings = new DrawDebugThings();
		this.debugInfo = new DebugInfo();
	}

	setAllDebug(bool){
		this.debugging = bool;
		this.overRideMove = bool;
		if(game?.player) {
			game.player.noCollsion = bool;
		}
		if(bool){
			main.canvas.oncontextmenu = null;
		} else {
			main.canvas.oncontextmenu = function (e) {
				e.preventDefault();
			};
		}
	}

	draw(){
		this.drawThings();
		this.addText();
	}
	
	drawThings(){
		if(!this.debugging) return;
		main.context.fillStyle = "#000000";
		this.drawDebugThings.drawPixel(0, 0);
		this.drawDebugThings.drawCircle(0, 0, 30);
		//this.drawDebugThings.drawPixel(game.player.positionX, game.player.positionY);
		//this.drawDebugThings.drawCircle(game.player.positionX, game.player.positionY, 30);
		//this.drawDebugThings.drawPixel(200, 200);
		//this.drawDebugThings.drawCircle(200, 200, 30);
		this.drawDebugThings.mark(game.player);
		this.drawDebugThings.markPoint(game.spawnService.point);
		this.drawDebugThings.markSprite(game.player.sprite);
		this.drawDebugThings.direction(game.player);
		// try {
		// 	this.drawDebugThings.markSprite(game.entities[0].sprite);
		// 	this.drawDebugThings.direction(game.entities[0]);
		// 	this.drawDebugThings.mark(game.entities[0]);
		// } catch {}

		Object.keys(game.entities).forEach(i => {
			//this.drawDebugThings.markSprite(game.entities[i].sprite);
			this.drawDebugThings.direction(game.entities[i]);
			this.drawDebugThings.mark(game.entities[i]);
		});

		this.drawDebugThings.drawCircle(game.mouse.point.x, game.mouse.point.y, 10);
	}

	addText(){
		main.context.fillStyle = "#000000";
		main.context.textAlign = "left";
		this.debugInfo.reset();
		this.debugInfo.add("fps: " + main.fps.toFixed(0), 1);
		this.debugInfo.add("time: " + game.overlay.getTimeString(), 1);
		if(!this.debugging) return;
		this.debugInfo.add("Width: " + main.canvas.width, 5);
		this.debugInfo.add("Height: " + main.canvas.height, 5);
		// this.debugInfo.add("Draw Time: " + drawTime, 4);
		// this.debugInfo.add("Frame Time: " + frameTime, 3);
		// this.debugInfo.add("Frame Time Max: " + drawTimeMax, 2);
		this.debugInfo.add("performance.now: " + performance.now(), 4);
		// this.debugInfo.add("Frame Time: " + frameTime, 4);
		// this.debugInfo.add("adjust: " + adjust, 4);
		this.debugInfo.add("Keys Pressed: " + this.getKeys(), 3);
		this.debugInfo.add("Mouse clicked: " + this.getMouse(), 3);
		this.debugInfo.add("Mouse clicked on hud: " + game.mouse.onHud, 3);
		this.debugInfo.add("Player Position X: " + game.player.positionX.toFixed(2), 2);
		this.debugInfo.add("Player Position Y: " + game.player.positionY.toFixed(2), 2);
		this.debugInfo.add("Player Angle: " + game.player.angle, 4);
		this.debugInfo.add("Player Angle Absolute: " + game.player.angleAbsolute, 4);
		this.debugInfo.add("Game tick: " + game.gameTick, 3);
		this.debugInfo.add("Chunk X: " + game.map.currentChunkX(), 4);
		this.debugInfo.add("Chunk Y: " + game.map.currentChunkY(), 4);
		this.debugInfo.add("Chunk under mouse X: " + game.map.getChunkX(game.mouse.point.x), 4);
		this.debugInfo.add("Chunk under mouse Y: " + game.map.getChunkY(game.mouse.point.y), 4);
		this.debugInfo.add("Last Chunk Tick: " + game.map.lastChunkTick, 4);
		this.debugInfo.add("JSON.stringify(game.save): "+ JSON.stringify(game.save), 6);
		this.debugInfo.add("Spawn Rate: "+ game.spawnService.spawnRate, 4);
		this.debugInfo.add("Window: "+ game.hud.console.clicked(game.mouse.x, game.mouse.y), 4);
	}

	getKeys(){
		self = this;
		self.keys = ""
		Object.keys(game.keyMap).forEach(function(key){
			// keys += String.fromCharCode(key) + " ";
			self.keys += key + " ";
		});
		return self.keys;
	}

	getMouse(){
		this.str = "";
		this.str += game.mouse.left.down ? "left " : "";
		this.str += game.mouse.left.start ? "pressed " : "";
		this.str += game.mouse.right.down ? "right " : "";
		this.str += game.mouse.right.start ? "pressed " : "";
		return this.str;
	}
}

class DrawDebugThings {
	constructor(){
	}

	drawPixel(x, y){
		var p = new Point(x, y);
		var adjX = p.adjustXCord();
		var adjY = p.adjustYCord();
		main.context.fillRect(adjX, adjY, 1, 1);        
	}

	drawCircle(x, y, r){
		var p = new Point(x, y);
		var adjX = p.adjustXCord();
		var adjY = p.adjustYCord();
		main.context.beginPath();
		main.context.arc(adjX, adjY, r, 0, 2 * Math.PI);
		main.context.stroke();  
	}
	
	drawLine(x, y, angle, len){
		var p = new Point(x, y);
		var adjX = p.adjustXCord();
		var adjY = p.adjustYCord();
		
		var adjXEnd = adjX + Math.cos(angle)*len;
		var adjYEnd = adjY + Math.sin(angle)*len;

		main.context.beginPath();
		main.context.moveTo(adjX, adjY);
		main.context.lineTo(adjXEnd, adjYEnd);
		main.context.stroke();
	}

	
	markPoint(p){
		this.drawCircle(p.positionX, p.positionY, 24);
	}

	mark(entity){
		this.drawCircle(entity.positionX, entity.positionY, entity.sprite.width/2);
	}

	markSprite(sprite){
		this.drawPixel(sprite.positionX, sprite.positionY);
		this.drawCircle(sprite.positionX, sprite.positionY, 10);
	}

	direction(entity){
		if(entity.moving || game.config.debugLevel >= 4){
			this.drawLine(entity.positionX, entity.positionY, entity.angle + game.angle, 40);
		}
	}
}


class DebugInfo {
	constructor(){
	}

	reset(){
		this.font = game.zoom/1080*21 +"px pixel_font";
		this.leftMargin = 10;
		this.gap = game.zoom/1080*21;
		this.lines = 0;
		this.offset = game.miniMap.offsetY + game.miniMap.size + 6
		this.level = game.config.debugLevel;
		main.context.font = this.font;
	}
	
	add(str, level=0){
		if(level <= this.level){
			game.font.write(main.context, str, this.leftMargin, this.gap * (this.lines + 1) + this.offset, true)
			this.lines++;
		}
	}
}


