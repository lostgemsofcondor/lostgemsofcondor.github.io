class Weapon extends Item {
    constructor(key, imgSource){
        super(key, imgSource);
        this.maxStack = 1;
        this.damage = 1;
    }

    setDamage(damage){
        this.damage = damage;
        return this;
    }
}
