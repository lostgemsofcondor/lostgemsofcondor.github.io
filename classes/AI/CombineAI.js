class CombineAI {
	constructor(AI1, AI2){
		this.AI1 = AI1;
		this.AI2 = AI2;
	}
	
	calculate(entity){
		this.AI1.calculate(entity);
		this.AI2.calculate(entity);
	}
}
