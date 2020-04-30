class BulletBuilder{
	constructor(){
		this.damage = 1;
		this.theta = 0;
		this.amount = 1;
		this.name = "Bullet"
		this.image = "./sprites/bullets/arrows/arrowGreenBullet.png";
		this.dropChance = 0;
		this.drop = "arrow";
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
	
	setName(name){
		this.name = name;
		return this;
	}
	
	setImage(image){
		this.image = image;
		return this;
	}
	
	setDrop(drop){
		this.drop = drop;
		return this;
	}
	
	setDropChance(dropChance){
		this.dropChance = dropChance;
		return this;
	}

	//only use if class has bulletBuilder field
	build(){
		return function(angle){
			for(var count = 0; count < this.bulletBuilder.amount; count++){
				var t = 0;
				if(this.bulletBuilder.amount > 1){
					var t = -1 * this.bulletBuilder.theta/2 + count*this.bulletBuilder.theta/(this.bulletBuilder.amount - 1);
				}
				var arrow = new Bullet(this.positionX, this.positionY)
					.setImage(this.bulletBuilder.image, angle + t + Math.PI/4)
					.setSpeed(10)
					.setDimensions(48, 48)
					.setRotates(false)
					.setFriendly(false)
					.setBaseDamage(this.bulletBuilder.damage)
					.setAngle(angle + t)
					.setFriendly(this.friendly)
					.setName(this.name);
				if(Math.random() < this.bulletBuilder.dropChance && count == Math.floor(this.bulletBuilder.amount/2)){
					arrow.setItemKey(this.bulletBuilder.drop);
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
				.setStaminaCost(2)
				.setName("Swipe"); // This Should come from some kind of weapon class
			swipe.AI = new CombineAI(new TetherAI(this.key, 96, 96, angle), new BulletAI(swipe, 10)); 
		}
	}

	newBubble(damage){
		return function(angle){
			//"this" refers to the Entity who calls this shoot function not the BulletBuilder
			var bubble = new Bullet(this.positionX, this.positionY)
				.setImage("./sprites/bullets/arrows/bubble.png", Math.random()*Math.PI*2)
				.setSpeed(10)
				.setDimensions(48, 48)
				.setRotates(false)
				.setFriendly(false)
				.setBaseDamage(damage)
				.setAngle(angle)
				.setFriendly(this.friendly)
				.setName("Bubble");
			bubble.AI = new BulletAI(bubble, 100);
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
				.setFriendly(this.friendly)
				.setName("Bubble");
			arrow.AI = new BulletAI(arrow, 100);
		}
	}

	newArrow(){
		return function(angle){
			//"this" refers to the Entity who calls this shoot function not the BulletBuilder
			var arrow = new Bullet(this.positionX, this.positionY)
				.setImage("./sprites/bullets/arrows/arrowGreenBullet.png", angle + Math.PI/4)
				.setSpeed(10)
				.setDimensions(48, 48)
				.setRotates(false)
				.setBaseDamage(1)
				.setAngle(angle)
				.setFriendly(this.friendly)
				.setItemKey("arrow")
				.setName("Arrow");
			arrow.AI = new BulletAI(arrow, 100);
		}
	}

	newTripleArrow(damage, theta = 3*Math.PI/16, amount = 3){
		this.damage = damage;
		this.theta = theta;
		this.amount = amount;
		return this.build();
	}
}
