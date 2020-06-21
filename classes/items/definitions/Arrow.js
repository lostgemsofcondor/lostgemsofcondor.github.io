class Arrow extends Ammunition {
    constructor(key, imgSource){
        super(key, imgSource);
        this.pickedSound = game.sounds.arrowPick;
        this.weaponType = Bow;
    }
}
