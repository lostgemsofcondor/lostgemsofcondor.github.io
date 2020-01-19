class ShootAI {
	constructor(target){
		this.offset = Math.floor(Math.random() * 60*20);
		
	}
	
	calculate(entity){
		if((game.gameTick + this.offset) % (60*20) == 0){
			var angle =  Math.atan2(game.player.positionY - entity.positionY, game.player.positionX - entity.positionX);
			var arrow = new Bullet(entity.positionX, entity.positionY).setImage("./sprites/bullets/arrows/arrowGreen.png", angle + Math.PI/4).setSpeed(10).setDimensions(48, 48).setRotates(false).setFriendly(false).setBaseDamage(1);
			arrow.AI = new BulletAI(arrow, angle, 100);
			var arrow2 = new Bullet(entity.positionX, entity.positionY).setImage("./sprites/bullets/arrows/arrowGreen.png", angle + Math.PI/4 + Math.PI/16).setSpeed(10).setDimensions(48, 48).setRotates(false).setFriendly(false).setBaseDamage(1);
			arrow2.AI = new BulletAI(arrow2, angle + Math.PI/16, 100);
			var arrow3 = new Bullet(entity.positionX, entity.positionY).setImage("./sprites/bullets/arrows/arrowGreen.png", angle + Math.PI/4 - Math.PI/16).setSpeed(10).setDimensions(48, 48).setRotates(false).setFriendly(false).setBaseDamage(1);
			arrow3.AI = new BulletAI(arrow3, angle - Math.PI/16, 100);
		}
	}
}