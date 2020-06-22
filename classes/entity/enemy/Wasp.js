class Wasp extends Enemy {
	constructor(x, y){
        super(x, y)
            .setImage("enemy/wasp")
            .setDimensions(96, 96)
            .setMoving(true)
            .setSpeed(1)
            .setIcon();
            

        this.sprite.setFrames(2).setRandomOffset();
        this.AI = new BuilderAI(60, 1200, new StopAndShootAI(30, 30),
            new BuilderAI(3000, 6000,
                new CircleAI(0, 200, Math.random() > .5),
                new AI()));
        this.shoot = this.bulletBuilder.setImage("./sprites/bullets/magic/orange.png").setAmount(5).setTheta(Math.PI/8).setDamage(5).setLife(50).build();

        this.dropTable = new DropTable().addDrop("emeraldArrow", 1).addDrop("copperAxe");
    }

	getDescription(){
		return "A wasp.";
	}
}
