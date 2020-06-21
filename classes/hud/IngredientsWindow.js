class IngredientsWindow extends GameWindow {
    constructor(ingredients, x, y, width, height){
        super(x, y + height);

        this.open = true;
        this.ingredients = ingredients;
        this.itemHeight = height;

        this.setWidth(width)
            .setHeight(this.ingredients.length * this.itemHeight)
            .setHasX(false);
    }

    draw(context){
        if(!this.open){
            return;
        }
        super.draw(context);

        var x = this.x + 6;
        var y = this.y + 6;
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