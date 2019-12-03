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
        Object.keys(this.list).forEach(i => {
            if(key == this.list[i].key){
                delete this.list[i];
            }
        });
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
