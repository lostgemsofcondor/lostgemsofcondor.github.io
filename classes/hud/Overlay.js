class Overlay {
    constructor(){
		this.canvas = addCanvas();
        this.context = this.canvas.getContext("2d");

        this.dayLength = 86400;
        this.nightLevel = .9;
        this.sunset = 54000;
        this.sunsetLength = 3600;
        this.sunrise = this.dayLength - this.sunsetLength;

        
        this.img = new Image();
        this.img.src = "./sprites/lighting/light.png";

    }

    resize(){
        this.canvas.width = game.width;
        this.canvas.height = game.height;
    }

    redraw(){
        this.clearCanvas();
        this.draw();
    }

    clearCanvas(){
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    draw(){
        this.dayNight();
        this.drawLighting();
    }

    drawLighting(){
        this.context.globalCompositeOperation = "destination-out";
        //this.context.drawImage(this.img, game.player.sprite.adjustXCord(), game.player.sprite.adjustYCord())
        this.context.drawImage(this.img, game.player.sprite.adjustXCord() - 1080/2, game.player.sprite.adjustYCord() - 1080/2)
        this.context.globalCompositeOperation = "source-over";
    }
    
    dayNight(){
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.context.fillStyle = "rgba(0, 0, 0, " + this.lightLevel() + ")";
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }

    lightLevel(){
        //return this.nightLevel;
        var tick = game.gameTick % this.dayLength;
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
        var tick = (game.gameTick + 16200) % this.dayLength;
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