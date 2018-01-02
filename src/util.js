const grammar = require('./grammar')

/**
 * @param {string} value
 */
function clean(value) {
	return value.toString().trim()
}

/**
 * @param {string} value 
 */
module.exports.isExtended = (value) => {
	if (typeof value === 'string') {
		value = clean(value);
		return value.startsWith(':');
	}
	return false
}

module.exports.isOperable = (a, b) => {
	return !isNaN(a) &&
		!isNaN(b) &&
		(typeof a === 'number' || typeof a === 'boolean') &&
		typeof b == typeof b;
}