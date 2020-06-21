class Bed extends Entity {
    constructor(x, y){
        super(x, y)
            .setImage("./sprites/furniture/bed.png", 0)
            .setDimensions(144, 72);
        
		game.add(this);
        this.setIcon("./sprites/miniMap/entranceIcon.png", 3, 3);
    }
    
	getDescription(){
		return "Looks uncomfortable";
    }

    rightClick(){
        var option = new MenuOption(this.key)
            .setType("sleep");

        return super.rightClick().concat([option]);
    }    
}
