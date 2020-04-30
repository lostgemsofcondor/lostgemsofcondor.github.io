class ExperienceService {
    constructor(){
		this.staminaGain = 0;

		this.updateStaminaRegen();
	}
	
	get enduranceLevel(){
		if(game.save.enduranceLevel){
			return game.save.enduranceLevel;
		} else {
			return 1;
		}
    }
	set enduranceLevel(enduranceLevel) {
		game.save.enduranceLevel = enduranceLevel;
	}
    
	get endurance(){
		if(game.save.enduranceEXP){
			return game.save.enduranceEXP;
		} else {
			return 0;
		}
    }
	set endurance(enduranceEXP) {

		game.save.enduranceEXP = enduranceEXP;
		this.updateEndurance()
	}
	
	updateEndurance(){
		var lastLevel = this.nextLevelEXP(this.enduranceLevel - 1)
		var nextLevel = this.nextLevelEXP(this.enduranceLevel)
		game.hud.setSkill("endurance", lastLevel, nextLevel)
		if(this.endurance >= nextLevel){
			game.player.risingText("Endurance Level Up ").setLife(180);
			
			this.enduranceLevel += 1;
			game.hud.log("Well done!\nYou are now Endurance level " + this.enduranceLevel + ".")

			this.updateStaminaRegen();
			this.updateEndurance();
			game.player.stamina = game.player.maxStamina;
		}
	}

	nextLevelEXP(level){
		if(level == 0){
			return 0;
		}
		level++;
		return Math.floor(1053.975*Math.pow(2, level/10)) - 60*level - 1054
	}

	spendStamina(s){
		this.staminaGain += s;
		var enduranceGain = Math.floor(this.staminaGain / 10);
		if(enduranceGain > 0){
			game.player.risingText(enduranceGain + "XP");
			this.endurance += enduranceGain;
			this.staminaGain -= enduranceGain * 10;
		}
	}

	updateStaminaRegen(){
		game.player.baseStaminaRegen = Math.floor(Math.pow(0.9819, this.enduranceLevel)*60);
		game.player.maxStamina = this.updateMaxStamina(this.enduranceLevel);
	}

	updateMaxStamina(level){
		// one point per level and 5 points per level ending in 9 up to 79
		// at level 99 you should have 150 points
		return level + 19 + Math.min(Math.floor((level+1)/10)*4,32);

	}
}