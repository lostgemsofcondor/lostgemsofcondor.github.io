class DropService {
	constructor(){
    }
//????
    arrowGem(){
        return function(){
            var drops = ["amethyst", "emerald", "ruby", "topaz", "diamond", "sapphire"]
            var drop = drops[Math.floor(Math.random() * drops.length)]
            new DroppedItem(this.x, this.y).setItemKey(drop)
        }
    }
}
