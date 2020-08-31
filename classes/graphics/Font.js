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
                         3,3,3,4,4,3,4,3,3,3,5,5,3,3,2,3,4,3,4,4,4,4,4,4,4,4,3,3,3,4,3,4,
                         4,4,4,4,4,3,3,4,4,3,4,4,3,5,4,4,4,4,4,4,3,4,5,5,5,5,3,3,3,3,5,5,
                         3,4,4,4,4,3,3,4,4,3,4,4,3,5,4,4,4,4,4,4,3,4,5,5,5,5,3,3,3,3,4,3]
    }

    placeChar(context, charCode, x, y){
        context.drawImage(this.font, (charCode%32)*12, Math.floor(charCode/32)*12, 10, 10, x, y, 10, 10);
    }

    
    placeLargeChar(context, charCode, x, y, color){
        if(color == "green"){
            context.drawImage(this.fontLargeGreen, Math.floor(charCode%32)*18, Math.floor(charCode/32)*18, 15, 15, x, y, 15, 15);
        } else if(color == "red"){
            context.drawImage(this.fontLargeRed, Math.floor(charCode%32)*18, Math.floor(charCode/32)*18, 15, 15, x, y, 15, 15);
        } else {
            context.drawImage(this.fontLarge, Math.floor(charCode%32)*18, Math.floor(charCode/32)*18, 15, 15, x, y, 15, 15);
        }
    }

    write(context, s, x, y, large = false, color = null){
        s = s.toString();

        var i = s.indexOf("\n");
        if(i != -1){
            this.write(context, s.substring(i + 1), x, y + (large ? 21 : 14), large, color);
            s = s.substring(0, i);
        }

        var offset = 0;
        if(large){
            for(var i = 0; i < s.length; i++){
                this.placeLargeChar(context, s.charCodeAt(i), x + offset, y, color);
                offset += (this.fontSize[s.charCodeAt(i)] + 1)*3;
            }
        } else {
            for(var i = 0; i < s.length; i++){
                this.placeChar(context, s.charCodeAt(i), x + offset, y, color);
                offset += (this.fontSize[s.charCodeAt(i)] + 1)*2;
            }
        }
        return offset;
    }

    writeCentered(context, s, x, y, large = false){
        s = s.toString();
        var shift = this.measureString(s, large);
        return this.write(context, s, x - Math.floor(shift/2), y, large);
    }

    measureString(s, large = false){
        s = s.toString();
        var length = 0;
        if(large){
            for(var i = 0; i < s.length; i++){
                length += (this.fontSize[s.charCodeAt(i)] + 1)*3;
            }
        } else {
            for(var i = 0; i < s.length; i++){
                length += (this.fontSize[s.charCodeAt(i)] + 1)*2;
            }
        }
        return length;
    }
}
