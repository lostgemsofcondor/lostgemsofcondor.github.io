class SpawnService {
	constructor(){
    }

    sand(x, y){
        var rand = Math.random();
        if(rand < .001){
            var e = new Enemy(x, y).setImage("enemy/crab").setDimensions(48, 48).setMoving(true).setSpeed(1);
            e.AI = new CombineAI(
                new ShootAI(),
                new BuilderAI(3000, 6000,
                    new CircleAI(0, 200, Math.random() > .5),
                    new AI()));
        }
    }

    mountain(x, y){
        var rand = Math.random();
        if(rand < .001){
            var skeleton = new Enemy(x, y).setImage("enemy/skeleton").setDimensions(96, 96).setMoving(true).setSpeed(2.5).setMaxHealth(15);
            skeleton.AI = new CombineAI(
                new ShootAI(),
                new BuilderAI(3000, 6000,
                    new CircleAI(0, 200, Math.random() > .5),
                    new AI()));
        }
    }
}
