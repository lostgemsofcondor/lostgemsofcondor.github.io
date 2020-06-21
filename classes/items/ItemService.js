class ItemService {
    constructor(){
        this.arrow = new Arrow("arrow", "./sprites/bullets/arrows/arrowGreen.png").setDescription("Arrow");
        this.emeraldArrow = new Arrow("emeraldArrow", "./sprites/bullets/arrows/emeraldArrowGreen.png").setDescription("Emerald Tipped Arrow").setDamage(2);

        this.palmBow = new Bow("palmBow", "./sprites/weapons/palmBow.png").setName("Palm Bow").setDescription("Palm Bow").setPickedSound(game.sounds.bowPick);
        
        this.palmLog = new Item("palmLog", "./sprites/trees/palmLog.png").setName("Palm Log");

        this.amethyst = new Item("amethyst", "./sprites/gems/amethyst.png").setPickedSound(game.sounds.gemPick);
        this.emerald = new Item("emerald", "./sprites/gems/emerald.png").setPickedSound(game.sounds.gemPick);
        this.ruby = new Item("ruby", "./sprites/gems/ruby.png").setPickedSound(game.sounds.gemPick);
        this.topaz = new Item("topaz", "./sprites/gems/topaz.png").setPickedSound(game.sounds.gemPick);
        this.diamond = new Item("diamond", "./sprites/gems/diamond.png").setPickedSound(game.sounds.gemPick);
        this.sapphire = new Item("sapphire", "./sprites/gems/sapphire.png").setPickedSound(game.sounds.gemPick);
    }
}
