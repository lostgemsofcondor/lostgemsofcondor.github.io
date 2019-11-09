class EntityList {
    constructor(){
        this.list = [];
    }

    add(key){
        var objectLink = new ObjectLink(key, null, -1);
        this.list.push(objectLink);
    }

    delete(key){
        // for(var i = 0; i < this.list.length; i++){
        //     if(key == this.list[i].key){
        //         delete this.list[i];
        //         return true;
        //     }
        // }
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
    constructor(key, vertical, tickUpdated){
        this.key = key;
        this.vertical = vertical;
        this.tickUpdated = tickUpdated;
    }

    getVertical(){
        if(this.tickUpdated >= game.gameTick){
            return this.vertical;
        }
        this.tickUpdated = game.gameTick;
        this.vertical = game.get(this.key).sprite.adjustYCord();
        return this.vertical;
    }

}
