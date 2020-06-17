class Wasp extends Enemy {
	constructor(x, y){
        super(x, y)
            .setImage("enemy/slime")
            .setDimensions(48, 48)
            .setMoving(true)
            .setSpeed(1)
            .setIcon();
            

        this.sprite.setFrames(2).setRandomOffset();
        this.AI = new BuilderAI(60, 1200, new StopAndShootAI(3, 30),
            new BuilderAI(3000, 6000,
                new CircleAI(0, 200, Math.random() > .5),
                new AI()));
        this.shoot = this.bulletBuilder.setImage("./sprites/bullets/magic/purple.png").setAmount(3).setTheta(Math.PI/4).build();

        this.dropTable = new DropTable().addDrop("arrow", 1);
    }

	getDescription(){
		return "A wasp.";
	}
}
