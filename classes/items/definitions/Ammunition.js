class Ammunition extends Item {
    constructor(key, imgSource){
        super(key, imgSource);
        this.maxStack = 999;
        this.damage = 1;
        this.weaponType = Weapon;
    }

    setDamage(damage){
        this.damage = damage;
        return this;
    }
}
