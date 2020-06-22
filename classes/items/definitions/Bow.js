class Bow extends Weapon {
    constructor(key, imgSource){
        super(key, imgSource);
        this.pickedSound = game.sounds.bowPick;
        this.ammunitionType = Arrow;
        this.shots = 1;
        this.theta = Math.PI/16;
    }

    setShots(shots){
        this.shots = shots;
        return this;
    }

    setTheta(theta){
        this.theta = theta;
        return this;
    }
}
