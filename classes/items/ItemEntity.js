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
    
	temp(itemKey){
        if(itemKey == null){
            this.itemKey = game.save.itemIdNext;
            game.save.itemIdNext++;
        } else {
            this.itemKey = itemKey;
        }
    }

    constructor(itemSpriteKey, amount = 1){
        this.data = {};
        //this.data._Id = this._Id;

		// this.x = game.inventory.nextX();
        // this.y = game.inventory.nextY();
        this.itemSpriteKey = itemSpriteKey;
        this.location = "inventory";
        this.amount = amount;

        game.inventory.add(this);

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
}
