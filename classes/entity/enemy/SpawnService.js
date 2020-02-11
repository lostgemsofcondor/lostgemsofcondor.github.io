class SpawnService {
	constructor(){
    }

    sand(x, y){
        var rand = Math.random();
        if(rand < .001){
            var crab = new Crab(x, y);
            var tree = new Enemy(x, y)
                .setImage("./sprites/trees/palm.png", 0)
                .setDimensions(96, 96)
                .setSolid(true);
        }
    }

    mountain(x, y){
        var rand = Math.random();
        if(rand < .001){
            var skeleton = new Skeleton(x, y);
        }
    }
}
