class Tree extends Enemy {
	constructor(x, y){
        super(x, y)
        .setSolid(true);        
    }
    
	getDamage(bullet){
        if(bullet.type == "axe"){
            return bullet.getDamage() * 10;
        } else {
            return bullet.getDamage();
        }
	}
    
	getDescription(){
		return "Tree";
	}
}
