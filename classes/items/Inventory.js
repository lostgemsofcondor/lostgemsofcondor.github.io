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
        var maxStack = 32;
        for(var y = 0; y < this.height; y++){
            for(var x = 0; x < this.width; x++){
                var item = new ItemEntity(this.inv[y][x]);
                if(item.data && item.itemKey == itemKey){
                    if(!nonFullStack || item.amount < maxStack){
                        return item;
                    }
                }
            }
        }
        return null;
        
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
                        var img = game.itemService[item.itemKey].img;
                        var x = this.inventorySlotX(item.x);
                        var y = this.inventorySlotY(item.y);
                        context.drawImage(img, x, y);
                        if(item.amount > 1){
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
            var maxStack = 32;
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
