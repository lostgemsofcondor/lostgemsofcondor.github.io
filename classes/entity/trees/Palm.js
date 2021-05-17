class Oak extends Tree {
	constructor(x, y){
        super(x, y)
            .setImage("./sprites/trees/oak.png", 0)
            .setDimensions(96, 96)
            .setMaxHealth(40);
        this.dropTable = new DropTable()
            .addDropAlways("oakLog", 1);
    }
    
	getDescription(){
		return "This look a little sturdy";
	}
}
