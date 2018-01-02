const util = require('./util')

const SEPARATOR_ARGS = ' ';
const log = console.log;

/**
 * 
 * @param {number?} a 
 * @param {number?} b 
 */
function isOperable(a, b) {
	return !isNaN(a) &&
		!isNaN(b) &&
		typeof a === 'number' /*|| typeof a === 'boolean'*/ &&
		typeof b == typeof b;
}

/**
 * 
 * @param {string|number} a 
 * @param {string|number} b 
 * @param {string} op 
 */
function operation(a, b, op) {
	op = `${a}${op}${b}`;
	if (isOperable(a, b)) {
		return eval(op)
	}
	if (typeof a === 'boolean' && typeof b === 'boolean') { // TODO: eliminar o reevaluar esto
		return eval(op)
	}
	return op
}

/**
 * 
 * @param {Array<string>} args 
 */
function _arguments(args) {
	if (Array.isArray(args)) {
		if (util.containsArray(args)) {
			args = args[1]
		}
		args = args.map(i => `$${i}`)
		return args.join(',')
	}
	return ''
}

module.exports.isOperable = isOperable;
module.exports.operation = operation;
module.exports.arguments = _arguments;