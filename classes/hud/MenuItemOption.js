class MenuItemOption {
    constructor(itemKey){
        this.type = "examine";
        this.itemKey = itemKey;
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
        } else {
            this.text = "Option Error";
        }
        return this.text;
    }

    examine(){
        var item = game.itemService[this.itemKey];
        if(item){
            this.text = "Examine " + item.name;
            this.log =  item.description;
        }
    }

    execute(){
        
    }
}