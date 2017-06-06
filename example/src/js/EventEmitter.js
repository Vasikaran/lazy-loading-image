export default class EventEmitter {
	constructor(args) {
		this.events = {};
	}

	subscribe(eventName, func){
		if (!this.events[eventName]){
			this.events[eventName] = [];
		}
		this.events[eventName].push(func);
		return ()=>{
			this.events[eventName] = this.events[eventName].filter(fun=>{
				return fun !== func;
			})
		}
	}

	emit(eventName, data){
		let events = this.events[eventName];
		if (events){
			events.forEach(fun=>{
				fun(data);
			})
		}
	}

	unsubscribe(eventName, func){
		this.subscribe(eventName, func);
	}

}