class Recipe {
    constructor(){
        this.inputs = [];
        this.output = [];
        this.exp = 1;
        this.craftable = false;
    }
    
	setName(name){
		this.name = name;
		return this;
    }
    
	setInputs(inputs){
		this.inputs = inputs;
		return this;
    }
    
	setOutput(output){
		this.output = output;
		return this;
    }
    
	setExp(exp){
		this.exp = exp;
		return this;
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
