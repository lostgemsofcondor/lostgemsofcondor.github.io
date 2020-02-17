class Crab extends Enemy {
	constructor(x, y){
        super(x, y)
            .setImage("enemy/crab")
            .setDimensions(48, 48)
            .setMoving(true)
            .setSpeed(1)
            .setIcon();
        this.AI = new CombineAI(
            new ShootAI(),
            new BuilderAI(3000, 6000,
                new CircleAI(0, 200, Math.random() > .5),
                new AI()));
        this.shoot = game.bulletService.newSwipeMedium(false);
    }

    die(){
		new DroppedItem(this.x, this.y).setItemSpriteKey("arrow");

        super.die();
    }
}
