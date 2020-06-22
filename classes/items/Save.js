class Save {
	constructor(){
        this.inventory = {};
        this.itemIdNext = 0;

        this.enduranceEXP = 0;
        this.enduranceLevel = 1;

        this.health = 20;
        this.stamina = 20;
        
        this.overworldX = 0;
        this.overworldY = 0;

        this.sceneType = "tutorial"
    }

    save(){
        localStorage.setItem("save", JSON.stringify(this));
    }

    // this class does not have functions due to cookies
}
