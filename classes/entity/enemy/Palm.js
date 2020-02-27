class Palm extends Enemy {
	constructor(x, y){
        super(x, y)
            .setImage("./sprites/trees/palm.png", 0)
            .setDimensions(96, 96)
            .setSolid(true);
    }

    die(){
		new DroppedItem(this.x, this.y).setItemSpriteKey("palmLog");

        super.die();
    }
}
