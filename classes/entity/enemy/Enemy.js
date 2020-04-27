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
		super.setIcon("./sprites/miniMap/enemyIcon.png", 3, 3);
		return this;
	}

	struck(bullet){
		super.struck(bullet);
		if(!this.dead){
			game.hud.entityInfo.setKey(this.key);
		}
	}
	
	die(){
		if(this.dropTable){
			this.dropTable.drop(this.x, this.y);
		}
		this.delete();

	}
}
