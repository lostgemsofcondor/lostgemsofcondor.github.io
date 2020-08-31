class Inventory {
	constructor(x, y, width, height, location = "inventory"){
        this.width = width;
        this.height = height;
        this.location = location;
        this.inv = [];

        
        //inventory dimensions
        this.x = x;
        this.y = y;
        this.itemSize = 48;
        this.slotSize = 66; //including gap
        this.slotGap = this.slotSize - this.itemSize;


        for(var j = 0; j < this.height; j++){
            var temp = [];
            for(var i = 0; i < this.width; i++){
                temp.push(null);
            }
            
            this.inv.push(temp);
        }

        for(var i in game.save.inventory){
            if(game.save.inventory[i].location == this.location){
                this.inv[game.save.inventory[i].y][game.save.inventory[i].x] = i;
            }
        }
    }

    
    inventorySlotX(x){
        return game.hud.offset + this.x + x * this.slotSize;
    }
    
    inventorySlotY(y){
        return this.y + y * this.slotSize;
    }
    
    getSlotX(x){
        x = x - this.inventorySlotX(0) + this.slotGap/2;
        if(x % this.slotSize < this.itemSize + this.slotGap){
            return Math.floor(x / this.slotSize)
        } else {
            return null;
        }
    }

    getSlotY(y){
        y = y - this.inventorySlotY(0) + this.slotGap/2;
        if(y % this.slotSize < this.itemSize + this.slotGap){
            return Math.floor(y / this.slotSize)
        } else {
            return null;
        }
    }

    get(x, y){
        if(this.valid(x, y) && this.inv[y][x] != null){
            return new ItemEntity(this.inv[y][x]);
        }
        return null;
    }

    getWithKey(key){
        return new ItemEntity(key);
    }

    getWithItemKey(itemKey, nonFullStack = false){
        for(var y = 0; y < this.height; y++){
            for(var x = 0; x < this.width; x++){
                var item = new ItemEntity(this.inv[y][x]);
                if(item.data && item.itemKey == itemKey){
                    var maxStack = item.getDefinition().maxStack;
                    if(!nonFullStack || item.amount < maxStack){
                        return item;
                    }
                }
            }
        }
        return null;
    }

    getWithItemType(type){
        for(var y = 0; y < this.height; y++){
            for(var x = 0; x < this.width; x++){
                var item = new ItemEntity(this.inv[y][x]);
                if(item.data && item.getDefinition() instanceof type){
                    return item;
                }
            }
        }
        return null;
    }
    
    getItemsWithItemKey(itemKey){
        var items = [];
        for(var y = 0; y < this.height; y++){
            for(var x = 0; x < this.width; x++){
                var item = new ItemEntity(this.inv[y][x]);
                if(item.data && item.itemKey == itemKey){
                    var maxStack = game.itemService[item.itemKey].maxStack;
                    items.push(item);
                }
            }
        }
        return items;
    }

    getItemCounts(){
        var counts = {};
        for(var y = 0; y < this.height; y++){
            for(var x = 0; x < this.width; x++){
                var item = new ItemEntity(this.inv[y][x]);
                if(item.data){
                    if(counts[item.itemKey]){
                        counts[item.itemKey] += item.amount;
                    } else {
                        counts[item.itemKey] = item.amount;
                    }
                }
            }
        }
        return counts;
    }

    // Craft recipe that is assumed you can.
	craft(recipe){
        for(var i in recipe.inputs){
            var input = recipe.inputs[i];
            var inputKey = input[0];
            var inputAmount = input[1];
            
            this.discard(inputAmount, inputKey);
        }
        var leftOver = new ItemEntity().newEntity(recipe.output[0], this.location, recipe.output[1]);
        if(leftOver > 0){
            new DroppedItem(game.player.x, game.player.y).setItemKey(recipe.output[0]).setAmount(leftOver);
            game.hud.log("Not enough inventory space item crafted was dropped");
        }
        var sound = game.itemService[recipe.output[0]].pickedSound;
        if(sound){
            sound.play();
        }
        game.experienceService.crafting += recipe.exp;
    }
    
    discard(inputAmount, inputKey){
        var items = this.getItemsWithItemKey(inputKey);
        for(var j in items){
            var item = items[j];
            if(item.amount < inputAmount){
                inputAmount -= item.amount;
                item.discard(item.amount);
            } else {
                item.discard(inputAmount);
                return;
            }
        }
    }

    draw(context){
        var heldItem = null;
        for(var j = 0; j < this.height; j++){
            for(var i = 0; i < this.width; i++){
                var item = this.get(i, j);
                if(item != null){
                    if(game.mouse.heldItem == item.itemEntityKey){
                        heldItem = item;
                    } else {
                        var img = item.getDefinition().img;
                        var x = this.inventorySlotX(item.x);
                        var y = this.inventorySlotY(item.y);
                        context.drawImage(img, x, y);
                        if(item.amount != 1){
                            game.font.write(context, item.amount, x - 4, y - 4);
                        }
                    }
                }
            }
        }
        return heldItem;
    }

    valid(x, y){
        return x >= 0 && x < this.width && y >= 0 && y < this.height;
    }

    removeAt(oldX, oldY){
        if(oldX != null && oldY != null){
            this.inv[oldY][oldX] = null;
        }
    }

    forceAdd(item){
        this.inv[item.y][item.x] = item.itemEntityKey;
    }

    add(item){
        
        var stack = this.getWithItemKey(item.itemKey, true);
        if(stack != null){
            var maxStack = item.getDefinition().maxStack;
            var temp = Math.min(maxStack, stack.amount + item.amount);
            item.amount -= maxStack - stack.amount;
            stack.amount = temp;
            if(item.amount <= 0){
                item.remove();
                return 0;
            } else {
                return this.add(item);
            }
        }
        item.location = this.location;
        for(var j = 0; j < this.height; j++){
            for(var i = 0; i < this.width; i++){
                if(this.inv[j][i] == null){
                    this.inv[j][i] = item.itemEntityKey;
                    item.move(this, i, j);
                    return 0;
                }
            }
        }
        return item.amount;
    }

    delete(item){
        delete this.inv[item.y][item.x];
    }
}
