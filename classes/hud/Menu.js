class Menu {
    constructor(){
        this.x = game.mouse.x;
        this.y = game.mouse.y;

        this.width = 256;
        this.height = 0;

        this.options = [];

        if(game.mouse.onHud){

        } else {
            game.entityList.list.forEach(o => {
                var e = game.get(o.key);
                if(e.collidesPoint(game.mouse.point)){
                    this.options.push(new MenuOption(e.key));
                }
            });
        }
    }

    
    clicked(x, y){
        if(x >= this.x && x <= this.x + this.width && y >= this.y && y <= this.y + this.height){
            return true;
        } else {
            delete this;
        }
    }

    clickedOption(x, y){
        if(x >= this.x + 40 && x <= this.x + this.width - 20){
            y = y -  this.y - 16;
            if(y % 40 < 32){
                return this.options[Math.floor(y / 40)];
            }
        }
        return null;
    }
}