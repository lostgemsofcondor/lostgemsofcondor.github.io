class Button {
    constructor(main){
		this.down = false;
        this.tick = 0;
        this.main = main;
    }

    get start(){
        return this.down ? this.tick == this.getCurrentTick() : false;
    }

    press(){
		this.tick = this.getCurrentTick();
		this.down = true;
    }

    release(){
		this.down = false;
    }

    getCurrentTick(){
        return this.main ? game.mainTick : game.gameTick;
    }
}