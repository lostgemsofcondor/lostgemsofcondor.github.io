class ImageBuilder {
    constructor(){
        this.lightingImages = {};
    }

    buildLighting(rings, shades){
        if(this.lightingImages[rings + "," + shades] != null){
            return this.lightingImages[rings + "," + shades];
        }
        var ringWidth = 4;
        var ringsPerShade = rings/shades;
        var canvas = addCanvas();
        var context = canvas.getContext("2d");
        canvas.width = 2 * rings * ringWidth
        canvas.height = 2 * rings * ringWidth;
        var center = rings-.5;
        for(var i = 0; i < rings * 2; i++){
            for(var j = 0; j < rings * 2; j++){
                var d = Math.floor(Math.sqrt(Math.pow(i - center, 2) + Math.pow(j - center, 2)));
                if(d <= rings){
                    d = Math.floor(d/ringsPerShade)*ringsPerShade;
                    var lightLevel = 1 - d/rings;
                    context.fillStyle = "rgba(0, 0, 0, " + lightLevel + ")";
                    context.fillRect(i * ringWidth, j * ringWidth, ringWidth, ringWidth);
                }
            }
        }
        var img = new Image();
        img.src = canvas.toDataURL();
        this.lightingImages[rings + "," + shades] = img;
        return img;
    }
}