class Hud {
    constructor(){
		this.canvas = main.addCanvas();
        this.context = this.canvas.getContext("2d");

        this.width = 384;
        this.height = 1080;
        
        this.hudImg = new Image();
        this.hudImg.src = "./sprites/hud/hud.png";
        
        this.hudInventoryHighlightedImg = new Image();
        this.hudInventoryHighlightedImg.src = "./sprites/hud/hudInventoryHighlighted.png";
        
        this.hudSkillsHighlightedImg = new Image();
        this.hudSkillsHighlightedImg.src = "./sprites/hud/hudSkillsHighlighted.png";

        this.hudWorkspaceImg = new Image();
        this.hudWorkspaceImg.src = "./sprites/hud/hudWorkspace.png";

        this.hudWorkspaceLevelsImg = new Image();
        this.hudWorkspaceLevelsImg.src = "./sprites/hud/hudWorkspaceLevels.png";

        this.menuImg = new Image();
        this.menuImg.src = "./sprites/hud/menu.png";
        this.menuSingleImg = new Image();
        this.menuSingleImg.src = "./sprites/hud/menuSingle.png";

        this.menuImgSelectTop = new Image();
        this.menuImgSelectTop.src = "./sprites/hud/menuSelectTop.png";
        this.menuImgSelectBotom = new Image();
        this.menuImgSelectBotom.src = "./sprites/hud/menuSelectBottom.png";
        this.menuSingleImgSelected = new Image();
        this.menuSingleImgSelected.src = "./sprites/hud/menuSingleSelected.png";
        
        this.menuTopImg = new Image();
        this.menuTopImg.src = "./sprites/hud/menuTop.png";
        this.menuBottomImg = new Image();
        this.menuBottomImg.src = "./sprites/hud/menuBottom.png";

        this.windowTopLeft = new Image();
        this.windowTopLeft.src = "./sprites/hud/windowTopLeft.png";
        this.windowTopRight = new Image();
        this.windowTopRight.src = "./sprites/hud/windowTopRight.png";
        this.windowTopRightNoX = new Image();
        this.windowTopRightNoX.src = "./sprites/hud/windowTopRightNoX.png";
        this.windowBottomLeft = new Image();
        this.windowBottomLeft.src = "./sprites/hud/windowBottomLeft.png";
        this.windowBottomRight = new Image();
        this.windowBottomRight.src = "./sprites/hud/windowBottomRight.png";
        
        this.weaponSlot = new Image();
        this.weaponSlot.src = "./sprites/hud/weaponSlot.png";
        this.ammunitionSlot = new Image();
        this.ammunitionSlot.src = "./sprites/hud/ammunitionSlot.png";
        this.helmSlot = new Image();
        this.helmSlot.src = "./sprites/hud/helmSlot.png";
        this.breastplateSlot = new Image();
        this.breastplateSlot.src = "./sprites/hud/breastplateSlot.png";
        this.greaveSlot = new Image();
        this.greaveSlot.src = "./sprites/hud/greaveSlot.png";

        this.menu = null;

        this.console = new GameWindow(0, this.height - 256).setWidth(512).setHeight(256);
        this.console.open = false;
        this.consoleLog = [];

        this.craftingMenu = new CraftingMenu();
        this.entityInfo = new EntityInfo();
        this.dialog = new Dialog();
        
        game.inventories.push(
            new Inventory(45, 510, 5, 6, "inventory"),
            new Inventory(66, 258, 1, 2, "weapons"),
            new Inventory(177, 237, 1, 3, "armor"));

        this.temp = 0;
        this.temp2 = 0;

        this.skillUpdated = -1;

        this.tab = "inventory";
    }

    get offset(){
        return main.canvas.width - this.width;
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

        if(this.mouseOnInventoryButton()){
            this.addToContext(this.hudInventoryHighlightedImg, this.offset, 0);
        } else if(this.mouseOnSkillsButton()){
            this.addToContext(this.hudSkillsHighlightedImg, this.offset, 0);
        } else {
            this.addToContext(this.hudImg, this.offset, 0);
        }

        if(this.tab == "skills"){
            this.drawStats();
        } else {
            this.addToContext(this.hudWorkspaceImg, this.offset, this.height - this.hudWorkspaceImg.height);
        }
        this.addSkillBar();
        this.drawConsole();
        this.addText();
        this.entityInfo.draw(this.context);
        this.craftingMenu.draw(this.context);
        this.dialog.draw(this.context);

        this.drawSlots()
        this.drawItems();

        this.drawRightClickMenu();
    }

    drawStats(){
        var skillX = this.offset + 108;
        var progressX = this.offset + 201;
        var progressCenterX = this.offset + 249;
        var levelX = this.offset + 336;
        var y = 567;
        var gap = 37;

        var progressWidth = 96;
        var progressHeight = 21;

        // draw exp bars

        var skills = ["endurance", "crafting", "woodcutting"];

        for(var i = 0; i < skills.length; i ++){
            var skill = skills[i];
            var progress = game.experienceService.progress(skill);
            this.context.fillStyle = game.config.expGold;
            this.context.fillStyle = game.config.expGold;
            this.context.fillRect(progressX, y, progressWidth, progressHeight);
            this.context.fillStyle = game.config.lightGray;
            this.context.fillRect(Math.floor(progressX + progressWidth * progress), y, Math.ceil(progressWidth - progressWidth * progress), progressHeight);

            y += gap;
        }


        this.addToContext(this.hudWorkspaceLevelsImg, this.offset, this.height - this.hudWorkspaceImg.height);
        // draw stats text
        y = 570;
        
        for(var i = 0; i < skills.length; i ++){
            var skill = skills[i];
            var progress = game.experienceService.progress(skill);
            game.font.writeCentered(this.context, skill, skillX, y, true);
            game.font.writeCentered(this.context, Math.floor(progress * 1000)/10 + "%", progressCenterX, y, true);
            game.font.writeCentered(this.context, game.experienceService.level(skill), levelX, y, true);

            y += gap;
        }
    }

    addText(){
        game.font.writeCentered(this.context, "Inventory", this.offset + 99, 462, true);
        game.font.writeCentered(this.context, "Skills", this.offset + 279, 462, true);
    }

    addHealthBar(){
        var x = this.offset + 42;
        var y = 99;
        var width = 300;
        var height = 21;
        var health = game.player.health;
        var maxHealth = game.player.maxHealth;

        this.context.fillStyle = game.config.healthGreen;
        this.context.fillRect(x, y, width, height);
        
        this.context.fillStyle = game.config.lightGray;
        this.context.fillRect(Math.floor(x + width * health/maxHealth), y, Math.floor(width - width * health/maxHealth), height);

        game.font.writeCentered(this.context, health + "/" + maxHealth, x + width/2, y + 3, true);
    }

    addStaminaBar(){
        var x = this.offset + 42;
        var y = 135;
        var width = 300;
        var height = 21;
        var stamina = game.player.stamina;
        var maxStamina = game.player.maxStamina;

        this.context.fillStyle = game.config.staminaOrange;
        this.context.fillRect(x, y, width, height);
        
        this.context.fillStyle = game.config.lightGray;
        this.context.fillRect(x + width * stamina/maxStamina, y, width - width * stamina/maxStamina, height);

        game.font.writeCentered(this.context, stamina + "/" + maxStamina, x + width/2, y + 3, true);
    }

    addSkillBar(){
        if(this.skillUpdated < game.gameTick){
            return;
        }
        var x = this.offset - 300;
        var y = 0;
        var width = 247;
        var height = 21;

        var gap = 18;

        var gameWindow = new GameWindow(x, y).setWidth(width).setHeight(height);
        gameWindow.draw(this.context);
        

        var current = game.experienceService[this.skill];
        var last = this.skillLast;
        var max = this.skillNext;
        
        width -= gap*2
        this.context.fillStyle = game.config.expGold;
        this.context.fillRect(x + gap, y + 30, width, height);
        
        this.context.fillStyle = game.config.lightGray;
        this.context.fillRect(x + gap + width * (current - last)/(max - last), y + 30, width - width * (current - last)/(max - last), height);
        
        game.font.writeCentered(this.context, this.skillText, Math.floor(x + gameWindow.width/2), y + gap);
        game.font.writeCentered(this.context, current + "/" + max, Math.floor(x + gameWindow.width/2), y + 33, true);
    }

    addToContext(img, x, y, width = null, height = null){
        if(width && height){
            this.context.drawImage(img, x, y, width, height)
        } else {
            this.context.drawImage(img, x, y);
        }
    }

    clickOnHud(x, y){
        if(x >= this.offset ||
            this.console.clicked(x, y) ||
            this.entityInfo.clicked(x, y) ||
            (this.menu && this.menu.clicked(x, y)) ||
            this.dialog.clicked(x, y) ||
            this.craftingMenu.clicked(x, y)){
            return true;
        } else {
            delete this.menu;
            return false;
        }
    }

    handleClick(x, y){
        if(game.mouse.left.start){
            this.handleClickStart(x, y);
        } else if(game.mouse.left.end){
            this.handleClickEnd(x, y);
        } else if(game.mouse.right.start){
            this.handleRightClickStart(x, y);
        } 
        //do nothing on right click end
    }


    log(text){
        if(text){
            this.console.open = true;
            this.consoleLog.push(text);
        }
    }

    mouseOnInventoryButton(){
        return game.mouse.x >= this.offset + 15 && game.mouse.x <= this.offset + 189 && game.mouse.y >= 459 && game.mouse.y <= 480;
    }

    mouseOnSkillsButton(){
        return game.mouse.x >= this.offset + 195 && game.mouse.x <= this.offset + 369 && game.mouse.y >= 459 && game.mouse.y <= 480;
    }

    handleClickStart(x, y){
        if((this.menu && this.menu.clicked(x, y))){
            var option = this.menu.clickedOption(x, y);
            if(option){
                option.execute();
                if(option.log != null){
                    this.log(option.log);
                }
                delete this.menu;
            }
            return;
        } else {
            delete this.menu;
        }
         
        if(this.craftingMenu.open){
            if(this.craftingMenu.clicked(x, y) == 1){
                this.craftingMenu.selectRecipe();
                return;
            } else {
                this.craftingMenu.closeWindow();
            }
        }

        if(game.mouse.onHud){
            if(this.console.clicked(x, y) == 2){
                this.console.open = false;
                return;
            }

            if(this.mouseOnInventoryButton()){
                this.tab = "inventory"
                return;
            }
            if(this.mouseOnSkillsButton()){
                this.tab = "skills"
                return;
            }

            if(this.entityInfo.clicked(x, y) == 2){
                this.entityInfo.open = false;
                return;
            }
            
            if(this.dialog.clicked(x, y) == 2){
                this.dialog.open = false;
                game.paused = false;
                return;
            }
            
            if(this.dialog.clicked(x, y) == 1){
                this.dialog.onClick();
                return;
            }

            for(var i in game.inventories){
                var inventory = game.inventories[i];
                if(inventory.location == "inventory" && this.tab != "inventory"){
                    continue;
                }
                var slotX = inventory.getSlotX(x);
                var slotY = inventory.getSlotY(y);
                if(slotX != null && slotY != null && inventory.get(slotX, slotY)){
                    var item = inventory.get(slotX, slotY);
                    if(item != null){
                        var x = inventory.inventorySlotX(item.x);
                        var y = inventory.inventorySlotY(item.y);
                        game.mouse.clickItem(item, x, y);
                        return;
                    }
                }
            }
        }
    }

    handleClickEnd(x, y){
        if(game.mouse.holdingItem){
            if(!this.clickOnHud(x, y)){
                
                for(var i in game.inventories){
                    var inventory = game.inventories[i];
                    var item = inventory.getWithKey(game.mouse.heldItem);
                    if(item != null){
                        break;
                    }
                }
                item.droppedByPlayer = true;
                game.player.drop(item);
            } else {
                
                for(var i in game.inventories){
                    var inventory = game.inventories[i];
                    
                    if(inventory.location == "inventory" && this.tab != "inventory"){
                        continue;
                    }
                    var slotX = inventory.getSlotX(x);
                    var slotY = inventory.getSlotY(y);
                    //validate position
                    if(slotX != null && slotY != null){
                        if(inventory.get(slotX, slotY) == null){
                            var item = inventory.getWithKey(game.mouse.heldItem);
                            item.move(inventory, slotX, slotY);
                            //move selected item
                        } else {
                            inventory.getWithKey(game.mouse.heldItem).swap(inventory.get(slotX, slotY));
                        }
                    }
                }
            }

            game.mouse.holdingItem = false;
            game.mouse.heldItem = -1;
        }
    }

    handleRightClickStart(x, y){


    }

    drawSlots(){
        var weaponsInventory = game.getInventory("weapons");
        var armorInventory = game.getInventory("armor");
        if(weaponsInventory.get(0, 0) == null){
            var x = weaponsInventory.inventorySlotX(0);
            var y = weaponsInventory.inventorySlotY(0);
            this.context.drawImage(this.weaponSlot, x, y);
        }
        if(weaponsInventory.get(0, 1) == null){
            var x = weaponsInventory.inventorySlotX(0);
            var y = weaponsInventory.inventorySlotY(1);
            this.context.drawImage(this.ammunitionSlot, x, y);
        }
        
        if(armorInventory.get(0, 0) == null){
            var x = armorInventory.inventorySlotX(0);
            var y = armorInventory.inventorySlotY(0);
            this.context.drawImage(this.helmSlot, x, y);
        }
        if(armorInventory.get(0, 1) == null){
            var x = armorInventory.inventorySlotX(0);
            var y = armorInventory.inventorySlotY(1);
            this.context.drawImage(this.breastplateSlot, x, y);
        }
        if(armorInventory.get(0, 2) == null){
            var x = armorInventory.inventorySlotX(0);
            var y = armorInventory.inventorySlotY(2);
            this.context.drawImage(this.greaveSlot, x, y);
        }        
    }

    drawItems(){
        this.context.font = "14px pixel_font";
        this.context.textAlign = "left";
        this.context.textBaseline = "hanging";

        this.context.fillStyle = game.config.black;
        
        var heldItem = null
        for(var i in game.inventories){
            var inventory = game.inventories[i];
            if(inventory.location == "inventory" && this.tab != "inventory"){
                continue;
            }

            var temp = inventory.draw(this.context);
            if(temp != null){
                heldItem = temp;
            }
        }
        if(heldItem != null){
            var img = heldItem.getDefinition().img;
            this.context.drawImage(img, game.mouse.x - game.mouse.itemOffsetX, game.mouse.y - game.mouse.itemOffsetY);
        }
    }
    
    setSkill(skill, skillLast, skillNext){
        this.skill = skill;
        this.skillLast = skillLast;
        this.skillNext = skillNext;
        this.skillUpdated = game.gameTick + 600;
        this.skillText = skill.charAt(0).toUpperCase() + skill.slice(1) + " Progress"
    }

    drawRightClickMenu(){
        if(this.menu){
            this.menu.draw(this.context);
        }
    }

    drawConsole(){
        if(this.console.open){
            this.console.draw(this.context);

            var offsetY = 0;
            for(var i = this.consoleLog.length - 1; i >= 0; i--){
                var strings = this.consoleLog[i].split("\n").reverse();
                for(var s in strings){
                    if(offsetY > 200){
                        return;
                    }
                    game.font.write(this.context, strings[s], this.console.x + 20, this.console.y + this.console.height - 30 - offsetY);
                    offsetY += 14;
                }
            }
        }
    }

    openCraftingTable(){
        this.craftingMenu.openWindow();
    }
}