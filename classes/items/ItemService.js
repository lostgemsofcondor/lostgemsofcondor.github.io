class ItemService {
    constructor(){
        this.arrow = new Arrow("arrow", "./sprites/bullets/arrows/arrowGreen.png").setDescription("Arrow");
        this.emeraldArrow = new Arrow("emeraldArrow", "./sprites/bullets/arrows/emeraldArrowGreen.png").setDescription("Emerald Tipped Arrow").setDamage(2);

        this.palmBow = new Bow("palmBow", "./sprites/weapons/palmBow.png").setName("Palm Bow").setDescription("Palm Bow").setPickedSound(game.sounds.bowPick);
        this.doubleBow = new Bow("doubleBow", "./sprites/weapons/doubleBow.png").setName("Double Bow").setDescription("Double Bow it shoots 2 shots").setPickedSound(game.sounds.bowPick).setShots(2);
        this.powerBow = new Bow("powerBow", "./sprites/weapons/powerBow.png").setName("Power Bow").setDescription("Power Bow it shoots 5 shots").setPickedSound(game.sounds.bowPick).setShots(5);

        this.axe = new Weapon("axe", "./sprites/weapons/axe.png").setName("Axe").setDescription("An axe made from palm wood").setType("axe").setCost(1);
        this.copperAxe = new Weapon("copperAxe", "./sprites/weapons/copperAxe.png").setName("copperAxe").setDescription("An heavy axe made from copper").setType("axe").setCost(2).setDamage(2);
        
        this.palmLog = new Item("palmLog", "./sprites/trees/palmLog.png").setName("Palm Log");
        this.oakLog = new Item("oakLog", "./sprites/trees/oakLog.png").setName("Oak Log");

        this.amethyst = new Item("amethyst", "./sprites/gems/amethyst.png").setPickedSound(game.sounds.gemPick);
        this.emerald = new Item("emerald", "./sprites/gems/emerald.png").setPickedSound(game.sounds.gemPick);
        this.ruby = new Item("ruby", "./sprites/gems/ruby.png").setPickedSound(game.sounds.gemPick);
        this.topaz = new Item("topaz", "./sprites/gems/topaz.png").setPickedSound(game.sounds.gemPick);
        this.diamond = new Item("diamond", "./sprites/gems/diamond.png").setPickedSound(game.sounds.gemPick);
        this.sapphire = new Item("sapphire", "./sprites/gems/sapphire.png").setPickedSound(game.sounds.gemPick);
    }
}
