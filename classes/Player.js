class Player extends Entity{
	constructor(){
		// super("player", speed, 0, 0, 48, 48);
		super(0, 0);

		this.key = 0; // for game class
		this.dexterity = 15;
		this.lastShot = -this.dexterity;
		// this.positionX = 0;
		// this.positionY = 0;
	}

	handelShoot(x, y, leftClickDownStart){
		if(leftClickDownStart || game.gameTick >= this.lastShot + this.dexterity){
			this.lastShot = game.gameTick;
			var angle =  Math.atan2(y - this.positionY, x - this.positionX);
			var arrow = new Bullet(this.positionX, this.positionY).setImage("./sprites/bullets/arrows/arrowGreen.png", angle + Math.PI/4).setSpeed(10).setDimensions(48, 48).setRotates(false);
			arrow.AI = new BulletAI(arrow, angle, 100);

		}
	}
}
