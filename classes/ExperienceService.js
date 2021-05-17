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
		this.updateEndurance();
	}
	
	get craftingLevel(){
		if(game.save.craftingLevel){
			return game.save.craftingLevel;
		} else {
			return 1;
		}
    }
	set craftingLevel(craftingLevel) {
		game.save.craftingLevel = craftingLevel;
	}
    
	get crafting(){
		if(game.save.craftingEXP){
			return game.save.craftingEXP;
		} else {
			return 0;
		}
    }
	set crafting(craftingEXP) {
		game.save.craftingEXP = craftingEXP;
		this.updateCrafting();
	}
	
	get rangedLevel(){
		if(game.save.rangedLevel){
			return game.save.rangedLevel;
		} else {
			return 1;
		}
    }
	set rangedLevel(rangedLevel) {
		game.save.rangedLevel = rangedLevel;
	}
    
	get ranged(){
		if(game.save.rangedEXP){
			return game.save.rangedEXP;
		} else {
			return 0;
		}
    }
	set ranged(rangedEXP) {
		game.save.rangedEXP = rangedEXP;
		this.updateRanged();
	}

	
	
	get woodcuttingLevel(){
		if(game.save.woodcuttingLevel){
			return game.save.woodcuttingLevel;
		} else {
			return 1;
		}
    }
	set woodcuttingLevel(woodcuttingLevel) {
		game.save.woodcuttingLevel = woodcuttingLevel;
	}
    
	get woodcutting(){
		if(game.save.woodcuttingEXP){
			return game.save.woodcuttingEXP;
		} else {
			return 0;
		}
    }
	set woodcutting(woodcuttingEXP) {
		game.save.woodcuttingEXP = woodcuttingEXP;
		this.updateWoodcutting();
	}

	progress(skill){
		var level = this.level(skill);
		var lastLevel = this.nextLevelEXP(level - 1);
		var nextLevel = this.nextLevelEXP(level);
		return (this[skill] - lastLevel) / (nextLevel - lastLevel);
	}

	level(skill){
		return this[skill + "Level"];
	}
	
	updateEndurance(){
		var lastLevel = this.nextLevelEXP(this.enduranceLevel - 1);
		var nextLevel = this.nextLevelEXP(this.enduranceLevel);
		game.hud.setSkill("endurance", lastLevel, nextLevel);
		if(this.endurance >= nextLevel){
			game.player.risingText("Endurance Level Up ").setLife(180);
			
			this.enduranceLevel += 1;
			game.hud.log("Well done!\nYou are now Endurance level " + this.enduranceLevel + ".");

			this.updateStaminaRegen();
			this.updateEndurance();
			game.player.stamina = game.player.maxStamina;
		}
	}
	
	updateCrafting(){
		var lastLevel = this.nextLevelEXP(this.craftingLevel - 1);
		var nextLevel = this.nextLevelEXP(this.craftingLevel);
		game.hud.setSkill("crafting", lastLevel, nextLevel);
		if(this.crafting >= nextLevel){
			game.player.risingText("Crafting Level Up ").setLife(180);
			
			this.craftingLevel += 1;
			game.hud.log("Well done!\nYou are now Crafting level " + this.craftingLevel + ".");
		}
	}
	
	updateRanged(){
		var lastLevel = this.nextLevelEXP(this.rangedLevel - 1);
		var nextLevel = this.nextLevelEXP(this.rangedLevel);
		game.hud.setSkill("ranged", lastLevel, nextLevel);
		if(this.ranged >= nextLevel){
			game.player.risingText("ranged Level Up ").setLife(180);
			
			this.rangedLevel += 1;
			game.hud.log("Well done!\nYou are now Ranged level " + this.rangedLevel + ".");
		}
	}
	
	updateWoodcutting(){
		var lastLevel = this.nextLevelEXP(this.woodcuttingLevel - 1);
		var nextLevel = this.nextLevelEXP(this.woodcuttingLevel);
		game.hud.setSkill("woodcutting", lastLevel, nextLevel);
		if(this.woodcutting >= nextLevel){
			game.player.risingText("woodcutting Level Up ").setLife(180);
			
			this.woodcuttingLevel += 1;
			game.hud.log("Well done!\nYou are now Woodcutting level " + this.woodcuttingLevel + ".");
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