class IngredientsWindow extends GameWindow {
    constructor(recipe, x, y, height){
        super(x, y + height);

        this.open = true;
        this.ingredients = recipe.inputs;
        this.itemHeight = height;

        this.description = recipe.name;

        this.setWidth(game.font.measureString(this.description) + 36)
            .setHeight(this.ingredients.length * this.itemHeight + 30)
            .setHasX(false);
    }

    draw(context){
        if(!this.open){
            return;
        }
        super.draw(context);

        var x = this.x + 18;
        var y = this.y + 18;

        game.font.write(context, this.description, x, y);

        y += 18;

        for(var i in this.ingredients){
            var ingredient = this.ingredients[i];
            var img = game.itemService[ingredient[0]].img;
            context.drawImage(img, x, y);
            if(ingredient[1] != 1){
                game.font.write(context, "x " + ingredient[1], x + 48, y + 24);
            }
            y += this.itemHeight;
        }
    }
}