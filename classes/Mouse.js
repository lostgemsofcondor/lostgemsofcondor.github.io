class Mouse {
	constructor(){
		this.leftClickDown = false;
		// this.leftClickDownStart = false;
		this.leftClickTick = 0;
		this.rightClickDown = false;
		// this.rightClickDownStart = false;
		this.rightClickTick = 0;
		this.point = new Point(0, 0);
	}

	get leftClickDownStart(){
		return this.leftClickDown ? this.leftClickTick == game.gameTick : false;
	}
	
	get rightClickDownStart(){
		return this.rightClickDown ? this.rightClickTick == game.gameTick : false;
	}
	
	clickDownLeft(x, y){
		this.point.setCords(x, y);
		this.leftClickTick = game.gameTick + game.blockIO + 1;
		this.leftClickDown = true;
	}
	
	clickUpLeft(){
		this.leftClickDown = false;
		
	}
	
	clickDownRight(x, y){
		this.point.setCords(x, y);
		this.rightClickTick = game.gameTick + game.blockIO + 1;
		this.rightClickDown = true;
		
	}
	
	clickUpRight(){
		this.rightClickDown = false;
		
	}
}