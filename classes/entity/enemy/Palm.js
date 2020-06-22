class Palm extends Tree {
	constructor(x, y){
        super(x, y)
            .setImage("./sprites/trees/palm.png", 0)
            .setDimensions(96, 96)
            .setSolid(true)
            .setMaxHealth(40);
        this.dropTable = new DropTable()
            .addDropAlways("palmLog", 1);
    }
    
	getDescription(){
		return "This does not look very sturdy";
	}
}
