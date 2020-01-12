class Item {

	get x(){
		return game.save.inventory[this.Id].x;
    }
	set x(x) {
		game.save.inventory[this.Id].x = x;
    }
    
    get y(){
        return game.save.inventory[this.Id].y;
    }
    set y(y) {
        game.save.inventory[this.Id].y = y;
    }
    
	get itemSpriteKey(){
		return game.save.inventory[this.Id].itemSpriteKey;
    }
	set itemSpriteKey(itemSpriteKey) {
		game.save.inventory[this.Id].itemSpriteKey = itemSpriteKey;
    }
    
	constructor(x, y, itemSpriteKey){
        this.Id = game.save.itemIdNext;
        game.save.itemIdNext++;
        game.save.inventory[this.Id] = {};

		this.x = x;
        this.y = y;
        this.itemSpriteKey = itemSpriteKey;
    }


    
}
