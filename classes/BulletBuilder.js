class BulletBuilder{
	constructor(){
		this.damage = 1;
		this.theta = 0;
		this.amount = 1;
	}

	setDamage(damage){
		this.damage = damage;
		return this;
	}

	setTheta(theta){
		this.theta = theta;
		return this;
	}

	setAmount(amount){
		this.amount = amount;
		return this;
	}

	build(){
		self = this;
		return function(angle){
			for(var count = 0; count < self.amount; count++){
				var t = 0;
				if(self.amount > 1){
					var t = -1 * self.theta/2 + count*self.theta/(self.amount - 1);
				}
				var arrow = new Bullet(this.positionX, this.positionY)
					.setImage("./sprites/bullets/arrows/arrowGreen.png", angle + t + Math.PI/4)
					.setSpeed(10)
					.setDimensions(48, 48)
					.setRotates(false)
					.setFriendly(false)
					.setBaseDamage(self.damage)
					.setAngle(angle + t)
					.setFriendly(this.friendly);
				if(count == Math.floor(self.amount/2)){
					arrow.setItemSpriteKey("arrow");
				}
				arrow.AI = new BulletAI(arrow, 100);
			}
		}
	}

	newSwipeMedium(){
		return function(angle){
			//"this" refers to the Entity who calls this shoot function not the BulletBuilder
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

	newBubble(damage){
		var amount = 3;
		var theta = 3*Math.PI/16;
		return function(angle){
			//"this" refers to the Entity who calls this shoot function not the BulletBuilder
			for(var count = 0; count < amount; count++){
				var t = -1 * theta/2 + count*theta/(amount - 1);
				var arrow = new Bullet(this.positionX, this.positionY)
					.setImage("./sprites/bullets/arrows/bubble.png", Math.random()*Math.PI*2)
					.setSpeed(10)
					.setDimensions(48, 48)
					.setRotates(false)
					.setFriendly(false)
					.setBaseDamage(damage)
					.setAngle(angle + t)
					.setFriendly(this.friendly);
				arrow.AI = new BulletAI(arrow, 100);
			}
		}
	}

	newBubbler(damage){
		var cone = Math.PI/8;
		var speedDelta = 3;


		return function(angle){
			var arrow = new Bullet(this.positionX, this.positionY)
				.setImage("./sprites/bullets/arrows/bubble.png", Math.random()*Math.PI*2)
				.setSpeed(7 + Math.random()*speedDelta)
				.setDimensions(48, 48)
				.setRotates(false)
				.setFriendly(false)
				.setBaseDamage(damage)
				.setAngle(angle - cone/2 + Math.random()*cone)
				.setFriendly(this.friendly);
			arrow.AI = new BulletAI(arrow, 100);
		}
	}

	newArrow(){
		return function(angle){
			//"this" refers to the Entity who calls this shoot function not the BulletBuilder
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

	newTripleArrow(damage, theta = 3*Math.PI/16, amount = 3){
		return function(angle){
			//"this" refers to the Entity who calls this shoot function not the BulletBuilder
			for(var count = 0; count < amount; count++){
				var t = -1 * theta/2 + count*theta/amount;
				var arrow = new Bullet(this.positionX, this.positionY)
					.setImage("./sprites/bullets/arrows/arrowGreen.png", angle + t + Math.PI/4)
					.setSpeed(10)
					.setDimensions(48, 48)
					.setRotates(false)
					.setFriendly(false)
					.setBaseDamage(damage)
					.setAngle(angle + t)
					.setFriendly(this.friendly);
				if(count == Math.floor(amount/2)){
					arrow.setItemSpriteKey("arrow");
				}
				arrow.AI = new BulletAI(arrow, 100);
			}
		}

	}
}
