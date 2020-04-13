class DropTableService {
    constructor(){
        this.gems = new DropTable().addDrops(["amethyst", "emerald", "ruby", "topaz", "diamond", "sapphire"]);
    }
}

class DropTable {
    constructor(){
        this.drops = [];
        this.alwaysDrop = [];
        this.totalWeight = 0;
    }
    
    addDropAlways(drop, amount = 1){
        this.alwaysDrop.push({drop:drop, amount:amount});
        return this;
    }

    addDropsAlways(drops, amount){
        drops.forEach(d => {
            this.alwaysDrop.push({drop:d, amount:amount});
        });
        return this;
    }

    addDrop(drop, amount = 1, weight = 1){
        this.drops.push({drop:drop, amount:amount, weight:weight});
        this.totalWeight += weight;
        return this;
    }

    addDrops(drops, amount, weight = 1){
        drops.forEach(d => {
            this.drops.push({drop:d, amount:amount, weight:weight});
            this.totalWeight += weight;
        });
        return this;
    }

    drop(x, y){
        for(var i = 0; i < this.alwaysDrop.length; i++){
            new DroppedItem(x, y).setItemKey(this.alwaysDrop[i].drop).setAmount(this.alwaysDrop[i].amount);
        }
        var r = Math.random()*this.totalWeight;
        for(var i = 0; i < this.drops.length; i++){
            if(r < this.drops[i].weight){
                return new DroppedItem(x, y).setItemKey(this.drops[i].drop).setAmount(this.drops[i].amount);
                
            }
            r -= this.drops[i].weight;
        }
    }

    listDrops(){
        var drops = [];
        
        for(var i = 0; i < this.alwaysDrop.length; i++){
            drops.push(this.alwaysDrop[i].drop);
        }
        for(var i = 0; i < this.drops.length; i++){
            drops.push(this.drops[i].drop);
        }
        return drops;
    }
}