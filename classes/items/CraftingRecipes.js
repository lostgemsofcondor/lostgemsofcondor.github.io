class CraftingRecipes {
    constructor(){
        this.recipes = [];

        //recipes must have unique names
        this.add(new Recipe("Fletch Arrows", [["palmLog", 1]], ["arrow", 5]));
        this.add(new Recipe("Palm Bow", [["palmLog", 5]], ["palmBow", 1]));
        this.add(new Recipe("Power Bow", [["palmBow", 1], ["amethyst", 1], ["emerald", 1], ["ruby", 1], ["topaz", 1], ["diamond", 1], ["sapphire", 1]], ["powerBow", 1]));

        this.add(new Recipe("Tip Emerld Arrows", [["arrow", 5], ["emerald", 1]], ["emeraldArrow", 5]));
    }

    add(recipe){
        this.recipes.push(recipe);
    }

    getRecipes(itemCounts){
        for(var i in this.recipes){
            this.recipes[i].update(itemCounts);
        }
        return this.recipes;
    }
}
