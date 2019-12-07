class EntityList {
    constructor(){
        this.list = [];
    }

    add(key){
        var objectLink = new ObjectLink(key);
        this.list.push(objectLink);
    }

    delete(key){
        // might be optimized with binary search on vertical
        for(var i = 0; i < this.list.length; i++){
            if(key == this.list[i].key){
                return this.list.splice(i, 1);
            }
        }
        console.log("could not delete key: " + key)
    }

    sort(){
        this.list.sort((a, b) => {
            return a.getVertical() - b.getVertical();
        })
    }
}

class ObjectLink {
    constructor(key){
        this.key = key;
        this.vertical = null;
        this.tickUpdated = -1;
    }

    //only use for sorting
    getVertical(){
        if(this.tickUpdated >= game.gameTick){
            return this.vertical;
        }
        this.tickUpdated = game.gameTick;
        this.vertical = game.get(this.key).sprite.adjustYCord();
        return this.vertical;
    }
}
