class Menu {
    constructor(){
        this.x = game.mouse.x;
        this.y = game.mouse.y;

        this.width = 288;
        this.height = 0;

        this.options = [];

        if(game.mouse.onHud){
            console.log()
        } else {
            game.entityList.list.forEach(o => {
                var e = game.get(o.key);
                if(e.collidesPoint(game.mouse.point)){
                    this.options = this.options.concat(e.rightClick());
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
        if(x >= this.x + 30 && x <= this.x + this.width - 15){
            y = y - this.y - 12;
            if(y % 30 < 24){
                return this.options[Math.floor(y / 30)];
            }
        }
        return null;
    }

    highlighted(){
        var x = game.mouse.x;
        var y = game.mouse.y;
        if(x >= this.x + 30 && x <= this.x + this.width - 15 && y >= this.y && y <= this.y + this.height){
            y = y - this.y - 12;
            if(y % 30 < 24){
                return Math.floor(y / 30);
            }
        }
        return -1;
    }

    draw(context){
        if(this && this.options.length > 0){
            context.font = "16px pixel_font";
            context.textBaseline = "top";
            context.fillStyle = game.config.black;
            var offsetY = 0;
            offsetY += this.menuHelper(context, game.hud.menuTopImg, this.x, this.y + offsetY);
            var selected = this.highlighted()
            var i;
            for(i = 0; i < this.options.length - 1; i += 2){
                if(i == selected){
                    offsetY += this.menuHelper(context, game.hud.menuImgSelectTop, this.x, this.y + offsetY);
                } else if(i+1 == selected){
                    offsetY += this.menuHelper(context, game.hud.menuImgSelectBotom, this.x, this.y + offsetY);
                } else {
                    offsetY += this.menuHelper(context, game.hud.menuImg, this.x, this.y + offsetY);
                }
                game.font.write(context, this.options[i].getText(), this.x + 36, this.y + offsetY - 60+10);
                game.font.write(context, this.options[i + 1].getText(), this.x + 36, this.y + offsetY - 60+30+10);
                
            }
            if(this.options.length%2 == 1){
                if(i == selected){
                    offsetY += this.menuHelper(context, game.hud.menuSingleImgSelected, this.x, this.y + offsetY);
                } else {
                    offsetY += this.menuHelper(context, game.hud.menuSingleImg, this.x, this.y + offsetY);
                }
                game.font.write(context, this.options[i].getText(), this.x + 36, this.y + offsetY - 30+10);
            }
            offsetY += this.menuHelper(context, game.hud.menuBottomImg, this.x, this.y + offsetY);

            this.height = offsetY;
        }
    }
    
    menuHelper(context, img, x, y){
        context.drawImage(img, x, y);
        return img.height;
    }
}