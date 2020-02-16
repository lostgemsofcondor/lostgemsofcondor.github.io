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
            if(game.save.inventory[i].location = this.location){
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
            return game.save.inventory[this.inv[y][x]];
        }
        return null;
    }

    getWithKey(key){
        return game.save.inventory[key];
    }

    valid(x, y){
        return x >= 0 && x < this.width && y >= 0 && y < this.height;
    }

    add(item){
        for(var j = 0; j < this.height; j++){
            for(var i = 0; i < this.width; i++){
                if(this.inv[j][i] == null){
                    this.inv[j][i] = item.itemKey;
                    item.move(i, j);
                    return true;
                }
            }
        }
    }
}
