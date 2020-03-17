class Chest extends Enemy {
	constructor(x, y){
		super(x, y)
			.setImage("./sprites/chest/chest.png", 0)
			.setDimensions(48, 48)
			.setSolid(true);
	}

	die(){
		var drops = ["amethyst", "emerald", "ruby", "topaz", "diamond", "sapphire"]
		var drop = drops[Math.floor(Math.random() * drops.length)]
		new DroppedItem(this.x, this.y).setItemSpriteKey(drop)

		super.die();
	}
	
	getDescription(){
		return "Oh boy treasure!";
	}
}
