class Item {
    constructor(key, imgSource){
        this.key = key;

        this.img = new Image();
        this.img.src = imgSource;

        this.name = key;
        this.dropSound = null;
        this.pickedSound = game.sounds.defultPick;
        this.maxStack = 32;
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