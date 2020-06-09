class Crab extends Enemy {
	constructor(x, y){
        super(x, y)
            .setImage("enemy/crab")
            .setDimensions(48, 48)
            .setMoving(true)
            .setSpeed(1)
            .setIcon();
        this.AI = new CombineAI(
            new BuilderAI(30, 600, new ShootAI(10), null),
            new BuilderAI(3000, 6000,
                new CircleAI(0, 200, Math.random() > .5),
                new AI()));
        this.shoot = new BulletBuilder().newBubble(1);

        this.dropTable = new DropTable().addDrop("arrow", 1);
    }

	getDescription(){
		return "A lowly crab. Watch it scurry.";
	}
}
