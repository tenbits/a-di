module.exports = class Is {
	static Object (mix) {
		return mix != null 
			&& typeof mix === 'object' 
			&& mix.toString() === '[object Object]';
	}
}