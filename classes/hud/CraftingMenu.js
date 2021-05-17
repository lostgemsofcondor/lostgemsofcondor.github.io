class CraftingMenu extends GameWindow {
    constructor(){
        super(-1, 300);
        this.setWidth(1000)
            .setHeight(600)
            .setCentered(true);
        this.open = false;
        this.recipes = [];
        this.recipeUnderMouse = null;
    }

    center(){
        this.width = Math.min(1000, main.canvas.width - game.hud.width - 100)
        // this.x = Math.floor((main.canvas.width - game.hud.width - this.width)/2);
        super.center();
    }

    openWindow(){
        super.openWindow();
        this.updateRecipes();
    }

    updateRecipes(){
        this.recipes = game.craftingRecipes.getRecipes(game.getInventory("inventory").getItemCounts());
        var craftableRecipes = [];
        for(var i in this.recipes){
            var r = this.recipes[i];
            if(r.craftable){
                craftableRecipes.push(r);
            }
        }
        this.recipes = craftableRecipes;
    }

    selectRecipe(){
        if(this.recipeUnderMouse && this.recipeUnderMouse.craftable){
            game.getInventory("inventory").craft(this.recipeUnderMouse);
            this.updateRecipes();
        }
    }

    draw(context){
        if(!this.open){
            return;
        }
        super.draw(context);
        
        this.recipeUnderMouse = null;
        var ingredientsWindow = null;
        var width = 180;
        var gap = 12;
        var height = 60;
        
        var x = this.x + 50;
        var y = this.y + 50;

        if(this.recipes.length == 0){
            game.font.write(context, "Nothing craftable\ncollect more resources", x, y, true)
            return;
        }

        for(var i in this.recipes){
            var r = this.recipes[i];
            var img = game.itemService[r.output[0]].img;
            context.drawImage(img, x, y);
            game.font.write(context, r.output[0], x + 50, y + 10);
            if(r.output[1] != 1){
                game.font.write(context, "x " + r.output[1], x + 50, y + 24);
            }
            if(game.mouse.x >= x && game.mouse.x < x + width - gap && game.mouse.y >= y && game.mouse.y < y + height - gap){
                this.recipeUnderMouse = r;
                ingredientsWindow = new IngredientsWindow(r, x, y, height);
            }

            x += width; //?
        }
        if(ingredientsWindow){
            ingredientsWindow.draw(context);
        }
    }
}