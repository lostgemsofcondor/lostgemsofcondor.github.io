class ItemEntity {

    get data(){
        return game.save.inventory[this.itemEntityKey];
    }

    set data(data){
        game.save.inventory[this.itemEntityKey] = data;
        game.save.inventory[this.itemEntityKey].itemEntityKey = this.itemEntityKey;
    }

	get x(){
		return this.data.x;
    }

    set x(x) {
        this.data.x = x;
    }
    
    get y(){
        return this.data.y;
    }

    set y(y) {
        this.data.y = y;
    }
    
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
    
	get itemKey(){
		return this.data.itemKey;
    }
	set itemKey(itemKey) {
		this.data.itemKey = itemKey;
    }

    // get itemKey(){
    //     return this.data.itemKey;
    // }
    
	constructor(itemEntityKey){
        if(itemEntityKey == null){
            this.itemEntityKey = null;
        } else {
            this.itemEntityKey = itemEntityKey;
        }
    }

    getDefinition(){
        return game.itemService[this.itemKey];
    }

    newEntity(itemKey, location, amount = 1){
        
        this.itemEntityKey = game.save.itemIdNext;
        game.save.itemIdNext++;

        this.data = {};
        
        this.itemKey = itemKey;
        this.amount = amount;
        
        for(var i in game.inventories){
            var inventory = game.inventories[i];
            if(inventory.location == location){
                var leftOver = inventory.add(this);
                if(leftOver > 0){
                    this.remove();
                }
                return leftOver;
            }
        }
        return null;
    }

    move(inventory, x, y, silent = false){
        if(inventory.valid(x, y) && this.validSlot(inventory.location, x, y, silent)){
            var oldX = this.x;
            var oldY = this.y;
            this.x = x;
            this.y = y;
            
            for(var i in game.inventories){
                var oldInventory = game.inventories[i];
                if(oldInventory.location == this.location){
                    oldInventory.removeAt(oldX, oldY);
                    inventory.forceAdd(this);
                    break;
                }
            }
            this.location = inventory.location;
            return true;
        }
        return false;
    }
    
    swap(item, silent = false){
        if(this.itemEntityKey == item.itemEntityKey){
            // Item moved to its own item slot. Item click.
            this.click();
            return true;
        }
        if(this.itemKey == item.itemKey){
            var definition = this.getDefinition();
            if(item.amount + this.amount > definition.maxStack){
                this.amount = item.amount + this.amount - definition.maxStack;
                item.amount = definition.maxStack;
            } else {
                item.amount = item.amount + this.amount;
                this.delete();
            }
        } else {
            if(this.validSlot(item.location, item.x, item.y, silent) && item.validSlot(this.location, this.x, this.y, silent)){
                var inventory1 = game.getInventory(this.location);
                var inventory2 = game.getInventory(item.location);

                var tempLocation = item.location;
                var tempX = item.x;
                var tempY = item.y;
                
                item.location = this.location;
                item.x = this.x;
                item.y = this.y;
                
                this.location = tempLocation;
                this.x = tempX;
                this.y = tempY;

                inventory1.forceAdd(item);
                inventory2.forceAdd(this);
            } else {
                return false
            }
        }
        return true;
    }

    click(){
        if(this.location == "weapons" || this.location == "armor"){
            game.getInventory("inventory").add(this);
        }  else if(this.location == "inventory"){
            var weaponsInventory = game.getInventory("weapons");

            for(var i = 0; i <= weaponsInventory.width; i++){
                for(var j = 0; j <= weaponsInventory.height; j++){
                    if(weaponsInventory.get(i, j) == null){
                        if(this.move(weaponsInventory, i, j, true)){
                            return;
                        }
                    } else {
                        if(this.swap(weaponsInventory.get(i, j), true))
                        {
                            return;
                        }
                    }
                }
            }

            var armorInventory = game.getInventory("armor");

            for(var i = 0; i <= armorInventory.width; i++){
                for(var j = 0; j <= armorInventory.height; j++){
                    if(armorInventory.get(i, j) == null){
                        if(this.move(armorInventory, i, j, true)){
                            return;
                        }
                    } else {
                        if(this.swap(armorInventory.get(i, j), true)){
                            return;
                        }
                    }
                }
            }
        }
    }

    validSlot(location, x, y, silent = false){
        var definition = this.getDefinition();
        var typeRequired = Item;

        if(location == "weapons"){
            var weapons = game.getInventory("weapons");
            if(x == 0 && y == 0){
                var ammunition = weapons.get(0, 1);
                typeRequired = ammunition ? ammunition.getDefinition().weaponType : Weapon;
            }
            if(x == 0 && y == 1){
                var weapon = weapons.get(0, 0);
                typeRequired = weapon ? weapon.getDefinition().ammunitionType : Ammunition;
            }
        } else if(location == "armor"){
            if(x == 0 && y == 0){
                typeRequired = Helm;
            }
            if(x == 0 && y == 1){
                typeRequired = Breastplate;
            }
            if(x == 0 && y == 2){
                typeRequired = Greave;
            }
        }

        if(typeRequired != null){
            if(definition instanceof typeRequired){
                return true;
            } else {
                if(!silent){
                    game.hud.log("Only " + typeRequired.name + "s can go in this slot at the moment");
                }
                return false;
            }
        } else {
            if(!silent){
                game.hud.log("Nothing can go in this slot at the moment");
            }
            return false;
        }
    }

    drop(x, y){
        new DroppedItem(x, y).setItemKey(this.itemKey).setDroppedByPlayer(this.droppedByPlayer).setAmount(this.amount);
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
        for(var i in game.inventories){
            var inventory = game.inventories[i];
            if(inventory.location == this.location){
                inventory.delete(this)
            }
        }
        this.remove();
    }

    remove(){
        delete game.save.inventory[this.itemEntityKey];
    }
}
