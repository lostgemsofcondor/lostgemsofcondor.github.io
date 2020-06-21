class Crab extends Enemy {
	constructor(x, y){
        super(x, y)
            .setImage("enemy/crab")
            .setDimensions(48, 48)
            .setMoving(true)
            .setSpeed(1)
            .setIcon();
        this.AI = new BuilderAI(60, 600, new StopAndShootAI(10, 30),
            new BuilderAI(3000, 6000,
                new CircleAI(0, 200, Math.random() > .5),
                new AI()));
        this.shoot = new BulletBuilder().newBubble(1);

        this.dropTable = new DropTable().addDrop("arrow", 1).addDropAlways("topaz", 32).addDropAlways("topaz", 32).addDropAlways("topaz", 32).addDropAlways("topaz", 32);
    }

	getDescription(){
		return "A lowly crab. Watch it scurry.";
	}
}
