class DrawDebugThings {
    constructor(level){
		this.level = level;

    }

    drawPixel(x, y){
        var adjX = adjustXCord(x);
        var adjY = adjustYCord(y);
        context.fillRect(adjX, adjY, 1, 1);        
    }

    drawCircle(x, y, r){
        var adjX = adjustXCord(x);
        var adjY = adjustYCord(y);
        context.beginPath();
        context.arc(adjX, adjY, r, 0, 2 * Math.PI);
        context.stroke();  
    }
}

function drawDebugThings(){
	if(!debugDrawing) return;
	var drawDebugThings = new DrawDebugThings(debugLevel);
    drawDebugThings.drawPixel(0, 0);
    drawDebugThings.drawCircle(0, 0, 30);
    drawDebugThings.drawPixel(game.player.positionX, game.player.positionY);
    drawDebugThings.drawCircle(game.player.positionX, game.player.positionY, 30);
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
	var debugInfo = new DebugInfo(debugLevel);
	debugInfo.add("fps: " + fps.toFixed(0), 1);
	debugInfo.add("Width: " + canvas.width, 4);
	debugInfo.add("Height: " + canvas.height, 4);
	debugInfo.add("Draw Time " + drawTime, 3);
	debugInfo.add("Draw Time Max " + drawTimeMax, 2);
	debugInfo.add("performance.now() " + performance.now(), 4);
	debugInfo.add("Frame Time " + frameTime, 4);
	debugInfo.add("adjust " + adjust, 4);
	debugInfo.add("Keys Pressed " + getKeys(), 3);
	debugInfo.add("Player Position X " + game.player.positionX.toFixed(2), 4);
	debugInfo.add("Player Position Y " + game.player.positionY.toFixed(2), 4);
	debugInfo.add("Player Angle " + game.player.entity.angle, 4);
	debugInfo.add("Game Angle " + game.angle, 4);
}

function getKeys(){
	keys = ""
	Object.keys(game.map).forEach(function(key){
		// keys += String.fromCharCode(key) + " ";
		keys += key + " ";
	});
	return keys;
}
