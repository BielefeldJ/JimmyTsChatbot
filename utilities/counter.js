
//Counter stuff.
class Counter 
{
	constructor(){
		this.count = 0;
	}
	
	resetCounter(){
		this.count=0;
	}

	get getCounter(){
		return this.count;
	}

	set setCounter(count){
		this.count = count; 
	}
	
	incCounter(){
		this.count++;
	}
}

module.exports = Counter;

