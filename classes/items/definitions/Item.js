class Item {
    constructor(itemKey, imgSource){
        this.itemKey = itemKey;

        this.img = new Image();
        this.img.src = imgSource;

        this.name = itemKey;
        this.dropSound = null;
        this.pickedSound = game.sounds.defultPick;
        this.maxStack = 32;
        this.type = null;
    }

    setName(name){
        this.name = name;
        if(this.description == null){
            this.description = name;
        }
        return this;
    }
    
    setDescription(description){
        this.description = description;
        return this;
    }

    setType(type){
        this.type = type;
        return this;
    }

    setDamage(damage){
        this.damage = damage;
        return this;
    }
    
    setMaxStack(maxStack){
        this.maxStack = maxStack;
        return this;
    }

    setDropSound(sound){
        this.dropSound = sound;
        return this;
    }
    
    setPickedSound(sound){
        this.pickedSound = sound;
        return this;
    }
}
