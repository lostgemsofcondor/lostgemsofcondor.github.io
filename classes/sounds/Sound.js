class Sound {
    constructor(path){
        this.sound = document.createElement("audio");
        this.sound.src = path;
        this.sound.setAttribute("preload", "auto");
        this.sound.setAttribute("controls", "none");
        this.sound.style.display = "none";
        document.body.appendChild(this.sound);
    }
    
    play(){
        if(!game.sounds.muted){
            this.sound.currentTime = 0;
            this.sound.play()
        }
    }
    
    stop(){
        this.sound.pause()
    }
}