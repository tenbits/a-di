var BaseParamResolver = require('./BaseParamResolver'),
	ObjectParamResolver = require('./ObjectParamResolver'),
	EmptyParamResolver = require('./EmptyParamResolver');

module.exports = {
	
	create (di, mix) {
		if (mix == null) {
			return new EmptyParamResolver();
		}		
		if (is_Object(mix)) {
			return new ObjectParamResolver(di, mix);
		}
		return new BaseParamResolver(di, mix);
	},

	createMany(di, arr) {
		var out = new Array(arr.length),
			i = arr.length;
		while (--i !== -1) {
			out[i] = ParamResolver.create(di, arr[i]);
		}
		return out;
	}
};