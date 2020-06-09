class ItemService {
    constructor(){
        this.arrow = new Item("arrow", "./sprites/bullets/arrows/arrowGreen.png").setDescription("Arrow").setPickedSound(game.sounds.arrowPick);

        
        
        this.palmLog = new Item("palmLog", "./sprites/trees/palmLog.png").setName("Palm Log");
        this.palmBow = new Item("palmBow", "./sprites/weapons/palmBow.png").setMaxStack(1).setName("Palm Bow").setDescription("Palm Bow").setPickedSound(game.sounds.bowPick);

        this.amethyst = new Item("amethyst", "./sprites/gems/amethyst.png").setPickedSound(game.sounds.gemPick);
        this.emerald = new Item("emerald", "./sprites/gems/emerald.png").setPickedSound(game.sounds.gemPick);
        this.ruby = new Item("ruby", "./sprites/gems/ruby.png").setPickedSound(game.sounds.gemPick);
        this.topaz = new Item("topaz", "./sprites/gems/topaz.png").setPickedSound(game.sounds.gemPick);
        this.diamond = new Item("diamond", "./sprites/gems/diamond.png").setPickedSound(game.sounds.gemPick);
        this.sapphire = new Item("sapphire", "./sprites/gems/sapphire.png").setPickedSound(game.sounds.gemPick);
    }
}
