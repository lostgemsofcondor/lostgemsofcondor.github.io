class SpawnService {
	constructor(){
    }

    sand(x, y){
        var rand = Math.random();
        if(rand < .001){
            var crab = new Crab(x, y);
            var tree = new Palm(x, y);
        }
        if(rand > .001 && rand < .00101){
            var chest = new Chest(x, y)
        }
    }

    mountain(x, y){
        var rand = Math.random();
        if(rand < .001){
            var skeleton = new Skeleton(x, y);
        }
    }
}
