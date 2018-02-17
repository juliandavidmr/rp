const grammar = require('./grammar')
module.exports = function (input) {
    return grammar.parse(input).join(' ');
}