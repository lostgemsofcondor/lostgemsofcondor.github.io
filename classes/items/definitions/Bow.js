class Bow extends Weapon {
    constructor(key, imgSource){
        super(key, imgSource);
        this.pickedSound = game.sounds.bowPick;
    }
}
