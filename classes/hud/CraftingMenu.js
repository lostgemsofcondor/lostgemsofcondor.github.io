class CraftingMenu extends GameWindow {
    constructor(){
        super(-1, 300);
        this.setWidth(1000)
            .setHeight(600)
            .setCentered(true);
        this.open = false;
    }


    center(){
        this.width = Math.min(1000, main.canvas.width - game.hud.width - 100)
        this.x = Math.floor((main.canvas.width - game.hud.width - this.width)/2);
    }
}