class Dungeon extends Scene {
    constructor(x, y){
        super(x, y);

        this.type = "dungeon"

		this.map = []
		this.width = 80;
		this.height = 80;
		for(var i = 0; i < this.height; i++){
			var temp = [];
			for(var j = 0; j < this.width; j++){
				temp.push(1);
			}
			this.map.push(temp);
		}

		this.loadMap();

		for(var i = 0; i < this.height; i++){
			var s = i.toString().padStart(this.width.toString().length) + ":";
			for(var j = 0; j < this.width; j++){
				s += this.map[i][j]? " ":"." + " ";
			}
			console.log(s);
		}
    }

    init(){
        this.boarderSize = 32;
        var sceneSize = this.width;
        var sceneActualSize = sceneSize + this.boarderSize * 2;
        this.chunk = new MapChunk(0, 0, game.map.tileSize, sceneActualSize * 2, false);
        this.chunk.clearTileMap(true);

        this.fillBackGround(sceneActualSize);

        var tile;
        for(var i = this.boarderSize; i < sceneActualSize - this.boarderSize; i++){
            for(var j = this.boarderSize; j < sceneActualSize - this.boarderSize; j++){
                if(this.map[i - this.boarderSize][j - this.boarderSize]){
                    tile = game.map.undergroundFloor;
                } else {
                    tile = game.map.water;
                }
                this.chunk.setTile(tile, i, j, false);
            }
        }

        
        var spawnX = (this.boarderSize + this.width) * 48 - 100;
        var spawnY = (this.boarderSize + this.width) * 48 - 100;
        
		new Entrance(spawnX, spawnY)
            .setImage("./sprites/entrance/ropeUp.png", 0)
            .setDimensions(96, 96)
            .setExit(true);

        game.player.positionX = spawnX;
        game.player.positionY = spawnY + 48;

        this.chunk.setMiniMapChunk();

    }


    loadMap(){
        //this.makeRoom(0,0,10,10);
        this.thick_octant1(10,10,20,20, 2);
    }

    makeRoom(x, y, width, height){
        for(var i = x; i >= 0 && i < this.width && i + x < width; i++){
            for(var j = x; j >= 0 && j < this.height && j + x < height; j++){
                this.map[i][j] = 0;
            }
        }
    }

    perp_octant1(x0,y0,dx,dy,einit,width,winit){
        var x = x0;
        var y = y0;

        var threshold = dx - 2*dy;
        var E_diag = -2*dx;
        var E_square = 2*dy;
        var wthr = 2*width*Math.sqrt(dx*dx+dy*dy);
        
        var error = einit;
        var tk = dx+dy-winit;
    
        while(tk <= wthr){
            this.setFloor(x, y);
            if(error > threshold){
                x = x - 1;
                error = error + E_diag;
                tk = tk + 2*dy;
            }
            error = error + E_square;
            y = y + 1;
            tk = tk + 2*dx;
        }
    
        x = x0;
        y = y0;
        error = -einit;
        tk = dx+dy+winit;
    
        while(tk <= wthr){
            this.setFloor(x,y);
            if(error > threshold){
                x= x + 1;
                error = error + E_diag;
                tk= tk + 2*dy;
            }
            error = error + E_square;
            y = y - 1;
            tk = tk + 2*dx;
        }
    }
  
    thick_octant1(x0,y0,x1,y1,width){
        
        var xStep = x0 < x1 ? 1 : -1;
        var yStep = y0 < y1 ? 1 : -1;

        var dx = Math.abs(x1 - x0);
        var dy = Math.abs(y1 - y0);
        var p_error = 0;
        var error = 0;
        var y = y0;
        var x = x0;
        var threshold = dx - 2 * dy;
        var E_diag = -2 * dx;
        var E_square = 2 * dy;
        var length = dx + 1;

        for(var p = 1; p <= length; p++){
            this.perp_octant1(x,y, dx, dy, p_error,width,error)
            if(error > threshold){
                y += yStep;
                error = error + E_diag
                if(p_error > threshold){
                    this.perp_octant1(x,y, dx, dy, p_error+E_diag+E_square,width,error)
                    p_error= p_error + E_diag
                }
                p_error= p_error + E_square
            }
            error = error + E_square
            x += xStep;
        }
    }

    //safe way to set
    setFloor(x, y){
        if(x > 0 && y > 0 && x < this.width && y < this.height){
            this.map[x][y] = 0;
        } else {
            console.log("invalid cords " + x + ", " + y);
        }
    }
}