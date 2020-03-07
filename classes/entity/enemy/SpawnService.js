class SpawnService {
	constructor(){
        this.randomSpawnRate = 1/500;
        this.randomChunkSpawnRate = 1/500;

        this.period = 300; // in ticks
        this.multiplier = Math.exp(-1/this.period);
        this.point = new Point(0, 0);
    }

    updateSpawnRate(){
        this.point.x = (1 - this.multiplier)*game.player.positionX + this.multiplier*this.point.x;
        this.point.y = (1 - this.multiplier)*game.player.positionY + this.multiplier*this.point.y;

        this.spawnRate = Math.min(this.point.distance(game.player)/(game.player.baseSpeed*this.period), 1);
    }

    sand(x, y, chunkLoad = false){

        var rand = Math.random();
        if(rand < 1){
            var crab = new Crab(x, y);
            if(chunkLoad){
                var tree = new Palm(x, y);
            }
        }
        if(rand < .1){
            var chest = new Chest(x, y)
        }
    }

    mountain(x, y){
        var rand = Math.random();
        if(rand < 1){
            var skeleton = new Skeleton(x, y);
        }
    }
}
