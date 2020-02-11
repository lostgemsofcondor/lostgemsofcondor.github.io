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
		if(this.hasIcon){
			game.miniMap.deleteIcon(this.key);
		}
		game.player.risingText("10xp");
		game.delete(this);
	}
}
