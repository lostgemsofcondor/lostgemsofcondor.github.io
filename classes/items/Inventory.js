class Inventory {
	constructor(width, height, location = "inventory"){
        this.width = width;
        this.height = height;
        this.location = location;
        this.inv = [];
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
                //game.items[i] = 
            }
        }
    }

    update(item, oldX, oldY){
        //var item = game.save.inventory[key]
        if(oldX != null && oldY != null){
            this.inv[oldY][oldX] = null;
        }
        this.inv[item.y][item.x] = item.itemKey;
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

    getWithItemSpriteKey(itemSpriteKey, nonFullStack = false){
        var maxStack = 32;
        for(var y = 0; y < this.height; y++){
            for(var x = 0; x < this.width; x++){
                var item = new ItemEntity(this.inv[y][x]);
                if(item.data && item.itemSpriteKey == itemSpriteKey){
                    if(!nonFullStack || item.amount < maxStack){
                        return item;
                    }
                }
            }
        }
        return null;
        
    }

    valid(x, y){
        return x >= 0 && x < this.width && y >= 0 && y < this.height;
    }

    add(item, location){
        
        var stack = game.inventory.getWithItemSpriteKey(item.itemSpriteKey, true);
        if(stack != null){
            var maxStack = 32;
            var temp = Math.min(maxStack, stack.amount + item.amount);
            item.amount -= maxStack - stack.amount;
            stack.amount = temp;
            if(item.amount <= 0){
                item.remove();
                return 0;
            } else {
                return this.add(item, location);
            }
        }
        item.location = location;
        for(var j = 0; j < this.height; j++){
            for(var i = 0; i < this.width; i++){
                if(this.inv[j][i] == null){
                    this.inv[j][i] = item.itemKey;
                    item.move(i, j);
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
