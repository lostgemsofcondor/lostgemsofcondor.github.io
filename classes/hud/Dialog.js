class Dialog extends GameWindow {
    constructor(){
        super(-1, 500);
        this.setWidth(1000)
            .setHeight(400)
            .setCentered(true);

        this.open = false;
        this.end = false;

        this.padding = 54;

        this.text = [];
		if(!game.save.progress.leftTutorial){
            this.add("Welcome to Condor! You find yourself in a cave with a suit of armor staring at you it is holding an axe maybe you can take it and chop down that tree.");
            this.add("Use WASD to move, Click to use your fists or weapon,\nUse Q and E to rotate your view, and SPACE to dash");
        }
        this.position = 0;
    }

    draw(context){
        if(!this.open){
            return;
        }
        super.draw(context);

        var x = this.x + this.padding;
        var y = this.y + this.padding;

        var currentText = this.text[0];

        game.font.write(context, currentText.substring(0, this.position), x, y, true);

        if(this.end){
            game.font.write(context, "click to continue...", this.x + this.width - this.padding - 172, this.y + this.height - this.padding)
        }

        if(this.position < currentText.length){
            this.position++;
        } else {
            this.end = true;
        }
    }

    add(text){
        game.paused = true;
        this.open = true;
        var words = text.split(" ");
        var newText = "";
        words.forEach(word => {
            if(game.font.measureString(newText.substring(newText.lastIndexOf("\n")) + " " + word, true) > this.width - this.padding*2){
                if(newText != ""){
                    newText += "\n";
                }
            } else {
                if(newText != ""){
                    newText += " ";
                }
            }
            newText += word;
        });
        this.text.push(newText);
    }

    onClick(){
        if(this.end){
            this.text.shift();
            if(this.text.length == 0){
                this.open = false;
                game.paused = false;
            }
            this.position = 0;
            this.end = false;
        } else {
            this.position = this.text[0]?.length ?? 0;
        }
    }
}