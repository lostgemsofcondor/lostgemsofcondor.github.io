class Mouse {
	constructor(){
		this.leftClickDown = false;
		// this.leftClickDownStart = false;
		this.leftClickTick = 0;
		this.rightClickDown = false;
		// this.rightClickDownStart = false;
		this.rightClickTick = 0;
		this._point = new Point(0, 0);
		this.x = 0;
		this.y = 0;
		
		this.onHud = false;
	}

	
	get point(){
		this._point.setCords(this.x, this.y);
		return this._point;
	}

	get leftClickDownStart(){
		return this.leftClickDown ? this.leftClickTick == game.gameTick : false;
	}
	
	get rightClickDownStart(){
		return this.rightClickDown ? this.rightClickTick == game.gameTick : false;
	}
	
	clickDownLeft(x, y){
		this.move(x, y);
		this.onHud = game.hud.clickOnHud(x, y);
		this.leftClickTick = game.gameTick + game.blockIO + 1;
		this.leftClickDown = true;
	}
	
	clickUpLeft(){
		this.leftClickDown = false;
	}
	
	clickDownRight(x, y){
		this.move(x, y);
		this.onHud = game.hud.clickOnHud(x, y);
		this.rightClickTick = game.gameTick + game.blockIO + 1;
		this.rightClickDown = true;
		
	}
	
	clickUpRight(){
		this.rightClickDown = false;
	}
	
	move(x, y){
		this.x = x;
		this.y = y;
	}
}