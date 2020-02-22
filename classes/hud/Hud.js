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
        this.addStaminaBar();
        this.addText();
        this.drawItems();
    }

    addText(){
        var x = this.offset + 4;
        var y = 835;
        this.context.font = "14px pixel_font";
        this.context.textAlign = "left";

		this.context.fillStyle = game.config.white;
		this.context.fillText("Hold the space bar to fire arrows", x, y);
    }

    addHealthBar(){
        var x = this.offset + 4;
        var y = 30;
        var width = 247;
        var height = 30;
        var health = game.player.health;
        var maxHealth = game.player.maxHealth;

        this.context.fillStyle = game.config.healthGreen;
        this.context.fillRect(x, y, width, height);
        
        this.context.fillStyle = game.config.healthRed;
        this.context.fillRect(x + width * health/maxHealth, y, width - width * health/maxHealth, height);
    }

    addStaminaBar(){
        var x = this.offset + 4;
        var y = 70;
        var width = 247;
        var height = 30;
        var stamina = game.player.stamina;
        var maxStamina = game.player.maxStamina;

        this.context.fillStyle = game.config.staminaOrange;
        this.context.fillRect(x, y, width, height);
        
        this.context.fillStyle = game.config.gray;
        this.context.fillRect(x + width * stamina/maxStamina, y, width - width * stamina/maxStamina, height);
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
        } else if(game.mouse.left.end){
            this.handleClickEnd(x, y);

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
        if(x != null && y != null && game.inventory.get(x, y)){
            var item = game.inventory.get(x, y);
            if(item != null){
                this.clickItem(item);
            }
        }
    }

    handleClickEnd(x, y){
        var slotX = this.getSlotX(x);
        var slotY = this.getSlotY(y);
        if(game.mouse.holdingItem && slotX != null && slotY != null && game.inventory.get(slotX, slotY) == null){
            var item = game.inventory.getWithKey(game.mouse.heldItem);
            item.move(slotX, slotY);
            //move selected item
        } 
        if(!this.clickOnHud(x, y) && game.mouse.holdingItem){
            var item = game.inventory.getWithKey(game.mouse.heldItem);
            item.droppedByPlayer = true;
            game.player.drop(item);
            
        }
        game.mouse.holdingItem = false;
        game.mouse.heldItem = -1;
    }

    clickItem(item){
        game.mouse.holdingItem = true;
        game.mouse.heldItem = item.itemKey;
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
        var heldItem = null
        for(var j = 0; j < game.inventory.height; j++){
            for(var i = 0; i < game.inventory.width; i++){
                var item = game.inventory.get(i, j);
                if(item != null){
                    if(game.mouse.heldItem == item.itemKey){
                        heldItem = item;
                    } else {
                        var img = game.itemSprites[item.itemSpriteKey];
                        this.context.drawImage(img, this.inventorySlotX(item.x), this.inventorySlotY(item.y));
                    }
                }
            }
        }
        if(heldItem != null){
            var img = game.itemSprites[heldItem.itemSpriteKey];
            this.context.drawImage(img, game.mouse.x, game.mouse.y);
        }
	}
    
}