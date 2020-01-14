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
            }
        }
    }

    get(x, y){
        if(this.inv[y][x] != null){
            return game.save.inventory[this.inv[y][x]];
        }
        return null;
    }

    add(item){
        for(var j = 0; j < this.height; j++){
            for(var i = 0; i < this.width; i++){
                if(this.inv[j][i] == null){
                    item.x = i;
                    item.y = j;
                    this.inv[j][i] = item.Id;
                    return true;
                }
            }
        }
    }
}
