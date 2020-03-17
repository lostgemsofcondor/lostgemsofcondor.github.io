class MenuOption {
    constructor(key){
        this.type = "examine";
        this.key = key;
        this.text = null;
    }

    getText(){
        if(this.text != null){
            return this.text;
        }
        if(this.type == "examine"){
            var e = game.get(this.key);
            if(e){
                this.text = "Examine " + e.getName();
            }
        }

        return this.text;
    }

    getLog(){
        var text = ""
        if(this.type == "examine"){
            var e = game.get(this.key);
            if(e){
                text = e.getDescription();
            }
        }
        return text;
    }
}