class Hud {
    constructor(){
		this.canvas = addCanvas();
        this.context = this.canvas.getContext("2d");

        
        this.hudImg = new Image();
        this.hudImg.src = "./sprites/hud/hud.png";
        this.width = 255;
        this.height = 1080;
    }

    get offset(){
        return canvas.width - this.width;
    }

    resize(){
        this.canvas.width = game.width;
        this.canvas.height = game.height;
    }

    draw(){
        this.addToContext(this.hudImg, this.offset, 0, this.width, this.height);
        this.addHealthBar();
    }

    addHealthBar(){
        var x = this.offset + 4;
        var y = 60;
        var width = 247;
        var height = 30;
        var health = game.player.health;
        var maxHealth = game.player.maxHealth;

        this.context.fillStyle = game.config.healthGreen;
        this.context.fillRect(x, y, width, height);
        
        this.context.fillStyle = game.config.healthRed;
        this.context.fillRect(x + width * health/maxHealth, y, width - width * health/maxHealth, height);
    }

    addToContext(img, x, y, width = null, height = null){
        if(width && height){
            this.context.drawImage(img, x, y, width, height)
        } else {
            this.context.drawImage(img, x, y);
        }
    }
}