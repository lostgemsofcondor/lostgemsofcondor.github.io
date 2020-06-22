class Weapon extends Item {
    constructor(key, imgSource){
        super(key, imgSource);
        this.maxStack = 1;
        this.damage = 1;
        this.ammunitionType = null;
        this.type = null;
        this.cost = 0;
    }

    setDamage(damage){
        this.damage = damage;
        return this;
    }

    setCost(cost){
        this.cost = cost;
        return this;
    }
}
