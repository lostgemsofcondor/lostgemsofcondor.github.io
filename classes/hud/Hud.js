class Hud {
    constructor(){
		this.canvas = addCanvas();
        this.context = this.canvas.getContext("2d");

        
        this.hudImg = new Image();
        this.hudImg.src = "./sprites/hud/hud.png";
        this.width = 255;
        this.height = 1080;
    }

    resize(){
        console.log("resized");
        this.canvas.width = game.width;
        this.canvas.height = game.height;
    }

    draw(){
        this.addToContext(this.hudImg, canvas.width - this.width, 0, this.width, this.height);
    }

    addToContext(img, x, y, width = null, height = null){
        if(width && height){
            this.context.drawImage(img, x, y, width, height)
        } else {
            this.context.drawImage(img, x, y);
        }
    }
}