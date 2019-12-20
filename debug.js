class DrawDebugThings {
    constructor(level){
		this.level = level;

    }

    drawPixel(x, y){
		var p = new Point(x, y);
        var adjX = p.adjustXCord();
        var adjY = p.adjustYCord();
        context.fillRect(adjX, adjY, 1, 1);        
    }

    drawCircle(x, y, r){
		var p = new Point(x, y);
        var adjX = p.adjustXCord();
        var adjY = p.adjustYCord();
        context.beginPath();
        context.arc(adjX, adjY, r, 0, 2 * Math.PI);
        context.stroke();  
	}
	
    drawLine(x, y, angle, len){
		var p = new Point(x, y);
        var adjX = p.adjustXCord();
		var adjY = p.adjustYCord();
		
		var adjXEnd = adjX + Math.cos(angle)*len;
		var adjYEnd = adjY + Math.sin(angle)*len;

		context.beginPath();
		context.moveTo(adjX, adjY);
		context.lineTo(adjXEnd, adjYEnd);
		context.stroke();
	}

	mark(entity){
		//this.drawPixel(entity.positionX, entity.positionY);
		this.drawCircle(entity.positionX, entity.positionY, entity.sprite.width/2);
	}

	markSprite(sprite){
		this.drawPixel(sprite.positionX, sprite.positionY);
		this.drawCircle(sprite.positionX, sprite.positionY, 10);
	}

	direction(entity){
		if(entity.moving || debugLevel >= 4){
			this.drawLine(entity.positionX, entity.positionY, entity.angle + game.angle, 40);
		}
	}
}

function drawDebugThings(){
	if(!debugDrawing) return;
	context.fillStyle = "#000000";
	var drawDebugThings = new DrawDebugThings(debugLevel);
    drawDebugThings.drawPixel(0, 0);
    drawDebugThings.drawCircle(0, 0, 30);
    //drawDebugThings.drawPixel(game.player.positionX, game.player.positionY);
    //drawDebugThings.drawCircle(game.player.positionX, game.player.positionY, 30);
    //drawDebugThings.drawPixel(200, 200);
	//drawDebugThings.drawCircle(200, 200, 30);
	drawDebugThings.mark(game.player);
	drawDebugThings.markSprite(game.player.sprite);
	drawDebugThings.direction(game.player);
	// try {
	// 	drawDebugThings.markSprite(game.objects[0].sprite);
	// 	drawDebugThings.direction(game.objects[0]);
	// 	drawDebugThings.mark(game.objects[0]);
	// } catch {}

	Object.keys(game.objects).forEach(i => {
		//drawDebugThings.markSprite(game.objects[i].sprite);
		drawDebugThings.direction(game.objects[i]);
		drawDebugThings.mark(game.objects[i]);
	});

	drawDebugThings.drawCircle(game.mouse.point.x, game.mouse.point.y, 10);
}

class DebugInfo {
	constructor(level = 0){
		this.font = "14px Verdana,sans-serif";
		this.leftMargin = 10;
		this.topMargin = 200;
		this.gap = 15;
		this.lines = 0;
		this.level = level;
		context.font = this.font;
	}
	
	add(str, level=0){
		if(level <= this.level){
			context.fillText(str, this.leftMargin, this.topMargin + this.gap * this.lines);
			this.lines++;
		}
	}
}

function addDebugText(){
	if(!debug) return;
	context.fillStyle = "#000000";
	var debugInfo = new DebugInfo(debugLevel);
	debugInfo.add("fps: " + fps.toFixed(0), 1);
	debugInfo.add("Width: " + canvas.width, 4);
	debugInfo.add("Height: " + canvas.height, 4);
	debugInfo.add("Draw Time " + drawTime, 4);
	debugInfo.add("Frame Time " + frameTime, 3);
	debugInfo.add("Frame Time Max " + drawTimeMax, 2);
	debugInfo.add("performance.now() " + performance.now(), 4);
	debugInfo.add("Frame Time " + frameTime, 4);
	debugInfo.add("adjust " + adjust, 4);
	debugInfo.add("Keys Pressed " + getKeys(), 3);
	debugInfo.add("Mouse clicked " + getMouse(), 3);
	debugInfo.add("Player Position X " + game.player.positionX.toFixed(2), 2);
	debugInfo.add("Player Position Y " + game.player.positionY.toFixed(2), 2);
	debugInfo.add("Player Angle " + game.player.angle, 4);
	debugInfo.add("Player Angle Absolute " + game.player.angleAbsolute, 4);
	debugInfo.add("Game Angle " + game.angle, 4);
	debugInfo.add("Game cameraX " + game.cameraX, 4);
	debugInfo.add("Game cameraY " + game.cameraY, 4);
	debugInfo.add("Game tick " + game.gameTick, 4);
	debugInfo.add("Chunk X " + game.map.currentChunkX(), 4);
	debugInfo.add("Chunk Y " + game.map.currentChunkY(), 4);
	debugInfo.add("Last Chunk Tick " + game.map.lastChunkTick, 4);
}

function getKeys(){
	keys = ""
	Object.keys(game.keyMap).forEach(function(key){
		// keys += String.fromCharCode(key) + " ";
		keys += key + " ";
	});
	return keys;
}

function getMouse(){
	str = "";
	str += game.mouse.leftClickDown ? "left " : "";
	str += game.mouse.leftClickDownStart ? "pressed " : "";
	str += game.mouse.rightClickDown ? "right " : "";
	str += game.mouse.rightClickDownStart ? "pressed " : "";
	return str;
}
