class EntityInfo {
    constructor(){
        this.key = -1;
        this.width = 336;
        this.offsetY = 24;
        this.window = new Window(-1, this.offsetY).setWidth(this.width);
        this.open = false;
    }
    
    get offsetX(){
        return Math.floor((game.miniMap.size + game.miniMap.offsetX + main.canvas.width - game.hud.width - this.width)/2);
    }
    
    clicked(x, y){
        if(this.open){
            return this.window.clicked(x, y);
        }
        return 0;
    }

    setKey(key){
        this.open = true;
        if(key != this.key){
            var e = game.get(key);
			if(e instanceof Enemy){
                this.key = key;
            }
        }
    }

    draw(context){
        if(!this.open){
            return;
        }
        var e = game.get(this.key);
        if(e) {
            this.window.x = this.offsetX;
            this.window.height = Math.max(92, Math.floor(e.height/3*2) + 36);
            this.window.draw(context);
            var x = this.offsetX + 18;
            var y = this.offsetY + 16;
            var width = this.width - 36;
            var height = 21;

            context.fillStyle = game.config.healthGreen;
            context.fillRect(x, y, width, height);
            
            context.fillStyle = game.config.lightGray;
            context.fillRect(x + width * e.health/e.maxHealth, y, width - width * e.health/e.maxHealth, height);

            game.font.writeCentered(context, e.health + "/" + e.maxHealth, x + width/2, y + 3, true);

            context.drawImage(e.sprite.getImg(), x + 6, y + 6, e.width/3*2, e.height/3*2);
            
            if(e.dropTable){
                var drops = e.dropTable.listDrops();
                for(var i = 0; i < drops.length; i++){
                    context.drawImage(game.itemService[drops[i]].img, x + e.width/3*2 + i * 34 + 8, y + 30, 32, 32);
                }
            }
        } else {
            this.open = false;
        }
    }
}