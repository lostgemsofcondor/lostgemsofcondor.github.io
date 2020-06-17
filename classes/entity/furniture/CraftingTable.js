class CraftingTable extends Entity {
    constructor(x, y){
        super(x, y)
            .setImage("./sprites/furniture/bench.png", 0)
            .setName("Crafting Table")
        
        this.exit = false;
		game.add(this);
        this.setIcon("./sprites/miniMap/entranceIcon.png", 3, 3);
    }
    
	getDescription(){
		return "Crafting Table";
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
        var option = new MenuOption(this.key)
            .setType("craft");

        return super.rightClick().concat([option]);
    }

	update(){
        if(game.map.getTile(this.x, this.y) == null){
            this.delete();
        }
		super.update();
    }
    
}
