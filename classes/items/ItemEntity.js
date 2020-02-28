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
        
        return game.inventory.add(this, location);
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
        new DroppedItem(x, y).setItemSpriteKey(this.itemSpriteKey).setDroppedByPlayer(this.droppedByPlayer).setAmount(this.amount);
        this.delete();
    }

    discard(i){
        if(this.amount < i){
            return false;
        }
        this.amount -= i;
        if(this.amount == 0){
            this.delete();
        }
        return true;
    }

    delete(){
        game.inventory.delete(this)
        this.remove();
    }

    remove(){
        delete game.save.inventory[this.itemKey];
    }

}
