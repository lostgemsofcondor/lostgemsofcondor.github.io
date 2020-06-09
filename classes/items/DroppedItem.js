class DroppedItem extends Entity {
	constructor(x, y){
        super(x, y)
            .setDimensions(32, 32)
            .setLight("small");
		game.add(this);

		this.moving = false;
        this.noCollsion = true;
        this.droppedByPlayer = false;
        this.amount = 1;
    }

    setItemKey(itemKey){
        var item = game.itemService[itemKey];

        this.itemKey = itemKey;
        this.sprite.setAngle(0);
        this.sprite.image = item.img;
        this.name = item.name;
        return this;
    }

    setDroppedByPlayer(droppedByPlayer){
        this.droppedByPlayer = droppedByPlayer;
        return this;
    }

    
    setAmount(amount){
        this.amount = amount;
        return this;
    }

    getPicked(){
        if(this.canBePicked()){
            var item = game.itemService[this.itemKey];
            if(item.pickedSound){
                item.pickedSound.play()
            }
            this.amount = new ItemEntity().newEntity(this.itemKey, "inventory", this.amount);
            if(this.amount <= 0){
                game.delete(this);
            }
        }
    }

    canBePicked(){
        return !this.droppedByPlayer || this.age >= 180;
    }

    getDescription(){
        if(game.itemService[this.itemKey].description){
            return game.itemService[this.itemKey].description;
        } else {
            return this.name;
        }
    }

    getName(){
        if(this.amount > 1){
            return this.name + " (" + this.amount + ")";
        } else {
            return this.name;
        }
    }
}
