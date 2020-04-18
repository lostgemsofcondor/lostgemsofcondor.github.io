class Font {
    constructor(){
        this.font = new Image();
        this.font.src = "./sprites/font/font.png"
        this.fontLarge = new Image();
        this.fontLarge.src = "./sprites/font/fontLarge.png"
        this.font.src = "./sprites/font/font.png"
        this.fontLargeGreen = new Image();
        this.fontLargeGreen.src = "./sprites/font/fontLargeGreen.png"
        this.font.src = "./sprites/font/font.png"
        this.fontLargeRed = new Image();
        this.fontLargeRed.src = "./sprites/font/fontLargeRed.png"
        this.fontSize = [3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,
                         3,3,3,4,4,3,4,3,3,3,5,5,3,3,3,3,4,3,4,4,4,4,4,4,4,4,3,3,3,4,3,4,
                         4,4,4,4,4,3,3,4,4,3,4,4,3,5,4,4,4,4,4,4,3,4,5,5,5,5,3,3,3,3,5,5,
                         3,4,4,4,4,3,3,4,4,3,4,4,3,5,4,4,4,4,4,4,3,4,5,5,5,5,3,3,3,3,4,3]
    }

    placeChar(context, charCode, x, y){
        context.drawImage(this.font, (charCode%32)*12, Math.floor(charCode/32)*12, 10, 10, x, y, 10, 10);
    }

    
    placeLargeChar(context, charCode, x, y, color){
        if(color == "green"){
            context.drawImage(this.fontLargeGreen, (charCode%32)*18, Math.floor(charCode/32)*18, 15, 15, x, y, 15, 15);
        } else if(color == "red"){
            context.drawImage(this.fontLargeRed, (charCode%32)*18, Math.floor(charCode/32)*18, 15, 15, x, y, 15, 15);
        } else {
            context.drawImage(this.fontLarge, (charCode%32)*18, Math.floor(charCode/32)*18, 15, 15, x, y, 15, 15);
        }
    }

    write(context, s, x, y, large = false, color = null){
        // x = Math.floor(x);
        // y = Math.floor(y);
        s = s.toString();
        var offset = 0;
        if(large){
            for(var i = 0; i < s.length; i++){
                this.placeLargeChar(context, s.charCodeAt(i), x + offset, y, color);
                offset += (this.fontSize[s.charCodeAt(i)] + 1) *3;
            }
        } else {
            for(var i = 0; i < s.length; i++){
                this.placeChar(context, s.charCodeAt(i), x + offset, y, color);
                offset += (this.fontSize[s.charCodeAt(i)] + 1)*2;
            }
        }
    }

    writeCentered(context, s, x, y, large = false){
        var shift = 0;
        var scale = 2;
        if(large){
            scale = 3;
        } 

        for(var i = 0; i < s.length; i++){
            shift += (this.fontSize[s.charCodeAt(i)] + 1) * scale;
        }
        this.write(context, s, x - Math.floor(shift/2), y, large);
    }
}
