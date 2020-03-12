class Hud {
    constructor(){
		this.canvas = addCanvas();
        this.context = this.canvas.getContext("2d");

        
        this.hudImg = new Image();
        this.hudImg.src = "./sprites/hud/hud.png";

        this.menuImg = new Image();
        this.menuImg.src = "./sprites/hud/menu.png";
        this.menuSingleImg = new Image();
        this.menuSingleImg.src = "./sprites/hud/menuSingle.png";
        
        this.menuTopImg = new Image();
        this.menuTopImg.src = "./sprites/hud/menuTop.png";
        this.menuBottomImg = new Image();
        this.menuBottomImg.src = "./sprites/hud/menuBottom.png";
        

        this.width = 384;
        this.height = 1080;

        //this.items = [];

        this.inventoryX = 42;
        this.inventoryY = 510;
        this.itemSize = 48;
        this.slotSize = 68;

        this.temp = 0;
        this.temp2 = 0;

        this.skillUpdated = -1;

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
        this.addHealthBar();
        this.addStaminaBar();

        this.addToContext(this.hudImg, this.offset, 0, this.width, this.height);
        this.addSkillBar();
        this.addText();
        this.drawItems();
        this.drawRightClickMenu();
    }

    addText(){
        var x = this.offset + 12;
        var y = 920;
        this.context.font = "14px pixel_font";
        this.context.textAlign = "left";

		this.context.fillStyle = game.config.black;
        this.context.fillText("Press the space to dash", x, y);
        this.context.fillText("Hold shift to fire arrows", x, y+14);

        this.context.fillText("Endurance Level: " + game.experienceService.enduranceLevel, x, y+14*4);
        this.context.fillText("Endurance EXP: " + game.experienceService.endurance, x, y+14*5);
        this.context.fillText("Endurance EXP to", x, y+14*6);
        this.context.fillText("Next Level: " + game.experienceService.nextLevelEXP(game.experienceService.enduranceLevel), x, y+14*7);
    }

    addHealthBar(){
        var x = this.offset + 48;
        var y = 100;
        var width = 288;
        var height = 24;
        var health = game.player.health;
        var maxHealth = game.player.maxHealth;

        this.context.fillStyle = game.config.healthGreen;
        this.context.fillRect(x, y, width, height);
        
        this.context.fillStyle = game.config.lightGray;
        this.context.fillRect(x + width * health/maxHealth, y, width - width * health/maxHealth, height);

        this.context.font = "20px pixel_font";
        this.context.textAlign = "center";
        this.context.textBaseline = "middle";
		this.context.fillStyle = game.config.gray;
        this.context.fillText(health + "/" + maxHealth, x + width/2, y + height/2);

    }

    addStaminaBar(){
        var x = this.offset + 48;
        var y = 136;
        var width = 288;
        var height = 24;
        var stamina = game.player.stamina;
        var maxStamina = game.player.maxStamina;

        this.context.fillStyle = game.config.staminaOrange;
        this.context.fillRect(x, y, width, height);
        
        this.context.fillStyle = game.config.lightGray;
        this.context.fillRect(x + width * stamina/maxStamina, y, width - width * stamina/maxStamina, height);

        this.context.font = "19px pixel_font";
        this.context.textAlign = "center";
        this.context.textBaseline = "middle";
		this.context.fillStyle = game.config.gray;
        this.context.fillText(stamina + "/" + maxStamina, x + width/2, y + height/2);
    }

    addSkillBar(){
        if(this.skillUpdated < game.gameTick){
            return;
        }
        var x = this.offset - 300;
        var y = 30;
        var width = 247;
        var height = 30;

        

        var current = game.experienceService[this.skill];
        var last = this.skillLast;
        var max = this.skillNext;
        

        this.context.fillStyle = game.config.expGold;
        this.context.fillRect(x, y, width, height);
        
        this.context.fillStyle = game.config.lightGray;
        this.context.fillRect(x + width * (current - last)/(max - last), y, width - width * (current - last)/(max - last), height);

        this.context.font = "20px pixel_font";
        this.context.fillStyle = game.config.gray;
        
        this.context.textAlign = "left";
        this.context.textBaseline = "top";
        this.context.fillText(this.skillText, x, y - 20);
        this.context.textAlign = "center";
        this.context.textBaseline = "middle";
        this.context.fillText(current + "/" + max, x + width/2, y + height/2);
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
        this.context.font = "14px pixel_font";
        this.context.textAlign = "left";
        this.context.textBaseline = "hanging";

        this.context.fillStyle = game.config.black;
        
        var heldItem = null
        for(var j = 0; j < game.inventory.height; j++){
            for(var i = 0; i < game.inventory.width; i++){
                var item = game.inventory.get(i, j);
                if(item != null){
                    if(game.mouse.heldItem == item.itemKey){
                        heldItem = item;
                    } else {
                        var img = game.itemSprites[item.itemSpriteKey];
                        var x = this.inventorySlotX(item.x);
                        var y = this.inventorySlotY(item.y);
                        this.context.drawImage(img, x, y);
                        if(item.amount > 1){
                            this.context.fillText(item.amount, x, y);
                        }
                    }
                }
            }
        }
        if(heldItem != null){
            var img = game.itemSprites[heldItem.itemSpriteKey];
            this.context.drawImage(img, game.mouse.x, game.mouse.y);
        }
    }
    
    setSkill(skill, skillLast, skillNext){
        this.skill = skill;
        this.skillLast = skillLast;
        this.skillNext = skillNext;
        this.skillUpdated = game.gameTick + 600;
        this.skillText = "Endurance Progress"
    }

    drawRightClickMenu(){
        if(game.menu && game.menu.options.length > 0){
            this.context.font = "19px pixel_font";
            this.context.textBaseline = "middle";
            this.context.fillStyle = game.config.black;
            var offsetY = 0;
            offsetY += this.menuHelper(this.menuTopImg, game.menu.x, game.menu.y + offsetY);
            var i;
            for(i = 0; i < game.menu.options.length - 1; i += 2){
                offsetY += this.menuHelper(this.menuImg, game.menu.x, game.menu.y + offsetY);
                this.context.fillText(game.menu.options[i].getText(), game.menu.x + 48, game.menu.y + offsetY - 80+18);
                this.context.fillText(game.menu.options[i + 1].getText(), game.menu.x + 48, game.menu.y + offsetY - 80+58);
                
            }
            if(game.menu.options.length%2 == 1){
                offsetY += this.menuHelper(this.menuSingleImg, game.menu.x, game.menu.y + offsetY);
                this.context.fillText(game.menu.options[i].getText(), game.menu.x + 48, game.menu.y + offsetY - 40+18);
            }
            offsetY += this.menuHelper(this.menuBottomImg, game.menu.x, game.menu.y + offsetY);
        }
    }

    menuHelper(img, x, y){
        this.context.drawImage(img, x, y);
        return img.height;
    }
}