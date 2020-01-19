class Hud {
    constructor(){
		this.canvas = addCanvas();
        this.context = this.canvas.getContext("2d");

        
        this.hudImg = new Image();
        this.hudImg.src = "./sprites/hud/hud.png";
        this.width = 255;
        this.height = 1080;

        //this.items = [];

        this.inventoryX = 9;
        this.inventoryY = 510;
        this.itemSize = 48;
        this.slotSize = 63;

        this.temp = 0;
        this.temp2 = 0;

    }

    get offset(){
        return canvas.width - this.width;
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
        //this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.addToContext(this.hudImg, this.offset, 0, this.width, this.height);
        this.addHealthBar();
        this.drawItems()
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

    clickOnHud(x, y){
        return x >= this.offset;
    }

    handleClick(x, y){
        if(game.mouse.left.start){
            this.handleClickStart(x, y);
        } else {
            console.log("continue click");
        }
        //this.addToContext(game.map.grass.img, x, y, game.map.grass.width, game.map.grass.height);
    }

    inventorySlotX(x){
        return this.offset + this.inventoryX + x * this.slotSize;
    }
    
    inventorySlotY(y){
        return this.inventoryY + y * this.slotSize;
    }

    handleClickStart(x, y){
        var x = this.getSlotX(x);
        var y = this.getSlotY(y);
        if(x != null && y != null && game.inventory.get(x, y) == null){
            var item = new ItemEntity("arrow");
            item.move(x, y);
        }
    }

    getSlotX(x){
        x = x - this.inventorySlotX(0);
        if(x % this.slotSize < this.itemSize){
            return Math.floor(x / 63)
        } else {
            return null;
        }
    }

    getSlotY(y){
        y = y - this.inventorySlotY(0);
        if(y % this.slotSize < this.itemSize){
            return Math.floor(y / 63)
        } else {
            return null;
        }
    }

    drawItems(){
        for(var j = 0; j < game.inventory.height; j++){
            for(var i = 0; i < game.inventory.width; i++){
                if(game.inventory.get(i, j)){
                    var img = game.itemSprites[game.inventory.get(i, j).itemSpriteKey];
                    this.context.drawImage(img, this.inventorySlotX(game.inventory.get(i, j).x), this.inventorySlotY(game.inventory.get(i, j).y));
                    
                }
            }
        }
	}
    
}