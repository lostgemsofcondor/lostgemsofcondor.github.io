class Menu {
    constructor(){
        this.x = game.mouse.x;
        this.y = game.mouse.y;
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
}