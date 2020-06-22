class Chest extends Enemy {
	constructor(x, y){
		super(x, y)
			.setImage("./sprites/chest/chest.png", 0)
			.setDimensions(48, 48)
			.setSolid(true);

			
		this.dropTable = new DropTable()
            .addDrops(["amethyst", "ruby", "topaz", "sapphire", "doubleBow"]);
	}
	
	getDescription(){
		return "Oh boy treasure!";
	}
}
