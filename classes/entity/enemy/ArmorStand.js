class ArmorStand extends Enemy {
	constructor(x, y){
        super(x, y)
            .setImage("enemy/knight")
            .setDimensions(96, 96)
            .setMoving(false)
            .setIcon();

        this.dropTable = new DropTable().addDrop("axe", 1);
    }

	getDescription(){
		return "A rusty armor stand with a sharp axe";
	}
}
