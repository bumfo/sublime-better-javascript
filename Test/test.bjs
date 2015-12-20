const B = class {};

class A extends B {
	constructor() {
		super();
		this.init();
	}
	init() {
		function each(arr, fn) {
			for (let i = 0, n = arr.length; i < n; ++i)
				fn(arr[i]);
			return arr;
		}

		super.init();

		for (let key of each(Object.keys(this), u => u => u))
			this[key] = [new this[key]];

		if (!this.some(val => {
			return {
				val,
			};
		}) && true) {
			this.inited = true;

			return true;
		}

		return false;
	}
}
