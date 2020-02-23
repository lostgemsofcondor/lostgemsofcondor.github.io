class BulletService{
	constructor(){
	}

	newSwipeMedium(){
		return function(angle){
			//"this" refers to the Entity who calls this shoot function not the BulletService
			var swipe = new Bullet(this.positionX, this.positionY)
				.setImage("./sprites/bullets/melee/swipe.png", angle)
				.setSpeed(0)
				.setDimensions(96, 96)
				.setRotates(false)
				.setBaseDamage(1)
				.setPiercing(true)
				.setFriendly(this.friendly)
				.setStaminaCost(2); // This Should come from some kind of weapon class
			swipe.AI = new CombineAI(new TetherAI(this.key, 96, 96, angle), new BulletAI(swipe, 10)); 
		}
	}

	newArrow(){
		return function(angle){
			//"this" refers to the Entity who calls this shoot function not the BulletService
			var arrow = new Bullet(this.positionX, this.positionY)
				.setImage("./sprites/bullets/arrows/arrowGreen.png", angle + Math.PI/4)
				.setSpeed(10)
				.setDimensions(48, 48)
				.setRotates(false)
				.setBaseDamage(1)
				.setAngle(angle)
				.setFriendly(this.friendly)
				.setItemSpriteKey("arrow");
			arrow.AI = new BulletAI(arrow, 100);
		}
	}

	newTripleArrow(){
		return function(angle){
			//"this" refers to the Entity who calls this shoot function not the BulletService
			var arrow = new Bullet(this.positionX, this.positionY)
				.setImage("./sprites/bullets/arrows/arrowGreen.png", angle + Math.PI/4)
				.setSpeed(10)
				.setDimensions(48, 48)
				.setRotates(false)
				.setFriendly(false)
				.setBaseDamage(1)
				.setAngle(angle)
				.setFriendly(this.friendly)
				.setItemSpriteKey("arrow");
			arrow.AI = new BulletAI(arrow, 100);
			var arrow2 = new Bullet(this.positionX, this.positionY)
				.setImage("./sprites/bullets/arrows/arrowGreen.png", angle + Math.PI/4 + Math.PI/16)
				.setSpeed(10)
				.setDimensions(48, 48)
				.setRotates(false)
				.setFriendly(false)
				.setBaseDamage(1)
				.setAngle(angle + Math.PI/16)
				.setFriendly(this.friendly);
			arrow2.AI = new BulletAI(arrow2, 100);
			var arrow3 = new Bullet(this.positionX, this.positionY)
				.setImage("./sprites/bullets/arrows/arrowGreen.png", angle + Math.PI/4 - Math.PI/16)
				.setSpeed(10)
				.setDimensions(48, 48)
				.setRotates(false)
				.setFriendly(false)
				.setBaseDamage(1)
				.setAngle(angle - Math.PI/16)
				.setFriendly(this.friendly);
			arrow3.AI = new BulletAI(arrow3, 100);
		}

	}
}
