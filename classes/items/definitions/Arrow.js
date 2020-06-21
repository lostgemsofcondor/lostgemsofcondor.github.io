class Arrow extends Item {
    constructor(key, imgSource){
        super(key, imgSource);
        this.maxStack = 999;
        this.damage = 1;
        this.pickedSound = game.sounds.arrowPick;
    }

    setDamage(damage){
        this.damage = damage;
        return this;
    }
}
