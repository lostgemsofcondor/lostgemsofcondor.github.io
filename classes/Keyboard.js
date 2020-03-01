class Keyboard {
    constructor(){
        this.up = new Button().setKeyCode("87");
        this.down = new Button().setKeyCode("83");
        this.left = new Button().setKeyCode("65");
        this.right = new Button().setKeyCode("68");
        this.rotateClockwise = new Button().setKeyCode("81");
        this.rotateCounterClockwise = new Button().setKeyCode("69");
        this.resetRotation = new Button().setKeyCode("82");
        this.debug = new Button().setKeyCode("192");
        this.run = new Button().setKeyCode("16");

        this.zoomOut = new Button().setKeyCode("189");
        this.zoomIn = new Button().setKeyCode("187");
        this.spaceBar = new Button().setKeyCode("32");
    }
}