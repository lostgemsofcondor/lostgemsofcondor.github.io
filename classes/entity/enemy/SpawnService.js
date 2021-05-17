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
        if(chunkLoad){
            new Palm(x, y);
        }

        var rand = Math.random();

        if(rand < .05){
            new Chest(x, y);
            return;
        } else if(rand < .2){
            new KingCrab(x, y);
        } else if(rand < .6){
            new Crab(x, y);
        }

        if(chunkLoad){
            new Palm(x, y);
        }
    }

    mountain(x, y, chunkLoad = false){
        var rand = Math.random();
        if(rand < .5){
            new Skeleton(x, y);
        }
    }

    forest(x, y, chunkLoad = false){
        var rand = Math.random();
        new Oak(x, y);

        var i = 150;
        while(chunkLoad && Math.random() < .6){
            new Oak(x + i + Math.random()*150, y + i + Math.random()*150);
            new Oak(x - i + Math.random()*150, y - i + Math.random()*150);
            new Oak(x + i + Math.random()*150, y - i + Math.random()*150);
            new Oak(x - i + Math.random()*150, y + i + Math.random()*150);
            i+=150;
        }
        if(rand < .5){
            new Slime(x, y);
        }
    }

    forest2(x, y, chunkLoad = false){
        var rand = Math.random();
        if(rand < .5){
            new Wasp(x, y);
        }
    }
}
