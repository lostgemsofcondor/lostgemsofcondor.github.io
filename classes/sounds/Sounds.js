class Sounds {
    constructor(){
        this.muted = false;
        this.coinGrab = new Sound("./sounds/Coins_Grab_02.wav");
        this.swipe1 = new Sound("./sounds/Swing.wav");
        this.arrowPick = new Sound("./sounds/Bow_Drop.wav");
        this.bowPick = new Sound("./sounds/Bow_Drop.wav");
        this.gemPick = new Sound("./sounds/Stone_Grab_03.wav");
        this.defultPick = new Sound("./sounds/Random_Item_Grab_01.wav");
        this.bowFire = new Sound("./sounds/Bow_Fire.wav");
        this.defultHit = new Sound("./sounds/Hit1.wav");
        this.playerHit = new Sound("./sounds/Hit2.wav");

        this.bonfire = new Sound("./sounds/Ambience_Bonfire_Loop.wav");
    }
}
