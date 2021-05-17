class SceneService {
    constructor(){

    }

    newScene(x, y, type){
        if(type == "tutorial"){
            return new Tutorial(x, y);
        } else {
            return new Scene(x, y);
        }
    }
}
