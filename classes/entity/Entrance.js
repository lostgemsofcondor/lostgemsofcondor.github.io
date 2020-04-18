class Entrance extends Entity {
    constructor(x, y){
		super(x, y);
		game.add(this);
    }

    setLocation(location){
        this.location = localtion;
        return this;
    }
    
    rightClick(){
        var option = new MenuOption(this.key)
            .setType("enter");

        return super.rightClick().concat([option]);
    }
}
