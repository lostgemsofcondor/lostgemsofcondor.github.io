class Overlay {
    constructor(){
		this.canvas = main.addCanvas();
        this.context = this.canvas.getContext("2d");
        
		this.lightCanvas = main.addCanvas();
        this.lightContext = this.lightCanvas.getContext("2d");

        this.dayLength = 86400;
        this.nightLevel = .9;
        this.sunset = 54000;
        this.sunsetLength = 3600;
        this.sunrise = this.dayLength - this.sunsetLength;

        this.dayOffset = 0;

        
        for(var i = 0; i < 4; i++){
            game.imageBuilder.buildLighting(128 + i, 5)
            // game.imageBuilder.buildLighting(32 + i, 2)
            // game.imageBuilder.buildLighting(16 + i, 2)
        }
        for(var i = 0; i < 8; i++){
            game.imageBuilder.buildLighting(32 + i, 2)
        }
        for(var i = 0; i < 8; i++){
            game.imageBuilder.buildLighting(16 + i, 2)
        }
    }

    resize(){
        this.canvas.width = game.width;
        this.canvas.height = game.height;

        this.lightCanvas.width = game.width;
        this.lightCanvas.height = game.height;
    }

    redraw(){
        this.clearCanvas();
        this.draw();
    }

    clearCanvas(){
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.lightContext.clearRect(0, 0, this.lightCanvas.width, this.lightCanvas.height);
    }

    draw(){
        this.dayNight();
        this.drawLighting();
    }

    drawLighting(){
        this.lightContext.globalCompositeOperation = "lighter";
        
        var largeLightImg = game.imageBuilder.buildLighting(128 + game.periodic(32, 4), 5)

        var mediumLightImg = game.imageBuilder.buildLighting(32 + game.periodic(16, 8), 2);

        var smallLightImg = game.imageBuilder.buildLighting(16 + game.periodic(8, 8), 2);

        

        
		game.entityList.list.forEach(o => {
            var e = game.get(o.key);
            if(e.light == "large"){
                this.lightContext.drawImage(largeLightImg, e.sprite.adjustXCord() - largeLightImg.width/2, e.sprite.adjustYCord() - largeLightImg.height/2);
            } else if(e.light == "medium"){
                this.lightContext.drawImage(mediumLightImg, e.sprite.adjustXCord() - mediumLightImg.width/2, e.sprite.adjustYCord() - mediumLightImg.height/2);
            } else if(e.light == "small"){
                this.lightContext.drawImage(smallLightImg, e.sprite.adjustXCord() - smallLightImg.width/2, e.sprite.adjustYCord() - smallLightImg.height/2);
            }
        });

        this.context.globalCompositeOperation = "destination-out";
        this.context.drawImage(this.lightCanvas, 0, 0);
        this.context.globalCompositeOperation = "source-over";


    }

    
    dayNight(){
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.context.fillStyle = "rgba(0, 0, 0, " + this.lightLevel() + ")";
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }

    lightLevel(){
        if(game.scene){
            return game.scene.lightLevel;
        }
        var tick = game.gameTick - this.dayOffset % this.dayLength;
        if(tick < this.sunset){
            return 0;
        }

        if(tick > this.sunrise){
            return this.nightLevel - (tick - this.sunrise)*this.nightLevel/this.sunsetLength
        }

        return Math.min((tick - this.sunset)*this.nightLevel/this.sunsetLength, this.nightLevel);
    }

    pad(num, size) {
        var s = num+"";
        while (s.length < size) s = "0" + s;
        return s;
    }

    getTimeString(){
        var tick = (game.gameTick - this.dayOffset + 16200) % this.dayLength;
        var minute = Math.floor(tick/60) % 60;

        var hour = Math.floor(tick/(60*60)) % (60*60);
        var m = "am";
        if(hour >= 12){
            m = "pm";
            if(hour > 12){
                hour -= 12;
            }
        } else if(hour == 0){
            hour = 12;
        }

        return hour + ":" + this.pad(minute, 2) + " " + m;
    }
}