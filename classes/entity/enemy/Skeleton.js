class Skeleton extends Enemy {
	constructor(x, y){
        super(x, y)
            .setImage("enemy/skeleton")
            .setDimensions(96, 96)
            .setMoving(true)
            .setSpeed(2.5)
            .setMaxHealth(15)
            .setIcon();
        this.AI = new CombineAI(
            new ShootAI(1200),
            new BuilderAI(3000, 6000,
                new CircleAI(0, 200, Math.random() > .5),
                new AI()));
        this.shoot = this.bulletBuilder.newTripleArrow(7);
    }

    
    die(){
		var drops = ["amethyst", "emerald", "ruby", "topaz", "diamond", "sapphire"]
		var drop = drops[Math.floor(Math.random() * drops.length)]
		new DroppedItem(this.x, this.y).setItemSpriteKey(drop)

        super.die();
    }
}
