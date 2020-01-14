class Save {
	constructor(){
        this.inventory = [];
        this.itemIdNext = 0;
        
        // do this in Save.js
        try{
            game.save = JSON.parse(document.cookie);
        } catch {
            console.log("error with save conversion");
        }	
        console.log(document.cookie);
    }

    // this class does not have functions do to cookies
}
