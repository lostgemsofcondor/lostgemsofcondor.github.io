class EntityInfo {
    constructor(){
        this.key = -1;
    }

    setKey(key){
        if(key != this.key){
            this.key = key;
        }
    }

    draw(context){
        var e = game.get(this.key);
        if(e){
            
            var x = 400;
            var y = 50;
            var width = 288;
            var height = 24;

            context.fillStyle = game.config.healthGreen;
            context.fillRect(x, y, width, height);
            
            context.fillStyle = game.config.lightGray;
            context.fillRect(x + width * e.health/e.maxHealth, y, width - width * e.health/e.maxHealth, height);

            context.font = "20px pixel_font";
            context.textAlign = "center";
            context.textBaseline = "middle";
            context.fillStyle = game.config.gray;
            context.fillText(e.health + "/" + e.maxHealth, x + width/2, y + height/2);
        }
    }
}