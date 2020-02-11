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
            new ShootAI(),
            new BuilderAI(3000, 6000,
                new CircleAI(0, 200, Math.random() > .5),
                new AI()));
        this.shoot = game.bulletService.newTripleArrow(false);
    }
}
