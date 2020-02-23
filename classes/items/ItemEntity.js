class ItemEntity {

    get data(){
        return game.save.inventory[this.itemKey];
    }

    set data(data){
        game.save.inventory[this.itemKey] = data;
        game.save.inventory[this.itemKey].itemKey = this.itemKey;
    }

	get x(){
		return this.data.x;
    }
	// set x(x) {
    //     this.data.x = x;
    // }
    
    get y(){
        return this.data.y;
    }
    // set y(y) {
    //     this.data.y = y;
    // }
    
    get amount(){
        return this.data.amount;
    }
    set amount(amount) {
        this.data.amount = amount;
    }

    get location(){
        return this.data.location;
    }
    set location(location) {
        this.data.location = location;
    }
    
	get itemSpriteKey(){
		return this.data.itemSpriteKey;
    }
	set itemSpriteKey(itemSpriteKey) {
		this.data.itemSpriteKey = itemSpriteKey;
    }

    // get itemKey(){
    //     return this.data.itemKey;
    // }
    
	constructor(itemKey){
        if(itemKey == null){
            this.itemKey = null;
        } else {
            this.itemKey = itemKey;
        }
    }

    newEntity(itemSpriteKey, location, amount = 1){
        
        this.itemKey = game.save.itemIdNext;
        game.save.itemIdNext++;

        this.data = {};
        
        this.itemSpriteKey = itemSpriteKey;
        this.amount = amount;
        
        if(game.inventory.add(this)){
            this.location = location;
            return true;
        }
        return false;
    }

    move(x, y){
        if(game.inventory.valid(x, y)){
            var oldX = this.x;
            var oldY = this.y;
            this.data.x = x;
            this.data.y = y;
            game.inventory.update(this, oldX, oldY);
        }
    }

    drop(x, y){
        new DroppedItem(x, y).setItemSpriteKey(this.itemSpriteKey).setDroppedByPlayer(this.droppedByPlayer);
        this.delete();
    }

    delete(){
        game.inventory.delete(this)
        delete game.save.inventory[this.itemKey];
        //game.save.inventory.splice(this.itemKey, 1);
    }

}
