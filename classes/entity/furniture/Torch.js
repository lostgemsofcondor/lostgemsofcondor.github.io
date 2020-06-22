class Torch extends Entity {
    constructor(x, y){
        super(x, y)
            .setImage("./sprites/lighting/torch.png", 0)
            .setDimensions(48, 48)
            .setLight("medium");
        
		game.add(this);
    }
    
	getDescription(){
		return "A torch to light the way";
    } 
}
