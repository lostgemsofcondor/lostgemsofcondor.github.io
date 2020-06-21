class Weapon extends Item {
    constructor(key, imgSource){
        super(key, imgSource);
        this.maxStack = 1;
        this.damage = 1;
        this.ammunitionType = Ammunition;
    }

    setDamage(damage){
        this.damage = damage;
        return this;
    }
}
