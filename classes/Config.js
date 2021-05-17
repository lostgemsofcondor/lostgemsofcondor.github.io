class Config {
    constructor(){
        //Must increment when items are removed and load function changed.
        this.version = "0.1.1"
        this.fpsMax = 60;
        this.newGameOnLoad = false;


        this.debugLevel = 5;
        this.adjustment = 1/32;

        this.rotateSpeed = 2;



        /// colors
        this.white = "#EEEEEE";
        this.lightGray = "#AAAAAA";
        this.gray = "#222222";
        this.black = "#000000";

        this.healthGreen = "#00CC00";
        this.healthRed = "#DD0000";
        this.staminaOrange = "#FF9900";
        this.expGold = "#EAEA00";

        this.hudDark = "#9E7F68"
        this.hudMedium = "#C3AA8F"
        this.hudLight = "#E8D4B5"
        /// end colors
    }

    versionCompare(v1, v2){
        if (v1 === v2) {
           return 0;
        }
    
        var v1_components = v1.split(".");
        var v2_components = v2.split(".");
    
        var len = Math.min(v1_components.length, v2_components.length);
    
        // loop while the components are equal
        for (var i = 0; i < len; i++) {
            // A bigger than B
            if (parseInt(v1_components[i]) > parseInt(v2_components[i])) {
                return 1;
            }
    
            // B bigger than A
            if (parseInt(v1_components[i]) < parseInt(v2_components[i])) {
                return -1;
            }
        }
    
        // If one's a prefix of the other, the longer one is greater.
        if (v1_components.length > v2_components.length) {
            return 1;
        }
    
        if (v1_components.length < v2_components.length) {
            return -1;
        }
    
        // Otherwise they are the same.
        return 0;

    }
}