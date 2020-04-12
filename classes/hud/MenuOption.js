class MenuOption {
    constructor(key){
        this.type = "examine";
        this.key = key;
        this.text = null;
        this.log = null;
    }

    getText(){
        if(this.text != null){
            return this.text;
        }
        if(this.type == "examine"){
            this.examine();
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
        }
    }
}