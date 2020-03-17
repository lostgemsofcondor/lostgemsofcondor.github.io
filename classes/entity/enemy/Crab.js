class Crab extends Enemy {
	constructor(x, y){
        super(x, y)
            .setImage("enemy/crab")
            .setDimensions(48, 48)
            .setMoving(true)
            .setSpeed(1)
            .setIcon();
        this.AI = new CombineAI(
            new BuilderAI(30, 1200, new ShootAI(3), null),
            new BuilderAI(3000, 6000,
                new CircleAI(0, 200, Math.random() > .5),
                new AI()));
        this.shoot = new BulletBuilder().newBubbler(1);
    }

    die(){
        new DroppedItem(this.x, this.y).setItemSpriteKey("arrow").setAmount(1);

        super.die();
    }

	getDescription(){
		return "A lowly crab. Watch it scurry.";
	}
}
