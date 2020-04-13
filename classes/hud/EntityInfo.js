class EntityInfo {
    constructor(){
        this.key = -1;
        this.width = 300;
    }
    
    get offset(){
        return Math.floor((game.miniMap.size + game.miniMap.offsetX + main.canvas.width - game.hud.width - this.width)/2);
    }

    setKey(key){
        if(key != this.key){
            var e = game.get(key);
			if(e instanceof Enemy){
                this.key = key;
            }
        }
    }

    draw(context){
        var e = game.get(this.key);
        if(e){
            var x = this.offset;
            var y = 50;
            var width = this.width;
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
                    context.drawImage(game.itemService[drops[i]].img, x + e.width + i * 34, y + 30, 32, 32);
                }
            }
        }
    }
}