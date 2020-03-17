class Window {
    constructor(x, y){
        this.x = x;
        this.y = y;
        this.open = true;
    }

    setWidth(width){
        this.width = Math.max(128, width);
        return this;
    }

    setHeight(height){
        this.height = Math.max(128, height);
        return this;
    }

    draw(context){
        context.fillStyle = game.config.hudLight;
        context.fillRect(this.x, this.y, this.width, this.height);
        context.fillStyle = game.config.hudDark;
        context.fillRect(this.x + 4, this.y + 4, this.width - 8, this.height - 8);
        context.fillStyle = game.config.hudLight;
        context.fillRect(this.x + 8, this.y + 8, this.width - 16, this.height - 16);

        context.drawImage(game.hud.windowTopLeft, this.x, this.y);
        context.drawImage(game.hud.windowTopRight, this.x + this.width - game.hud.windowTopRight.width, this.y - 28);
        context.drawImage(game.hud.windowBottomLeft, this.x, this.y + this.height - game.hud.windowBottomLeft.height);
        context.drawImage(game.hud.windowBottomRight, this.x + this.width - game.hud.windowTopRight.width, this.y + this.height - game.hud.windowBottomLeft.height);
    }

    clicked(x, y){ // 1 is clicked, 2 is close, 0 is not clicked on
        if(!this.open){
            return 0;
        }
        if(x >= this.x && x <= this.x + this.width && y >= this.y && y <= this.y + this.height){
            return 1;
        } else if(x >= this.x + this.width - 12 - 36 && x <= this.x + this.width - 12 && y >= this.y - 28 && y <= this.y){
            return 2;
        }
        return 0;
    }
}