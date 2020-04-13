class ItemService {
    constructor(){
        this.arrow = new Item("arrow", "./sprites/bullets/arrows/arrowGreen.png").setDescription("Arrow");

        
        this.palmLog = new Item("palmLog", "./sprites/trees/palmLog.png").setName("Palm Log");

        this.amethyst = new Item("amethyst", "./sprites/gems/amethyst.png");
        this.emerald = new Item("emerald", "./sprites/gems/emerald.png");
        this.ruby = new Item("ruby", "./sprites/gems/ruby.png");
        this.topaz = new Item("topaz", "./sprites/gems/topaz.png");
        this.diamond = new Item("diamond", "./sprites/gems/diamond.png");
        this.sapphire = new Item("sapphire", "./sprites/gems/sapphire.png");
    }
}

class Item {
    constructor(key, imgSource){
        this.key = key;

        this.img = new Image();
        this.img.src = imgSource;

        this.name = key;
    }

    setName(name){
        this.name = name;
        return this;
    }
    
    setDescription(description){
        this.description = description;
        return this;
    }
}