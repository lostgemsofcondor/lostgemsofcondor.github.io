class Perlin {
	constructor(seed = 12){
        // this.canvas = addCanvas();
        // this.context = this.canvas.getContext("2d");
        // this.canvas.width = 3000;
        // this.canvas.height = 3000;

        this.bigPrime = 593441843;
        this.bigPrime2 = 674506081;
        this.billion = 1000000000;
        this.seed = seed;

        
        this.snow = "#303030"
        this.forest = "#00750D"
        this.plains = "#00B211"
        this.sand = "#C1A245"
        this.water = "#1C68BF"

        this.gridSize = 30;
        return;
        for(var i = -200; i < 200; i++){
            for(var j = -200; j < 200; j++){
                this.drawPixel(i+200, j+200, this.perlinRec(i, j, [35], [1]));
            }
        }
    }

    async temp(){
        for(var i = 0; i < 50; i++){
            for(var j = 0; j < 50; j++){
                p.drawPixel(i+200, j+200, p.perlinRec(i, j, [45], [1]));
                // setTimeout(function (){
                // })
            }
        }
    }
    
    lerp(a0, a1, w) {
        return (1 - w)*a0 + w*a1;
    }
    
    // Computes the dot product of the distance and gradient vectors.
    dotGridGradient(ix, iy, x, y) {
    
        // Compute the distance vector
        var dx = x - ix;
        var dy = y - iy;
    
        // Compute the dot-product
        return (dx*this.hash(iy, ix)[0] + dy*this.hash(iy, ix)[1]);
    }

    fade(x){
        return (6*(x**5)) - (15*(x**4)) +(10*(x**3));
    }

    perlinRec(x, y, levels, weights){
        var len = levels.length;
        if(len <= 0){
            return 0;
        } else {
            this.gridSize = levels.pop();
            var weight = weights.pop();
            return this.perlin(x, y)*weight + this.perlinRec(x, y, levels, weights);
        }
    }

    perlin(x, y){
        x = x / this.gridSize;
        y = y / this.gridSize;

        var x0 = Math.floor(x);
        var x1 = x0 + 1;
        var y0 = Math.floor(y);
        var y1 = y0 + 1;

        
        var sx = this.fade(x - x0);
        var sy = this.fade(y - y0);


        var n0 = this.dotGridGradient(x0, y0, x, y);
        var n1 = this.dotGridGradient(x1, y0, x, y);
        var ix0 = this.lerp(n0, n1, sx);
    
        n0 = this.dotGridGradient(x0, y1, x, y);
        n1 = this.dotGridGradient(x1, y1, x, y);
        var ix1 = this.lerp(n0, n1, sx);
    
        return (this.lerp(ix0, ix1, sy)+1)/2;
    }


    hash(x, y){
        var v1 = x;
        var v0 = y;
        
        var sum = 0;
        for (var i = 0; i < 32; i++) {
            sum += this.seed;
            v0 += ((v1<<4) + this.bigPrime) ^ (v1 + sum) ^ ((v1>>5) + this.bigPrime2);
            v1 += ((v0<<4) + this.bigPrime) ^ (v0 + sum) ^ ((v0>>5) + this.bigPrime2);
        }
        switch (Math.abs(v0) % 4){
            case 0:
                return [1, 1]
            case 1:
                return [-1, 1]
            case 2:
                return [1, -1]
            case 3:
                return [-1, -1]
        }
    }
    
    drawPixel(x, y, color){
        if(color < .3){
            this.context.fillStyle = this.water
        }else if(color < .4){
            this.context.fillStyle = this.sand
        }else if(color < .6){
            this.context.fillStyle = this.plains
        }else if(color < .7){
            this.context.fillStyle = this.plains
        }else if(color < .9){
            this.context.fillStyle = this.forest
        }else{
            this.context.fillStyle = this.snow
        }
        this.context.fillRect(x*5, y*5, 5, 5);    
    }

}


