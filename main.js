class Main {
	constructor(){
		main = this;
		this.canvas = document.getElementById("mainCanvas");
		this.canvasDiv = document.getElementById("mainCanvasDiv")
		this.context = this.canvas.getContext("2d");
		this.debug = new Debug();
		this.debugDrawing = false;

		this.fps = 0;

		window.onload = function(){main.startUp()};
	}


	startUp(){
		this.resize();
		//this.drawMap();

		window.addEventListener("mousedown", function(){main.handelMouseDown()});
		window.addEventListener("mouseup", function(){main.handelMouseUp()});
		window.addEventListener("mousemove", function(){main.handelMouseMove()});
		window.addEventListener("resize", function(){main.resize()});

		
		onkeydown = onkeyup = function(e){
			e = e || event; // to deal with IE
			if(e.type == 'keydown'){
				game.keyMap[e.keyCode] = true;
			} else {
				delete game.keyMap[e.keyCode];
			}
		}

		this.context.imageSmoothingEnabled = false;       /* standard */
		this.context.mozImageSmoothingEnabled = false;    /* Firefox */
		this.context.oImageSmoothingEnabled = false;      /* Opera */
		this.context.webkitImageSmoothingEnabled = false; /* Safari */
		this.context.msImageSmoothingEnabled = false;     /* IE */

		this.canvas.oncontextmenu = function (e) {
			e.preventDefault();
		};

		this.main();
	}

	async main(){
		var frameTimes = [];
		var count = 0;
		var drawTime = 0;
		var frameTime = 0;
		var drawTimeMax = 0;
		var adjust = 0;
		
		game.init();

		while(true){
			var fast = false;
			var start = performance.now();

			this.gameLoop();

			await this.sleep(0)
			drawTime = performance.now() - start;
			if(drawTime < 1/(fpsMax) * 1000){
				await this.sleep((1/(fpsMax) * 1000) - drawTime + adjust);
				fast = true;
			} else {
			}
			frameTime = performance.now() - start;
			if(frameTime > drawTimeMax){
				drawTimeMax = frameTime;
			}
			frameTimes.push(frameTime);
			count++;
			if(frameTimes.length > 60){
				frameTimes.shift()
			}
			this.fps = frameTimes.length/frameTimes.reduce((a, b) =>  a + b)*1000;
			if(count % 60 == 0){
				count = 0;
				
				if(this.fps - 1 > fpsMax && fast){
					adjust += game.config.adjustment;
					if(this.fps - .4 > fpsMax){
						adjust += game.config.adjustment;
					}
				}
				if(this.fps + .5 < fpsMax && fast){
					adjust -= game.config.adjustment;
					if(this.fps + .2 < fpsMax){
						adjust -= game.config.adjustment;
					}
				}
			}
		}
	}

	sleep(ms){
	return new Promise(resolve => setTimeout(resolve, ms));
	}

	gameLoop(){
		game.gameLoopService.mainGameLoop();
		this.redraw();
	}

	redraw(){
		this.clearCanvas();
		this.draw();
	}

	clearCanvas(){
		this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
	}

	draw(){
		game.map.draw();
		this.drawObjects();
		this.drawOverlay();
		this.drawMiniMap();
		this.drawHud();

		this.debug.draw();
	}

	drawMiniMap(){
		if(game.scene){
			game.scene.miniMap.redraw(this.context);
			this.addToContext(this.context, game.scene.miniMap.canvas, game.scene.miniMap.offsetX, game.scene.miniMap.offsetY, game.scene.miniMap.canvas.width, game.scene.miniMap.canvas.height);
		} else {
			game.miniMap.redraw(this.context);
			this.addToContext(this.context, game.miniMap.canvas, game.miniMap.offsetX, game.miniMap.offsetY, game.miniMap.canvas.width, game.miniMap.canvas.height);
		}
	}

	drawHud(){
		game.hud.redraw();
		this.addToContext(this.context, game.hud.canvas, 0, 0, game.hud.canvas.width, game.hud.canvas.height);
	}

	drawOverlay(){
		game.overlay.redraw();
		this.addToContext(this.context, game.overlay.canvas, 0, 0, game.overlay.canvas.width, game.overlay.canvas.height);
	}

	drawObjects(){
		game.entityList.sort();
		game.entityList.list.forEach(o => {
			try{
				var e = game.get(o.key);
				this.addSprite(e.sprite);
			} catch(err){
				console.log("could not draw sprite for " + e.constructor.name + ": " + o.key + "\n" + err.message)
			}
			if(e.drawHealth){
				this.drawHealth(e);
			}
		});
		var size = 48;
		this.context.font = "bold " + size + "px pixel_font";
		this.context.textAlign = "center";
		for(var i in game.text){
			var t = game.text[i];
			this.context.fillStyle = t.color;
			game.font.write(this.context, t.str, t.adjustXCord(), t.adjustYCord(), true, t.color);
		}
	}

	drawHealth(e){
		var width = Math.floor((e.sprite.width + 48)/2);
		var x = Math.floor(e.sprite.adjustXCord() - width / 2);
		var y = Math.floor(e.sprite.adjustYCord() + 3);
		var height = 6;
		this.context.fillStyle = game.config.healthGreen;
		this.context.fillRect(x, y, width, height);
		
		this.context.fillStyle = game.config.healthRed;
		this.context.fillRect(Math.floor(x + width * e.health/e.maxHealth), y, Math.ceil(width - width * e.health/e.maxHealth), height);
		
	}

	copyMapChunk(chunk){
		// var p = new Point(0, 0);
		var adjXCamera = game.cameraCenterX + game.cameraX;
		var adjYCamera = game.cameraCenterY + game.cameraY;
		var adjXZero = chunk.positionX + game.cameraX - chunk.offsetX;
		var adjYZero = chunk.positionY + game.cameraY - chunk.offsetY;
		this.context.save();
		this.context.translate(adjXCamera , adjYCamera);
		this.context.rotate(game.angle);
		this.context.translate(-adjXCamera, -adjYCamera);
		this.addToContext(this.context, chunk.canvas, adjXZero, adjYZero);
		this.context.restore();
	}

	adjustCanvasSize(){
		this.canvas.width = game.width = Math.min(2160,Math.max(990, game.zoom/this.canvasDiv.offsetHeight * this.canvasDiv.offsetWidth));
		this.canvas.height = game.height = game.zoom;
	}

	resize(){
		this.adjustCanvasSize();
		game.hud.resize();
		game.overlay.resize();
		this.draw();
	}

	addSprite(sprite){
		if(sprite.rotates){
			this.addToContext(this.context, sprite.getImg(), Math.round(sprite.adjustXCordSprite()), Math.round(sprite.adjustYCordSprite()), sprite.width, sprite.height, sprite.getAnimationDelta());
		} else {
			this.context.save();
			this.context.translate(sprite.adjustXCord() , sprite.adjustYCord());
			this.context.rotate(sprite.angle + game.angle);
			this.addToContext(this.context, sprite.getImg(), -sprite.width/2, -sprite.height/2, sprite.width, sprite.height, sprite.getAnimationDelta());
			this.context.restore();
		}
	}

	addToContext(context, img, x, y, width = null, height = null, sdx = 0, sdy = 0){
		if(width && height){
			var w = img.height / height * width
			var h = img.height;
			context.drawImage(img, sdx, sdy, w, h, x, y, width, height);
		} else {
			context.drawImage(img, x, y);
		}
	}

	handelMouseDown(){
		var x = event.clientX - this.canvas.offsetLeft;
		var y = event.clientY - this.canvas.offsetTop;

		var canvasX = x / this.canvas.offsetWidth * this.canvas.width;
		var canvasY = y / this.canvas.offsetHeight * this.canvas.height;
		//0 left, 1 middle, 2 right
		if(event.button == 0){
			game.mouse.clickLeft(canvasX, canvasY);
		}
		if(event.button == 2){
			game.mouse.clickRight(canvasX, canvasY);
		}
	}

	handelMouseUp(){
		//0 left, 1 middle, 2 right
		if(event.button == 0){
			game.mouse.clickLeftRelease();
		}
		if(event.button == 2){
			game.mouse.clickRightRelease();
		}
	}

	handelMouseMove(){
		var x = event.clientX - this.canvas.offsetLeft;
		var y = event.clientY - this.canvas.offsetTop;
		var canvasX = x / this.canvas.offsetWidth * this.canvas.width;
		var canvasY = y / this.canvas.offsetHeight * this.canvas.height;
		
		game.mouse.move(canvasX, canvasY);
	}

	addCanvas(){
		var canvas = document.createElement("canvas");
		return canvas;
	}

	correctMod(a, b){
		return ((a % b) + b) % b;
	}
}

var main = new Main();
var game = new Game();

var fpsMax = 60;
