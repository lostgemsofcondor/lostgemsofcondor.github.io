class Entrance extends Entity {
    constructor(x, y){
        super(x, y);
        
        this.exit = false;
		game.add(this);
        this.setIcon("./sprites/miniMap/entranceIcon.png", 3, 3);
    }

    setLocation(location){
        this.location = location;
        return this;
    }

    setExit(exit){
        this.exit = true;
        return this;
    }
    
    rightClick(){
        if(this.exit){
            var type = "exit"
        } else {
            var type = "enter"
        }

        var option = new MenuOption(this.key)
            .setType(type);

        return super.rightClick().concat([option]);
    }

	update(){
        if(game.map.getTile(this.x, this.y) == null){
            this.delete();
        }
		super.update();
    }
    
}
