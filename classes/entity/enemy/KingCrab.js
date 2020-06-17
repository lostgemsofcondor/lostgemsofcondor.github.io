class KingCrab extends Enemy {
	constructor(x, y){
        super(x, y)
            .setImage("enemy/kingCrab")
            .setDimensions(48, 48)
            .setMoving(true)
            .setSpeed(1)
            .setIcon()
            .setMaxHealth(6);
        this.AI = new BuilderAI(60, 1200, new StopAndShootAI(3, 30),
            new BuilderAI(3000, 6000,
                new CircleAI(0, 200, Math.random() > .5),
                new AI()));
        this.shoot = new BulletBuilder().newBubbler(1);

        this.dropTable = new DropTable().addDrop("arrow", 2);
    }

	getDescription(){
		return "A king crab. Watch it scurry.";
	}
}
