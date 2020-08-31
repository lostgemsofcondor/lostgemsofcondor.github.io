class CraftingRecipes {
    constructor(){
        this.recipes = [];

        //recipes must have unique names
        this.add(new Recipe()
            .setName("Fletch Arrows")
            .setInputs([["palmLog", 1]])
            .setOutput(["arrow", 5]));
        this.add(new Recipe()
            .setName("Craft Palm Bow")
            .setInputs([["palmLog", 5]])
            .setOutput(["palmBow", 1])
            .setExp(5));
        this.add(new Recipe()
            .setName("Craft Power Bow")
            .setInputs([["palmBow", 1], ["amethyst", 1], ["emerald", 1], ["ruby", 1], ["topaz", 1], ["diamond", 1], ["sapphire", 1]])
            .setOutput(["powerBow", 1])
            .setExp(5));

        this.add(new Recipe()
            .setName("Tip Emerld Arrows")
            .setInputs([["arrow", 5], ["emerald", 1]])
            .setOutput(["emeraldArrow", 5])
            .setExp(1));
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
