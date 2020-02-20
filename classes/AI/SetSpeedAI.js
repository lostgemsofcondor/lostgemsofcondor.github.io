class SetSpeedAI {
	constructor(speed){
		this.speed = speed;
	}
	
	calculate(entity){
		entity.speed = this.speed;
	}
}
