class Recipe {
    constructor(name, inputs, output){
        this.name = name;
        this.inputs = inputs;
        this.output = output;
        this.craftable = false;
    }

    update(itemCounts){
        for(var i in this.inputs){
            var input = this.inputs[i];
            if(!itemCounts[input[0]] || itemCounts[input[0]] < input[1]){
                this.craftable = false;
                return;
            }
        }
        this.craftable = true;
    }
}
