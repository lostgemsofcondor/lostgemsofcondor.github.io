class Enemy extends Mortal {
	constructor(x, y){
		super(x, y);

		game.add(this);
		this.maxHealth = 4;
		this.health = this.maxHealth;
		this.drawHealth = false;
		this.hasIcon = false;
		// this.key = 0; // for game class
		// this.positionX = 0;
		// this.positionY = 0;
	}

	setIcon(){
		this.hasIcon = true;
		new Icon(this.key, "./sprites/miniMap/enemyIcon.png", 3, 3);
		return this;
	}

	
	die(){
		game.player.risingText("10xp");
		this.delete();
		new DroppedItem(this.x, this.y).setItemSpriteKey("arrow");

		// var item = new ItemEntity().newEntity("amethyst", "inventory");
		// var item = new ItemEntity().newEntity("emerald", "inventory");
		// var item = new ItemEntity().newEntity("ruby", "inventory");
		// var item = new ItemEntity().newEntity("topaz", "inventory");
		// var item = new ItemEntity().newEntity("diamond", "inventory");
		// var item = new ItemEntity().newEntity("sapphire", "inventory");
	}
}
