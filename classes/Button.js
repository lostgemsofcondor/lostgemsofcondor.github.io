class Button {
    constructor(main = false){
		this.down = false;
		this.tick = 0;
		this.downTick = 0;
		this.main = main;
		this.keyCode = -1;

		game.addButton(this);
	}
	
	setKeyCode(keyCode){
		this.keyCode = keyCode;
		return this;
	}

    get start(){
        return this.down ? this.tick == this.getCurrentTick() : false;
	}
	
    get end(){
        return !this.down ? this.downTick == this.getCurrentTick() : false;
    }

    press(){
		this.tick = this.getCurrentTick() + 1;
		this.down = true;
    }

    release(){
		this.downTick = this.getCurrentTick() + 1;
		this.down = false;
	}
	
    getCurrentTick(){
        return this.main ? game.mainTick : game.gameTick;
	}
	
	update(){
		if(this.keyCode != -1){
			if(Object.keys(game.keyMap).includes(this.keyCode) && !this.down){
				this.press();
			} else if(!Object.keys(game.keyMap).includes(this.keyCode)){
				this.release();
			}
		}
	}
}