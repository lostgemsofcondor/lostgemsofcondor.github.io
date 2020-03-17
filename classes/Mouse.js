class Mouse {
	constructor(){
		this.left = new Button(true);
		this.right = new Button(true);
		
		this._point = new Point(0, 0);
		this.x = 0;
		this.y = 0;

		this.heldItem = -1;
		this.holdingItem = false;
		
		this.onHud = false;
	}
	

	
	get point(){
		this._point.setCords(this.x, this.y);
		return this._point;
	}
	
	clickLeft(x, y){
		this.move(x, y);
		this.onHud = game.hud.clickOnHud(x, y);
		this.left.press();
	}
	
	clickLeftRelease(){
		this.left.release();
		//game.hud.clickLeftRelease()
	}
	
	clickRight(x, y){
		this.move(x, y);
		this.onHud = game.hud.clickOnHud(x, y);
		this.right.press();
		game.menu = new Menu();
		if(game.menu.options.length == 0){
			delete game.menu;
		}
	}
	
	clickRightRelease(){
		this.right.release();
	}
	
	move(x, y){
		this.x = x;
		this.y = y;
	}
}