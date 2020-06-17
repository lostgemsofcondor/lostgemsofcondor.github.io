class MenuOption {
    constructor(key){
        this.type = "examine";
        this.key = key;
        this.text = null;
        this.log = null;
    }

    setType(type){
        this.type = type;
        return this;
    }

    getText(){
        if(this.text != null){
            return this.text;
        }
        if(this.type == "examine"){
            this.examine();
        } else if(this.type == "enter") {
            this.text = "Enter";
        } else if(this.type == "exit") {
            this.text = "Exit";
        } else if(this.type == "craft"){
            this.text = "Craft";
        } else {
            this.text = "Option Error";
        }
        return this.text;
    }

    examine(){
        var e = game.get(this.key);
        if(e){
            this.text = "Examine " + e.getName();
            this.log =  e.getDescription();
        }
    }

    execute(){
        if(this.type == "examine"){
            game.hud.entityInfo.setKey(this.key);
        } else if(this.type == "enter"){
            var enterance = game.get(this.key);
            game.enter(enterance);
        } else if(this.type == "exit"){
            var exit = game.get(this.key);
            game.exit(exit);
        } else if(this.type == "craft"){
            game.hud.openCraftingTable();
        }
    }
}